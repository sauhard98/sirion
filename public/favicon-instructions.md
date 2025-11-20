# Logo & Favicon Setup

## Required Files

Place your Sirion logo in the following locations:

1. **Favicon**: `public/favicon.ico`
2. **Apple Touch Icon**: `public/apple-touch-icon.png` (180x180px)
3. **Favicon 32x32**: `public/favicon-32x32.png`
4. **Favicon 16x16**: `public/favicon-16x16.png`
5. **Logo SVG**: `public/logo.svg` (for use in components)
6. **Logo PNG**: `public/logo.png` (for fallback)

## Recommended Sizes

- favicon.ico: 16x16, 32x32, 48x48 (multi-size ICO)
- Apple touch icon: 180x180px
- Open Graph image: 1200x630px (for social sharing)

## Usage in Components

To use the logo in React components:

```tsx
import Image from 'next/image'

<Image
  src="/logo.svg"
  alt="Sirion Logo"
  width={120}
  height={40}
/>
```
