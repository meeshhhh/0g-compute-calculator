# Dynamic Pricing Implementation Guide

This guide explains how to implement dynamic pricing for the GPU Compute Calculator.

## Current Situation

**Problem**: Pricing is hardcoded in `src/App.jsx` and needs manual updates.

**Why?**: Most GPU providers don't offer public pricing APIs:
- Decentralized providers (Akash, io.net, Hyperbolic) use marketplace models with variable pricing
- Cloud providers (CoreWeave, Paperspace) don't expose pricing APIs
- Only 2-3 providers (RunPod, Vast.ai) have APIs, but require authentication

## Solution Options

### Option 1: Backend API Aggregator (Recommended)

Create a serverless backend that periodically fetches/scrapes pricing and caches it.

#### Architecture

```
User -> React App -> Vercel Function -> Cache (Vercel KV)
                         ↓
                    Provider APIs / Web Scrapers
```

#### Implementation Steps

1. **Create Vercel Serverless Function**

```javascript
// api/pricing.js
import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // Check cache first
  const cached = await kv.get('gpu-pricing')

  if (cached && !isCacheExpired(cached)) {
    return res.json(cached)
  }

  // Fetch fresh pricing
  const pricing = await fetchAllProviderPricing()

  // Cache for 24 hours
  await kv.set('gpu-pricing', pricing, { ex: 86400 })

  return res.json(pricing)
}

async function fetchAllProviderPricing() {
  const [runpod, vastai, manual] = await Promise.all([
    fetchRunPodAPI(),
    fetchVastAIAPI(),
    fetchManualPricing(), // Your hardcoded fallback
  ])

  return {
    lastUpdated: new Date().toISOString(),
    providers: mergeAllPricing(runpod, vastai, manual),
  }
}
```

2. **Install Dependencies**

```bash
npm install @vercel/kv
```

3. **Set up Vercel KV**

- Go to your Vercel dashboard
- Add Vercel KV storage (free tier: 256MB)
- Environment variables will be auto-added

4. **Update React App**

```javascript
// src/App.jsx
useEffect(() => {
  fetch('/api/pricing')
    .then(res => res.json())
    .then(data => {
      setPricing(data.providers)
      setLastUpdated(data.lastUpdated)
    })
}, [])
```

#### Pros
- Real-time pricing for providers with APIs
- Cached results (fast, cheap)
- Fallback to manual pricing
- Scalable

#### Cons
- Requires Vercel KV setup
- Some providers still need manual updates
- API keys need management

---

### Option 2: GitHub Actions Cron Job

Automated scheduled updates to pricing data via GitHub Actions.

#### Implementation

1. **Create GitHub Action**

```yaml
# .github/workflows/update-pricing.yml
name: Update GPU Pricing

on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight
  workflow_dispatch: # Manual trigger

jobs:
  update-pricing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Fetch Pricing Data
        run: node scripts/fetch-pricing.js

      - name: Commit Changes
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add src/data/pricing.json
          git commit -m "chore: update GPU pricing [automated]"
          git push
```

2. **Create Pricing Fetcher Script**

```javascript
// scripts/fetch-pricing.js
import fs from 'fs'

async function updatePricing() {
  const pricing = await fetchAllProviders()

  fs.writeFileSync(
    'src/data/pricing.json',
    JSON.stringify(pricing, null, 2)
  )
}

updatePricing()
```

3. **Update React App**

```javascript
// src/App.jsx
import pricingData from './data/pricing.json'

const PROVIDERS = pricingData.providers
```

#### Pros
- No backend needed
- Free (GitHub Actions)
- Version controlled pricing history
- Automatic deployments via Vercel

#### Cons
- Still requires web scraping for most providers
- Limited to scheduled updates (not real-time)
- Manual fallback still needed

---

### Option 3: Community-Driven Manual Updates (Current)

Keep manual updates but make it easier for community to contribute.

#### Implementation

1. **Add "Last Updated" Timestamp**

```javascript
export const PRICING_METADATA = {
  lastUpdated: '2026-02-10',
  sources: {
    'Akash Network': 'https://akash.network/pricing/gpus/',
    'io.net': 'https://developers.io.net/docs/pricing-model',
    // ...
  }
}
```

2. **Add Update Notification in UI**

```javascript
<div className="text-center mt-4">
  <p className="text-xs text-gray-500">
    Pricing last updated: {PRICING_METADATA.lastUpdated}
  </p>
  <a href="https://github.com/meeshhhh/0g-compute-calculator/issues/new?template=pricing-update.md">
    Report outdated pricing
  </a>
</div>
```

3. **Create Issue Template**

```markdown
<!-- .github/ISSUE_TEMPLATE/pricing-update.md -->
---
name: Pricing Update
about: Report outdated GPU pricing
---

**Provider**: [e.g., Akash Network]
**GPU Model**: [e.g., H100 80GB]
**Current Price in App**: [$X.XX/hr]
**Actual Price**: [$X.XX/hr]
**Source URL**: [provider pricing page]
```

#### Pros
- Simple, no infrastructure needed
- Community can help keep it updated
- Version controlled

#### Cons
- Not real-time
- Relies on community contributions
- Manual work required

---

## Recommended Approach: Hybrid

Combine multiple methods for best results:

1. **API-based** for providers with APIs (RunPod, Vast.ai)
2. **GitHub Actions** for scheduled scraping
3. **Manual fallback** for providers without APIs
4. **Community contributions** for quick fixes

### Implementation Priority

**Phase 1** (Immediate - 1 hour):
- ✅ Add "Last Updated" timestamp to UI
- ✅ Add issue template for pricing updates

**Phase 2** (Short-term - 1 day):
- [ ] Create Vercel serverless function `/api/pricing`
- [ ] Set up Vercel KV caching
- [ ] Implement RunPod API integration

**Phase 3** (Mid-term - 1 week):
- [ ] Add GitHub Actions cron job
- [ ] Implement web scraping for select providers
- [ ] Add "Refresh Pricing" button in UI

**Phase 4** (Long-term - 1 month):
- [ ] Build admin dashboard for pricing management
- [ ] Add price history charts
- [ ] Implement price alerts (email notifications)

---

## API Keys Required

To implement provider APIs, you'll need:

| Provider | API Key Required | Free Tier | Documentation |
|----------|------------------|-----------|---------------|
| RunPod | Yes | Yes (GraphQL) | https://docs.runpod.io/graphql-api |
| Vast.ai | Yes | Yes | https://vast.ai/docs/cli/commands.html |
| TensorDock | No | Public | Limited docs |

Store API keys as environment variables in Vercel:
```bash
RUNPOD_API_KEY=your_key_here
VASTAI_API_KEY=your_key_here
```

---

## Example: Full Implementation

See `src/services/pricingService.js` for code examples of:
- RunPod GraphQL API integration
- Vast.ai REST API integration
- Caching strategy
- Error handling

---

## Testing

1. **Manual Testing**: Update one provider's pricing, verify UI reflects change
2. **API Testing**: Use Postman/Insomnia to test `/api/pricing` endpoint
3. **Cache Testing**: Verify caching works (check response times)
4. **Fallback Testing**: Simulate API failures, ensure fallback to hardcoded data

---

## Monitoring

Track pricing API health:
- Vercel Analytics for endpoint performance
- Sentry for error tracking
- Custom alerts for stale data (>48 hours old)

---

## Cost Estimate

**Vercel KV** (caching):
- Free tier: 256MB, 100k reads/month
- Estimated usage: <10MB, <10k reads/month
- **Cost: $0/month** ✅

**Vercel Functions** (API calls):
- Free tier: 100 GB-hrs/month
- Estimated usage: <1 GB-hr/month
- **Cost: $0/month** ✅

**Total: $0/month** on free tier! 🎉

---

## Next Steps

1. Choose which option to implement (recommend Option 1 - Backend Aggregator)
2. Set up Vercel KV storage
3. Create `/api/pricing.js` serverless function
4. Update React app to fetch from API
5. Add loading states and error handling
6. Deploy and test

Questions? Open an issue on GitHub!
