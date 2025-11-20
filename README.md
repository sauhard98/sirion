# Sirion - Next.js + Tailwind CSS Application

A modern, AI-powered contract management platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
sirion/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer, Hero, etc.)
│   └── ui/               # UI components library
├── lib/                  # Utility functions
│   └── utils.ts         # Helper functions
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## 🎨 Design System

### Colors

- **Primary**: Deep purple/indigo (#4F46E5)
- **Accent Blue**: #3B82F6
- **Accent Purple**: #8B5CF6
- **Success**: #10B981

### Components

The project includes a comprehensive component library:

- **Layout Components**: Header, Footer, Hero, PageContainer
- **UI Components**: Button, Card, Badge, Input, StatCard, FeatureCard, TestimonialCard, CTABanner
- **Utilities**: cn(), formatNumber(), debounce(), throttle(), and more

### Typography

- **Display sizes**: display-2xl, display-xl, display-lg, display-md, display-sm
- **Body sizes**: body-xl, body-lg, body-md, body-sm, body-xs

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Custom component library
- **Fonts**: Inter (Google Fonts)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/sirion)

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## 🖼️ Logo & Favicon Setup

Place your logo files in the `public/` directory:
- `favicon.ico`
- `logo.svg`
- `logo.png`

See `public/favicon-instructions.md` for detailed instructions.

## 📄 License

All rights reserved © 2025 Sirion

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.
