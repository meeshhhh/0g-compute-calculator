# GPU Compute Price Comparison Tool

A comprehensive React application for comparing GPU compute pricing across 13 providers with real-world 2026 rates. Features an interactive comparison interface, spot pricing display, and a modern dark theme UI.

🔗 **Live Demo**: [0g-compute-calculator.vercel.app](https://0g-compute-calculator.vercel.app)

![GPU Compute Calculator](https://img.shields.io/badge/GPUs-24%2B%20Models-blue) ![Providers](https://img.shields.io/badge/Providers-13-green) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Features

### 🎯 Interactive Price Comparison
- **Welcome Experience**: Clean initial state with guided selection prompt
- **GPU-First Selection**: Choose from 24+ GPU models from a dropdown
- **Side-by-Side Comparison**: Card-based grid layout showing all providers simultaneously
- **Automatic Ranking**: Top 3 cheapest options highlighted with 🥇🥈🥉 badges
- **Smart Sorting**: Providers automatically sorted by best available price (spot if available)
- **Real-time Updates**: All prices update instantly as you change inputs
- **Shareable URLs**: URL parameters persist selections for easy sharing

### 💰 Comprehensive Pricing Data
- **13 Providers**: Decentralized, Marketplace, and Cloud providers
  - **Decentralized**: Akash Network, io.net, Hyperbolic, Fluence, Aethir
  - **Marketplace**: Vast.ai, TensorDock
  - **Cloud**: RunPod, Lambda Labs, DataCrunch, CoreWeave, Paperspace, Jarvislabs
- **24+ GPU Models**: H100, H200, B200, A100 (40/80GB variants), RTX 4090, RTX 6000 Ada, L40S, A40, V100, and more
- **Price Range**: From $0.20/hr (io.net RTX 4090 spot) to $6.15/hr (CoreWeave H100 SXM5)
- **Last Updated**: 2026-02-10 (manually curated from provider websites)

### ⚡ Spot Pricing Display
- **Dual Pricing on Cards**: Both on-demand and spot rates shown side-by-side
- **Automatic Savings**: Calculate savings percentage with spot pricing
- **Purple Highlights**: Spot pricing visually distinguished with purple background
- **Best Price Sorting**: Cards sorted by cheapest available rate (uses spot when available)
- **Provider-Specific**: TensorDock (6 GPUs) and DataCrunch (1 GPU) offer real spot rates

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop (1-3 column grid)
- **Color-Coded Types**: Purple (Decentralized), Blue (Marketplace), Gray (Cloud)
- **Dark Theme**: Easy on the eyes with modern aesthetics
- **Hover Effects**: Interactive cards with smooth transitions
- **Price Range Summary**: See min/max prices at a glance
- **Clean URLs**: No query params on initial load, only when selections are made

## User Flow

### First Visit
1. Visit [0g-compute-calculator.vercel.app](https://0g-compute-calculator.vercel.app)
2. See welcome message: 🖥️ **Get Started** - "Select a GPU model and enter the number of hours to compare prices"
3. Make selections → Provider cards appear automatically
4. URL updates with parameters for sharing

### With Shared URL
1. Click shared link: `?gpu=RTX%204090&hours=100`
2. Instantly see provider comparison for RTX 4090 at 100 hours
3. No welcome screen - goes straight to results

### Example Provider Card

**Without Spot Pricing:**
```
RunPod (Cloud)
On-Demand: $2.69/hr

Total Cost: $269.00
for 100 hours
```

**With Spot Pricing:**
```
TensorDock (Marketplace)        🥇 Best Price
On-Demand: $2.25/hr
⚡ Spot: $1.91/hr [purple highlight]

Best Price: $191.00
for 100 hours
Save $34.00 with spot (15% off)
```

## Example Use Cases

**Scenario 1**: Need H100 80GB for 100 hours?
- io.net: **$25** (Best Deal! 🥇) - Spot pricing
- Aethir: $125
- CoreWeave SXM5: $615
- **Savings**: Up to 24x cheaper with the right provider!

**Scenario 2**: RTX 4090 for 50 hours?
- TensorDock Spot: **$10** (46% off on-demand)
- io.net: $10
- Vast.ai: $17
- TensorDock On-Demand: $18.50

## Tech Stack

- **React 19**: Modern UI framework with hooks
- **Vite 7**: Lightning-fast build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **Vercel**: Deployment and hosting platform with automatic deployments

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/meeshhhh/0g-compute-calculator.git
cd 0g-compute-calculator
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

Create a production build:
```bash
npm run build
```

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
0g-compute-calculator/
├── src/
│   ├── App.jsx          # Main comparison component with provider data
│   ├── App.css          # Additional styles (minimal)
│   ├── index.css        # Tailwind directives and global styles
│   └── main.jsx         # Application entry point
├── public/
│   └── vite.svg         # Vite logo
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

## Usage

### Simple Flow
1. **Select GPU Model**: Choose from 24+ GPU models in the dropdown
2. **Enter Hours**: Input the number of compute hours needed
3. **Compare Prices**: View all providers side-by-side with both on-demand and spot pricing
4. **Pick Best Deal**: Top 3 options are highlighted with 🥇🥈🥉 badges

### Sharing Links
- Change selections → URL automatically updates
- Copy URL and share: `?gpu=RTX%204090&hours=50`
- Recipients see your exact configuration instantly

### Understanding Provider Cards
- **On-Demand**: Standard pricing, always available
- **⚡ Spot**: Discounted rate (15-65% off), may be interrupted
- **Best Price**: Automatically uses spot rate when available
- **Savings**: Shows $ saved and % discount with spot pricing

## Provider Details

### Decentralized Providers
- **Akash Network**: Marketplace with H100 ($1.48/hr), A100 ($0.78/hr)
- **io.net**: Lowest H100 at $0.25/hr, aggregates GPU power globally
- **Hyperbolic**: H100 ($1.49/hr), H200 ($2.15/hr), A100 ($0.75/hr)
- **Fluence**: H100 ($1.25/hr), A100 ($0.80/hr), RTX 4090 ($0.44/hr)
- **Aethir**: H100 ($1.25/hr), 79% cheaper than AWS

### Marketplace Providers
- **Vast.ai**: Lowest A100 SXM at $0.22/hr, wide GPU selection (10 models)
- **TensorDock**: Real spot pricing with 15-46% discounts (6 models with spot)

### Cloud Providers
- **RunPod**: Per-second billing, no egress fees
- **Lambda Labs**: Production clusters, B200 available
- **DataCrunch**: Spot pricing with up to 65% off on H100
- **CoreWeave**: Premium cloud with HGX configurations
- **Paperspace**: 3-year commitment discounts available
- **Jarvislabs**: Affordable H200 at $3.80/hr

### Spot Pricing Availability
- **TensorDock**: H100 SXM5, H200, A100 80GB, RTX 4090, RTX 6000 Ada, L40S
- **DataCrunch**: H100
- **Total**: 7 GPU models across 2 providers

## Deployment

This project is deployed on Vercel with automatic deployments from the `main` branch.

**Live URL**: https://0g-compute-calculator.vercel.app

**Automatic Deployments**: Every push to `main` triggers a new deployment

To deploy your own instance:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Pricing Data

All pricing data is manually curated from provider websites and documentation as of **2026-02-10**.

Rates are subject to change based on:
- Availability and demand
- Geographic region
- Volume commitments
- Spot market fluctuations

**Note**: Prices shown are estimates for comparison purposes. Always verify current pricing with providers before committing to usage.

**Report Outdated Pricing**: [Open an issue](https://github.com/meeshhhh/0g-compute-calculator/issues/new)

## Contributing

Contributions are welcome! To add new providers or update pricing:

1. Fork the repository
2. Update the `PROVIDERS` object in `src/App.jsx`
3. Update `PRICING_METADATA.lastUpdated` date
4. Test the changes locally with `npm run dev`
5. Submit a pull request with description of changes

### Adding a New Provider

```javascript
'Provider Name': {
  type: 'Decentralized', // or 'Marketplace' or 'Cloud'
  gpus: {
    'GPU Model': { onDemand: 1.50, spot: 1.20 }, // spot is optional
    'Another GPU': { onDemand: 2.00, spot: null },
  }
}
```

## Roadmap

- [ ] Add filtering by provider type (Decentralized/Marketplace/Cloud)
- [ ] Add GPU performance benchmarks (TFLOPS, memory bandwidth)
- [ ] Export comparison results to CSV
- [ ] Add price history charts (track changes over time)
- [ ] Support for multi-GPU configurations
- [ ] Add more providers (Genesis Cloud, Fluidstack, etc.)
- [ ] Dark/light theme toggle
- [ ] Currency converter (USD, EUR, etc.)

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Pricing data sourced from provider websites and documentation
- Built with React, Vite, and Tailwind CSS
- Deployed on Vercel with automatic CI/CD
- Community contributions welcome

## Contact

For questions or suggestions, please [open an issue on GitHub](https://github.com/meeshhhh/0g-compute-calculator/issues).

---

**Made with ❤️ by the community**
