import { useState } from 'react'
import './App.css'

// Real-world GPU pricing data from various providers (USD per hour)
const PROVIDERS = {
  'Akash Network': {
    type: 'Decentralized',
    gpus: {
      'H100 80GB': { onDemand: 1.48, spot: null },
      'A100 80GB': { onDemand: 0.78, spot: null },
      'A6000': { onDemand: 0.45, spot: null },
      'RTX 4090': { onDemand: 0.38, spot: null },
      'V100': { onDemand: 0.25, spot: null },
    }
  },
  'io.net': {
    type: 'Decentralized',
    gpus: {
      'H100 80GB': { onDemand: 0.25, spot: null },
      'A100 80GB': { onDemand: 0.50, spot: null },
      'RTX 4090': { onDemand: 0.20, spot: null },
    }
  },
  'Hyperbolic': {
    type: 'Decentralized',
    gpus: {
      'H100 80GB': { onDemand: 1.49, spot: null },
      'H200 141GB': { onDemand: 2.15, spot: null },
      'A100 80GB': { onDemand: 0.75, spot: null },
    }
  },
  'Fluence': {
    type: 'Decentralized',
    gpus: {
      'H100 80GB': { onDemand: 1.25, spot: null },
      'A100 80GB': { onDemand: 0.80, spot: null },
      'RTX 4090': { onDemand: 0.44, spot: null },
      'L40S': { onDemand: 0.60, spot: null },
    }
  },
  'Aethir': {
    type: 'Decentralized',
    gpus: {
      'H100 80GB': { onDemand: 1.25, spot: null },
      'A100 80GB': { onDemand: 0.78, spot: null },
    }
  },
  'Vast.ai': {
    type: 'Marketplace',
    gpus: {
      'H100 PCIe': { onDemand: 1.45, spot: null },
      'H200': { onDemand: 1.73, spot: null },
      'B200': { onDemand: 2.44, spot: null },
      'A100 SXM': { onDemand: 0.22, spot: null },
      'A100 80GB': { onDemand: 0.50, spot: null },
      'A100 40GB': { onDemand: 0.38, spot: null },
      'RTX 4090': { onDemand: 0.34, spot: null },
      'RTX 6000 Ada': { onDemand: 0.58, spot: null },
      'L40S': { onDemand: 0.48, spot: null },
      'A40': { onDemand: 0.28, spot: null },
    }
  },
  'RunPod': {
    type: 'Cloud',
    gpus: {
      'H100 SXM': { onDemand: 2.69, spot: null },
      'H100 PCIe': { onDemand: 2.49, spot: null },
      'A100 SXM': { onDemand: 1.79, spot: null },
      'A100 80GB': { onDemand: 1.99, spot: null },
      'RTX 4090': { onDemand: 0.34, spot: null },
      'L40S': { onDemand: 0.79, spot: null },
      'A40': { onDemand: 0.39, spot: null },
    }
  },
  'Lambda Labs': {
    type: 'Cloud',
    gpus: {
      'H100 80GB': { onDemand: 3.29, spot: null },
      'B200': { onDemand: 4.99, spot: null },
      'A100 80GB': { onDemand: 1.79, spot: null },
      'A100 40GB': { onDemand: 1.29, spot: null },
    }
  },
  'TensorDock': {
    type: 'Marketplace',
    gpus: {
      'H100 SXM5': { onDemand: 2.25, spot: 1.91 },
      'H200': { onDemand: 2.80, spot: 2.38 },
      'A100 80GB': { onDemand: 0.94, spot: 0.80 },
      'RTX 4090': { onDemand: 0.37, spot: 0.20 },
      'RTX 6000 Ada': { onDemand: 0.65, spot: 0.55 },
      'L40S': { onDemand: 0.55, spot: 0.47 },
    }
  },
  'DataCrunch': {
    type: 'Cloud',
    gpus: {
      'H100': { onDemand: 1.99, spot: 1.40 },
      'A100 80GB': { onDemand: 3.67, spot: null },
    }
  },
  'CoreWeave': {
    type: 'Cloud',
    gpus: {
      'H100 PCIe': { onDemand: 4.25, spot: null },
      'H100 SXM5': { onDemand: 6.15, spot: null },
      'A100 80GB': { onDemand: 2.21, spot: null },
      'A40': { onDemand: 1.06, spot: null },
    }
  },
  'Paperspace': {
    type: 'Cloud',
    gpus: {
      'H100': { onDemand: 5.95, spot: null },
      'A100': { onDemand: 3.09, spot: null },
    }
  },
  'Jarvislabs': {
    type: 'Cloud',
    gpus: {
      'H100': { onDemand: 2.99, spot: null },
      'H200': { onDemand: 3.80, spot: null },
      'A100 80GB': { onDemand: 2.29, spot: null },
      'A100 40GB': { onDemand: 1.29, spot: null },
      'RTX 4090': { onDemand: 0.59, spot: null },
    }
  },
}

function App() {
  const [selectedProvider, setSelectedProvider] = useState('Akash Network')
  const [selectedGPU, setSelectedGPU] = useState('H100 80GB')
  const [hours, setHours] = useState('')
  const [isSpot, setIsSpot] = useState(false)

  const currentProvider = PROVIDERS[selectedProvider]
  const availableGPUs = Object.keys(currentProvider.gpus)

  // Reset GPU selection if not available in new provider
  const handleProviderChange = (provider) => {
    setSelectedProvider(provider)
    const newProviderGPUs = Object.keys(PROVIDERS[provider].gpus)
    if (!newProviderGPUs.includes(selectedGPU)) {
      setSelectedGPU(newProviderGPUs[0])
    }
    // Reset spot if not available
    if (isSpot && !PROVIDERS[provider].gpus[newProviderGPUs[0]]?.spot) {
      setIsSpot(false)
    }
  }

  const getHourlyRate = () => {
    const gpuPricing = currentProvider.gpus[selectedGPU]
    if (isSpot && gpuPricing.spot) {
      return gpuPricing.spot
    }
    return gpuPricing.onDemand
  }

  const calculateCost = () => {
    const numHours = parseFloat(hours)
    if (isNaN(numHours) || numHours < 0) return 0
    return (getHourlyRate() * numHours).toFixed(2)
  }

  const hasSpotPricing = currentProvider.gpus[selectedGPU]?.spot !== null
  const estimatedCost = calculateCost()
  const currentRate = getHourlyRate().toFixed(2)
  const onDemandRate = currentProvider.gpus[selectedGPU].onDemand

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-100">
          GPU Compute Calculator
        </h1>
        <p className="text-center text-sm text-gray-400 mb-8">
          Compare real-world pricing across providers
        </p>

        <div className="space-y-6">
          {/* Provider Dropdown */}
          <div>
            <label htmlFor="provider-select" className="block text-sm font-medium text-gray-300 mb-2">
              Provider
            </label>
            <select
              id="provider-select"
              value={selectedProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(PROVIDERS).map(([provider, data]) => (
                <option key={provider} value={provider}>
                  {provider} ({data.type})
                </option>
              ))}
            </select>
          </div>

          {/* GPU Model Dropdown */}
          <div>
            <label htmlFor="gpu-select" className="block text-sm font-medium text-gray-300 mb-2">
              GPU Model
            </label>
            <select
              id="gpu-select"
              value={selectedGPU}
              onChange={(e) => {
                setSelectedGPU(e.target.value)
                // Reset spot if not available for this GPU
                if (isSpot && !currentProvider.gpus[e.target.value]?.spot) {
                  setIsSpot(false)
                }
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availableGPUs.map((gpu) => (
                <option key={gpu} value={gpu}>
                  {gpu} - ${currentProvider.gpus[gpu].onDemand}/hr
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Type Toggle */}
          {hasSpotPricing && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Pricing Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSpot(false)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    !isSpot
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  On-Demand
                </button>
                <button
                  onClick={() => setIsSpot(true)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                    isSpot
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div>Spot</div>
                  <div className="text-xs opacity-90">
                    {Math.round((1 - currentProvider.gpus[selectedGPU].spot / onDemandRate) * 100)}% off
                  </div>
                </button>
              </div>
            </div>
          )}

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
              <div className="mt-2 text-right space-y-1">
                <p className="text-sm text-gray-400">
                  {hours} hours × ${currentRate}/hr
                </p>
                {isSpot && hasSpotPricing && (
                  <p className="text-xs text-purple-400">
                    Spot pricing - Save ${(onDemandRate * parseFloat(hours) - estimatedCost).toFixed(2)} (
                    {Math.round((1 - currentProvider.gpus[selectedGPU].spot / onDemandRate) * 100)}% off)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            Pricing data from 2026 research. Rates may vary based on availability and region.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
