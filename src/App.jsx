import { useState } from 'react'
import './App.css'

// Hardcoded hourly rates for GPU models (in USD)
const GPU_RATES = {
  'A100': 2.50,
  'H100': 4.00,
  'RTX 4090': 1.20,
}

function App() {
  const [selectedGPU, setSelectedGPU] = useState('A100')
  const [hours, setHours] = useState('')

  const calculateCost = () => {
    const numHours = parseFloat(hours)
    if (isNaN(numHours) || numHours < 0) return 0
    return (GPU_RATES[selectedGPU] * numHours).toFixed(2)
  }

  const estimatedCost = calculateCost()

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
          GPU Compute Calculator
        </h1>

        <div className="space-y-6">
          {/* GPU Model Dropdown */}
          <div>
            <label htmlFor="gpu-select" className="block text-sm font-medium text-gray-300 mb-2">
              GPU Model
            </label>
            <select
              id="gpu-select"
              value={selectedGPU}
              onChange={(e) => setSelectedGPU(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.keys(GPU_RATES).map((gpu) => (
                <option key={gpu} value={gpu}>
                  {gpu} - ${GPU_RATES[gpu]}/hr
                </option>
              ))}
            </select>
          </div>

          {/* Hours Input */}
          <div>
            <label htmlFor="hours-input" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Hours
            </label>
            <input
              id="hours-input"
              type="number"
              min="0"
              step="0.1"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter hours"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Cost Display */}
          <div className="pt-4 border-t border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-300">Estimated Cost:</span>
              <span className="text-3xl font-bold text-green-400">
                ${estimatedCost}
              </span>
            </div>
            {hours && (
              <p className="text-sm text-gray-400 mt-2 text-right">
                {hours} hours × ${GPU_RATES[selectedGPU]}/hr
              </p>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Pricing estimates are for reference only. Actual costs may vary.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
