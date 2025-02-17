# AI Image Generation Platform 🖼

A full-stack solution for text-to-image generation using Stable Diffusion, featuring:
- 🚀 React/Vite frontend with Tailwind CSS
- 🔥 Flask REST API backend
- 🧠 ComfyUI workflow integration
- 📁 Local image storage system



## Installation ⚙️
## Note: Requires NVIDIA GPU with 8GB+ VRAM for optimal performance
### Backend Setup 
```bash
# Clone repository
git clone https://github.com/yourusername/image-generation.git
cd image-generation/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt
```
### Frontend Setup
```bash
cd ../frontend
npm install
npm run build
```

## Running the Project 🏃
1. Start ComfyUI (in separate terminal)
   ```bash
   cd ComfyUI
   python main.py
   ```
2. Launch Flask API
   ```bash
   cd backend
   flask run --port 5000
   ```
3. Start React Frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Credits: Built using Stability AI and ComfyUI
