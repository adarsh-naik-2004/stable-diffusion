from flask import Flask, request, jsonify, send_from_directory
import requests
import os
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

COMFYUI_URL = "http://127.0.0.1:8188/prompt"
OUTPUT_FOLDER = os.path.join(os.getcwd(), 'ComfyUI', 'output')

@app.route('/')
def home():
    return "Stable Diffusion API is running! Use /generate to create images."

# Serve static files (like images)
@app.route('/outputs/<filename>')
def serve_image(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)

@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.json
    prompt_text = data.get("prompt", "A futuristic cyberpunk city")

    workflow = {
        "0": {
            "inputs": {"ckpt_name": "v1-5-pruned-emaonly.safetensors"},
            "class_type": "CheckpointLoaderSimple"
        },
        "1": {
            "inputs": {"text": prompt_text, "clip": ["0", 1]},  # clip = index 1
            "class_type": "CLIPTextEncode"
        },
        "2": {
            "inputs": {"text": "", "clip": ["0", 1]},
            "class_type": "CLIPTextEncode"
        },
        "3": {
            "inputs": {"width": 512, "height": 512, "batch_size": 1},
            "class_type": "EmptyLatentImage"
        },
        "4": {
            "inputs": {
                "model": ["0", 0],  # model = index 0
                "positive": ["1", 0],  # output = index 0
                "negative": ["2", 0],
                "latent_image": ["3", 0],
                "seed": 42,
                "steps": 20,
                "cfg": 7,
                "sampler_name": "euler",
                "scheduler": "normal",
                "denoise": 1
            },
            "class_type": "KSampler"
        },
        "5": {
            "inputs": {
                "samples": ["4", 0],  # output = index 0
                "vae": ["0", 2]  # vae = index 2
            },
            "class_type": "VAEDecode"
        },
        "6": {
            "inputs": {
                "filename_prefix": "generated_image",
                "images": ["5", 0]  # output = index 0
            },
            "class_type": "SaveImage"
        }
    }

    response = requests.post(COMFYUI_URL, json={"prompt": workflow})
    if response.status_code != 200:
        return jsonify({"error": "Failed to submit prompt"}), 500
    prompt_id = response.json()['prompt_id']

    # Poll ComfyUI history for completion
    start_time = time.time()
    timeout = 60  # Timeout after 60 seconds
    while True:
        if time.time() - start_time > timeout:
            return jsonify({"error": "Timeout waiting for generation"}), 500
        history_response = requests.get("http://127.0.0.1:8188/history")
        history_data = history_response.json()
        if prompt_id in history_data:
            outputs = history_data[prompt_id]['outputs']
            if '6' in outputs:  # Check SaveImage node (ID 6)
                images = outputs['6']['images']
                if images:
                    filename = images[0]['filename']
                    return jsonify({"imageUrl": filename})
            break
        time.sleep(1)
    return jsonify({"error": "Image generation failed"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True) 
