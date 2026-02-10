/**
 * GPU Pricing Service
 *
 * CHALLENGE: Most GPU compute providers don't offer public pricing APIs
 *
 * Provider API Availability Status (as of 2026):
 *
 * ❌ Akash Network - No public pricing API (marketplace model with varying bids)
 * ❌ io.net - No public pricing API
 * ❌ Hyperbolic - No public pricing API
 * ❌ Fluence - No public pricing API
 * ❌ Aethir - No public pricing API
 * ⚠️  Vast.ai - Has API but requires authentication, marketplace model
 * ⚠️  TensorDock - Has API but limited documentation
 * ⚠️  RunPod - Has GraphQL API with pricing data
 * ❌ Lambda Labs - No public pricing API
 * ❌ DataCrunch - No public pricing API
 * ❌ CoreWeave - No public pricing API (enterprise focus)
 * ❌ Paperspace - No public pricing API
 * ❌ Jarvislabs - No public pricing API
 *
 * SOLUTIONS:
 *
 * 1. **Backend Aggregator** (Recommended):
 *    - Create a serverless function (Vercel/Netlify function)
 *    - Periodically scrape/fetch pricing from provider websites
 *    - Cache results for 24 hours
 *    - Serve via your own API endpoint
 *
 * 2. **Manual Updates**:
 *    - Current approach - update pricing manually
 *    - Add "Last Updated" timestamp
 *    - Community contributions via PR
 *
 * 3. **Hybrid Approach**:
 *    - Use APIs for providers that have them (RunPod, Vast.ai)
 *    - Manual updates for others
 *    - Display "Live" vs "Updated [date]" badges
 */

// Example: RunPod GraphQL API (requires API key)
export const fetchRunPodPricing = async (apiKey) => {
  const query = `
    query {
      gpuTypes {
        id
        displayName
        memoryInGb
        lowestPrice {
          minimumBidPrice
          uninterruptablePrice
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.runpod.io/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    return data.data.gpuTypes
  } catch (error) {
    console.error('Error fetching RunPod pricing:', error)
    return null
  }
}

// Example: Vast.ai API (requires API key)
export const fetchVastAIPricing = async (apiKey) => {
  try {
    const response = await fetch('https://console.vast.ai/api/v0/bundles/', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    const data = await response.json()
    return data.offers
  } catch (error) {
    console.error('Error fetching Vast.ai pricing:', error)
    return null
  }
}

/**
 * Backend API Endpoint Structure (Vercel Serverless Function)
 *
 * File: /api/pricing.js
 *
 * export default async function handler(req, res) {
 *   // Check cache first (Redis/Vercel KV)
 *   const cachedPricing = await cache.get('gpu-pricing')
 *
 *   if (cachedPricing && !isCacheExpired(cachedPricing)) {
 *     return res.json(cachedPricing)
 *   }
 *
 *   // Fetch fresh pricing
 *   const pricing = await aggregatePricing()
 *
 *   // Cache for 24 hours
 *   await cache.set('gpu-pricing', pricing, { ex: 86400 })
 *
 *   return res.json(pricing)
 * }
 */

/**
 * Web Scraping Approach (for providers without APIs)
 *
 * - Use Puppeteer/Playwright in serverless function
 * - Navigate to pricing pages
 * - Extract pricing data from DOM
 * - Transform to standardized format
 *
 * Pros: Works for any provider
 * Cons: Fragile (breaks when HTML changes), slower, resource-intensive
 */

// Fallback to hardcoded pricing (current approach)
export const FALLBACK_PRICING = {
  lastUpdated: '2026-02-10',
  providers: {
    // ... your current PROVIDERS object
  },
}

/**
 * RECOMMENDED IMPLEMENTATION:
 *
 * 1. Create Vercel serverless function at /api/pricing.js
 * 2. Use Vercel KV for caching (free tier includes 256MB)
 * 3. Fetch from provider APIs where available
 * 4. Manual updates for others (GitHub Actions scheduled job)
 * 5. Display "Last Updated" timestamp in UI
 * 6. Add refresh button for manual updates
 */
