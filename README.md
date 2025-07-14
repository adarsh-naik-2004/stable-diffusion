# AI Image Generation Platform

A full-stack text-to-image generation system built using Stable Diffusion, featuring:

- React frontend with Tailwind CSS
- Flask REST API backend
- ComfyUI workflow integration
- Local image storage and retrieval

---

## Features

- Enter a text prompt and generate AI-generated images
- Clean, responsive web interface
- Integration with ComfyUI for Stable Diffusion-based inference
- Modular backend using Flask and Python

---

## Prerequisites

- Python 3.10+
- Node.js and npm
- ComfyUI installed and running locally
- NVIDIA GPU with 8GB+ VRAM recommended for optimal performance

---

## Installation

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/image-generation.git
cd image-generation/backend

# Create virtual environment
python -m venv venv
# Activate it:
# On Linux/Mac
source venv/bin/activate
# On Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run build
```

## Running the Project

### 1. Start ComfyUI in a separate terminal:

```bash
cd ComfyUI
python main.py
```

### 2. Launch the Flask API:

```bash
cd backend
python app.py
```

### 3. Start the React frontend:

```bash
cd frontend
npm run dev
```

Once running, open your browser at http://localhost:5173 and enter a prompt to generate images.

## Folder Structure

```bash
/ComfyUI
  /output              <- Generated image files
/backend
  app.py               <- Flask server
/frontend
  App.jsx              <- React UI
```

## Example Usage
### 1. Input a prompt like: "A sunset over a futuristic skyline"

### 2. Click Generate

### 3. Wait for the image to appear (generation time depends on hardware)

