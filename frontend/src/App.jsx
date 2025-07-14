// src/App.jsx
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const generateImage = async () => {
    try {
      setError('')
      setIsLoading(true)
      const response = await axios.post('http://localhost:5000/generate', { prompt })
      const { imageUrl } = response.data
      console.log('Final image URL:', `http://localhost:5000/outputs/${imageUrl}`)
      setImageUrl(`http://localhost:5000/outputs/${imageUrl}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate image')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Image Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your ideas into images using Stable Diffusion
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic cityscape at sunset..."
              className="flex-1 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={generateImage}
              disabled={!prompt || isLoading}
              className={`px-8 py-4 rounded-lg font-semibold text-white transition-all
                ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 
                prompt ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : 'Generate'}
            </button>
          </div>

          {error && (
            <div className="p-4 mb-6 text-red-600 bg-red-50 rounded-lg">
              ⚠️ {error}
            </div>
          )}

          {imageUrl && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Your Generated Image
              </h2>
              <div className="relative group">
                <img
                  src={imageUrl}
                  alt="Generated artwork"
                  className="w-full h-auto rounded-xl shadow-md border border-gray-100 transition-transform duration-300 group-hover:scale-102"
                  onError={() => setError('Failed to load generated image')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}
          
        </div>
        <footer className="text-center text-gray-500 text-sm">
          <p>Powered by AI • Create responsibly</p>
        </footer>
      </div>
    </div>
  )
}

export default App