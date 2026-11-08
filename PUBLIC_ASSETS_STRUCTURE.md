# Public Assets Structure Guide

## Overview

All public assets are organized in `/public/` following Next.js best practices with a semantic, maintainable structure.

## Directory Structure

```
/public/
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   │   ├── home-desktop.png              # Homepage hero (1672x941)
│   │   │   ├── home-desktop-fallback.avif    # Backup format
│   │   │   ├── discovery-section.jpg         # Discovery/gift section
│   │   │   └── about-story.jpg               # About page story section
│   │   │
│   │   ├── pages/
│   │   │   ├── about-hero.jpg                # About page hero (1920x1080)
│   │   │   ├── about-closing.jpg             # About page closing section
│   │   │   └── about-fragrances.jpg          # About fragrances section
│   │   │
│   │   ├── shop/
│   │   │   ├── hero-men.jpg                  # Shop category: Men
│   │   │   ├── hero-women.jpg                # Shop category: Women
│   │   │   ├── hero-unisex.jpg               # Shop category: Unisex
│   │   │   ├── bottle-men.png                # Collection display: Men
│   │   │   ├── bottle-women.png              # Collection display: Women
│   │   │   ├── premium-collection.png        # Premium collection display
│   │   │   └── product-fallback.png          # Fallback for missing product images
│   │   │
│   │   └── showroom/
│   │       └── preview.avif                  # Showroom page preview
│   │
│   ├── logos/
│   │   ├── afc-mark.svg                      # Logo mark (dark)
│   │   ├── afc-mark-light.svg                # Logo mark (light)
│   │   ├── afc-wordmark.svg                  # Full wordmark (dark)
│   │   └── afc-wordmark-light.svg            # Full wordmark (light)
│   │
│   └── fonts/
│       ├── BodoniModa-Variable.woff2         # Serif font (variable)
│       └── Magister-Extended.otf             # Decorative font
│
├── favicon.ico                               # Browser favicon
├── apple-touch-icon.png                      # iOS home screen icon (180x180)
└── robots.txt                                # SEO robots directive
```

## Usage Examples

### Images

```tsx
// Hero images
<Image
  src="/assets/images/hero/home-desktop.png"
  alt="Homepage hero"
  width={1672}
  height={941}
/>

// Product fallback
<Image
  src={product.image || "/assets/images/shop/product-fallback.png"}
  alt="Product"
/>

// Shop categories
const categoryImages = {
  men: "/assets/images/shop/hero-men.jpg",
  women: "/assets/images/shop/hero-women.jpg",
  unisex: "/assets/images/shop/hero-unisex.jpg",
};
```

### Logos

```tsx
// Mark-based logos (icon-sized)
<Image
  src="/assets/logos/afc-mark.svg"
  alt="AFC Logo"
  width={40}
  height={40}
/>

// Wordmark logos (full branding)
<Image
  src="/assets/logos/afc-wordmark.svg"
  alt="Arabian Fragrance"
  width={200}
  height={60}
/>

// Use light variant on dark backgrounds
<Image
  src="/assets/logos/afc-wordmark-light.svg"
  alt="Arabian Fragrance"
  className="dark:block hidden"
/>
```

### Fonts

```css
@font-face {
  font-family: "Bodoni Moda";
  src: url("/assets/fonts/BodoniModa-Variable.woff2") format("woff2-variations");
  font-display: swap;
}

@font-face {
  font-family: "Magister";
  src: url("/assets/fonts/Magister-Extended.otf") format("opentype");
  font-display: swap;
}
```

## Naming Conventions

### Images

- **Format**: `[purpose]-[variant]-[size].[extension]`
- **Examples**:
  - `home-desktop.png` - Desktop version
  - `about-closing.jpg` - Closing section of about page
  - `product-fallback.png` - Default product image
  - `preview.avif` - Modern format preview

### Logos

- **Format**: `afc-[type]-[variant].[svg|png]`
- **Types**: `mark` (icon), `wordmark` (text)
- **Variants**: dark (default), `light`
- **Examples**: `afc-mark.svg`, `afc-wordmark-light.svg`

### Fonts

- **Format**: `[FontName]-[Variant].[woff2|otf|ttf]`
- **Examples**: `BodoniModa-Variable.woff2`

## Best Practices

### 1. **Organize by Purpose** (not by format)

- ✅ `/assets/images/hero/`, `/assets/images/shop/`
- ❌ `/images/jpg/`, `/images/png/`

### 2. **Use Semantic Paths**

- ✅ `/assets/images/shop/product-fallback.png`
- ❌ `/assets/images/bottle.png`

### 3. **Optimize Images**

- Use AVIF for modern browsers (with fallbacks)
- Compress JPGs to 80-85% quality
- Use WebP for shop images
- Keep PNGs for graphics with transparency

### 4. **Responsive Image Sizing**

- Always provide `width` and `height` to Image component
- Use `sizes` attribute for responsive images
- Example: `sizes="(min-width: 1024px) 50vw, 100vw"`

### 5. **Fallback Images**

- Product images default to `/assets/images/shop/product-fallback.png`
- Always provide `alt` text for accessibility
- Use empty string only when image is decorative

## Updates & Maintenance

### Adding New Assets

1. Place in appropriate subdirectory under `/assets/images/` or `/assets/logos/`
2. Use semantic naming following conventions
3. Update this document with new additions
4. Reference via absolute path: `/assets/[category]/[file]`

### Removing Assets

1. Check all references across codebase
2. Use grep to find usage: `grep -r "assets/images/[name]"`
3. Update fallback values if needed
4. Remove file and commit with explanation

### Refactoring

- Maintain path consistency across all files
- Update TypeScript types if paths change
- Test all routes after reorganization
- Document changes in commit message

## Related Files

- Layout: `/app/[locale]/layout.tsx` (favicon, apple-touch-icon)
- Image Component: `/components/ui/SmoothImage.tsx` (placeholder blur)
- Shopify Mapping: `/lib/shopify/mapper.ts` (product fallbacks)

## Performance Notes

- Total asset size is optimized
- Images are lazy-loaded by default
- Use `priority={true}` only for above-fold images
- Fonts use `font-display: swap` for FOUT

---

**Last Updated**: Nov 8, 2026  
**Structure Version**: 2.0 (Professional Organization)
