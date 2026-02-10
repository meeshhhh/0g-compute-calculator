# GPU Compute Calculator

A simple React application for calculating GPU compute costs with a clean, minimal dark theme UI.

## Features

- **GPU Model Selection**: Choose from A100, H100, or RTX 4090
- **Hourly Rate Calculation**: Hardcoded per-hour rates for each GPU model
  - A100: $2.50/hr
  - H100: $4.00/hr
  - RTX 4090: $1.20/hr
- **Real-time Cost Estimation**: Instantly calculates costs based on selected GPU and hours
- **Dark Theme**: Clean, minimal UI with a modern dark color scheme

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework for styling

## Getting Started

### Prerequisites

- Node.js (v20.19+ or v22.12+)
- npm

### Installation

1. Install dependencies:
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
│   ├── App.jsx          # Main calculator component
│   ├── App.css          # Additional styles (minimal)
│   ├── index.css        # Tailwind directives and global styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies and scripts
```

## Usage

1. Select a GPU model from the dropdown menu
2. Enter the number of hours you need
3. View the estimated cost calculated in real-time

The calculator displays both the total cost and the breakdown (hours × rate).
