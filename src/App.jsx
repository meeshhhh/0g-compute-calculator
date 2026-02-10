import { useState, useMemo, useEffect } from 'react'
import './App.css'

// Pricing metadata
const PRICING_METADATA = {
  lastUpdated: '2026-02-10',
}

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
  // Get all unique GPU models across all providers
  const allGPUs = useMemo(() => {
    const gpuSet = new Set()
    Object.values(PROVIDERS).forEach(provider => {
      Object.keys(provider.gpus).forEach(gpu => gpuSet.add(gpu))
    })
    return Array.from(gpuSet).sort()
  }, [])

  // Initialize state from URL params or defaults
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search)
    const gpu = params.get('gpu')
    const hours = params.get('hours')

    return {
      gpu: gpu && allGPUs.includes(gpu) ? gpu : 'H100 80GB',
      hours: hours || '100',
    }
  }

  const initialState = getInitialState()
  const [selectedGPU, setSelectedGPU] = useState(initialState.gpu)
  const [hours, setHours] = useState(initialState.hours)

  // Update URL params when state changes
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('gpu', selectedGPU)
    params.set('hours', hours)

    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [selectedGPU, hours])

  // Get providers that offer the selected GPU with pricing
  const availableProviders = useMemo(() => {
    const providers = []

    Object.entries(PROVIDERS).forEach(([name, data]) => {
      if (data.gpus[selectedGPU]) {
        const pricing = data.gpus[selectedGPU]
        const numHours = parseFloat(hours) || 0

        providers.push({
          name,
          type: data.type,
          onDemandRate: pricing.onDemand,
          spotRate: pricing.spot,
          onDemandTotal: pricing.onDemand * numHours,
          spotTotal: pricing.spot ? pricing.spot * numHours : null,
        })
      }
    })

    // Sort by cheapest available price (use spot if available, otherwise on-demand)
    return providers.sort((a, b) => {
      const aCost = a.spotTotal !== null ? a.spotTotal : a.onDemandTotal
      const bCost = b.spotTotal !== null ? b.spotTotal : b.onDemandTotal
      return aCost - bCost
    })
  }, [selectedGPU, hours])

  const typeColors = {
    'Decentralized': 'bg-purple-900/30 text-purple-300 border-purple-700',
    'Marketplace': 'bg-blue-900/30 text-blue-300 border-blue-700',
    'Cloud': 'bg-gray-700/30 text-gray-300 border-gray-600',
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            GPU Compute Price Comparison
          </h1>
          <p className="text-gray-400">
            Compare real-world pricing across 13 providers
          </p>
        </div>

        {/* Selection Panel */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPU Selector */}
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
                {allGPUs.map((gpu) => (
                  <option key={gpu} value={gpu}>
                    {gpu}
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
                step="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Found {availableProviders.length} provider{availableProviders.length !== 1 ? 's' : ''} offering <span className="text-blue-400 font-medium">{selectedGPU}</span>
              </p>
              {availableProviders.length > 0 && (
                <p className="text-gray-500 text-xs mt-1">
                  Price range: ${Math.min(...availableProviders.map(p => p.spotTotal !== null ? p.spotTotal : p.onDemandTotal)).toFixed(2)} - ${Math.max(...availableProviders.map(p => p.spotTotal !== null ? p.spotTotal : p.onDemandTotal)).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Provider Cards */}
        {availableProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableProviders.map((provider, index) => {
              const hasSpot = provider.spotRate !== null
              const bestPrice = hasSpot ? provider.spotTotal : provider.onDemandTotal
              const savings = hasSpot ? provider.onDemandTotal - provider.spotTotal : 0

              return (
                <div
                  key={provider.name}
                  className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  {/* Rank Badge */}
                  {index < 3 && (
                    <div className="flex justify-end mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        index === 1 ? 'bg-gray-400/20 text-gray-300' :
                        'bg-amber-600/20 text-amber-400'
                      }`}>
                        {index === 0 ? '🥇 Best Price' : index === 1 ? '🥈 2nd Best' : '🥉 3rd Best'}
                      </span>
                    </div>
                  )}

                  {/* Provider Name & Type */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-100 mb-1">
                      {provider.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded border ${typeColors[provider.type]}`}>
                      {provider.type}
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2 mb-4">
                    {/* On-Demand Pricing */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">On-Demand:</span>
                      <span className="text-gray-200 font-medium">
                        ${provider.onDemandRate.toFixed(2)}/hr
                      </span>
                    </div>

                    {/* Spot Pricing if available */}
                    {hasSpot && (
                      <div className="flex justify-between items-center bg-purple-900/20 -mx-2 px-2 py-1 rounded">
                        <span className="text-sm text-purple-300">⚡ Spot:</span>
                        <span className="text-purple-200 font-medium">
                          ${provider.spotRate.toFixed(2)}/hr
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total Cost */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{hasSpot ? 'Best Price:' : 'Total Cost:'}</span>
                      <span className="text-2xl font-bold text-green-400">
                        ${bestPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-right mt-1 space-y-0.5">
                      <p className="text-gray-500">
                        for {hours} hours
                      </p>
                      {hasSpot && (
                        <p className="text-purple-400">
                          Save ${savings.toFixed(2)} with spot ({Math.round((savings / provider.onDemandTotal) * 100)}% off)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <p className="text-gray-400 text-lg">
              No providers found for <span className="text-blue-400 font-medium">{selectedGPU}</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try selecting a different GPU model
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-500">
            Pricing data manually updated as of <span className="font-medium text-gray-400">{PRICING_METADATA.lastUpdated}</span>.
            Rates may vary based on availability and region.
          </p>
          <p className="text-xs">
            <a
              href="https://github.com/meeshhhh/0g-compute-calculator/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Report outdated pricing
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
