# GPU Compute Price Comparison Tool

A comprehensive React application for comparing GPU compute pricing across 13 providers with real-world 2026 rates. Features an interactive comparison interface, spot pricing support, and a modern dark theme UI.

🔗 **Live Demo**: [0g-compute-calculator.vercel.app](https://0g-compute-calculator.vercel.app)

![GPU Compute Calculator](https://img.shields.io/badge/GPUs-24%2B%20Models-blue) ![Providers](https://img.shields.io/badge/Providers-13-green) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Features

### 🎯 Interactive Price Comparison
- **GPU-First Selection**: Choose from 24+ GPU models, instantly see all providers that offer it
- **Side-by-Side Comparison**: Card-based grid layout showing all providers simultaneously
- **Automatic Ranking**: Top 3 cheapest options highlighted with 🥇🥈🥉 badges
- **Smart Sorting**: Providers automatically sorted by total cost (cheapest first)
- **Real-time Updates**: All prices update instantly as you change inputs

### 💰 Comprehensive Pricing Data
- **13 Providers**: Decentralized, Marketplace, and Cloud providers
  - **Decentralized**: Akash Network, io.net, Hyperbolic, Fluence, Aethir
  - **Marketplace**: Vast.ai, TensorDock
  - **Cloud**: RunPod, Lambda Labs, DataCrunch, CoreWeave, Paperspace, Jarvislabs
- **24+ GPU Models**: H100, H200, B200, A100 (40/80GB variants), RTX 4090, RTX 6000 Ada, L40S, A40, V100, and more
- **Price Range**: From $0.20/hr (io.net RTX 4090) to $6.15/hr (CoreWeave H100 SXM5)

### ⚡ Spot Pricing Support
- **Dual Pricing**: View both on-demand and spot pricing where available
- **Automatic Savings**: Calculate savings with spot pricing instantly
- **Provider-Specific**: TensorDock and DataCrunch offer real spot rates
- **Toggle Mode**: Switch between "Prefer Spot" and "On-Demand Only" modes

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Color-Coded Types**: Purple (Decentralized), Blue (Marketplace), Gray (Cloud)
- **Dark Theme**: Easy on the eyes with modern aesthetics
- **Hover Effects**: Interactive cards with smooth transitions
- **Price Range Summary**: See min/max prices at a glance

## Example Use Cases

**Scenario 1**: Need H100 80GB for 100 hours?
- io.net: **$25** (Best Deal! 🥇)
- Aethir: $125
- CoreWeave SXM5: $615
- **Savings**: Up to 24x cheaper with the right provider!

**Scenario 2**: RTX 4090 with spot pricing enabled?
- TensorDock Spot: **$20** for 100 hours (46% off on-demand)
- io.net: $20
- Vast.ai: $34

## Tech Stack

- **React 19**: Modern UI framework with hooks
- **Vite 7**: Lightning-fast build tool and dev server
- **Tailwind CSS 3**: Utility-first CSS framework
- **Vercel**: Deployment and hosting platform

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

1. **Select GPU Model**: Choose from 24+ GPU models in the dropdown
2. **Enter Hours**: Input the number of compute hours needed
3. **Toggle Pricing**: Choose "Prefer Spot" or "On-Demand Only"
4. **Compare Prices**: View all providers side-by-side, sorted by cost
5. **Pick Best Deal**: Top 3 options are highlighted with badges

## Provider Details

### Decentralized Providers
- **Akash Network**: Marketplace with H100 ($1.48/hr), A100 ($0.78/hr)
- **io.net**: Lowest H100 at $0.25/hr, aggregates GPU power globally
- **Hyperbolic**: H100 ($1.49/hr), H200 ($2.15/hr), A100 ($0.75/hr)
- **Fluence**: H100 ($1.25/hr), A100 ($0.80/hr), RTX 4090 ($0.44/hr)
- **Aethir**: H100 ($1.25/hr), 79% cheaper than AWS

### Marketplace Providers
- **Vast.ai**: Lowest A100 SXM at $0.22/hr, wide GPU selection
- **TensorDock**: Real spot pricing with 15-46% discounts

### Cloud Providers
- **RunPod**: Per-second billing, no egress fees
- **Lambda Labs**: Production clusters, B200 available
- **DataCrunch**: Spot pricing with up to 65% off
- **CoreWeave**: Premium cloud with HGX configurations
- **Paperspace**: 3-year commitment discounts available
- **Jarvislabs**: Affordable H200 at $3.80/hr

## Deployment

This project is deployed on Vercel with automatic deployments from the `main` branch.

**Live URL**: https://0g-compute-calculator.vercel.app

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

All pricing data is sourced from provider websites and documentation as of 2026. Rates are subject to change based on:
- Availability and demand
- Geographic region
- Volume commitments
- Spot market fluctuations

**Note**: Prices shown are estimates for comparison purposes. Always verify current pricing with providers before committing to usage.

## Contributing

Contributions are welcome! To add new providers or update pricing:

1. Fork the repository
2. Update the `PROVIDERS` object in `src/App.jsx`
3. Test the changes locally
4. Submit a pull request

## Roadmap

- [ ] Add filtering by provider type (Decentralized/Marketplace/Cloud)
- [ ] Add GPU performance benchmarks
- [ ] Export comparison results to CSV
- [ ] Add price history charts
- [ ] Support for multi-GPU configurations
- [ ] Add more providers (Genesis Cloud, Fluidstack, etc.)

## License

MIT License - feel free to use this project for any purpose.

## Acknowledgments

- Pricing data sourced from provider websites and documentation
- Built with React, Vite, and Tailwind CSS
- Deployed on Vercel

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Made with ❤️ by the community**
