# Image Import Guidelines for Next.js

## Best Practices for Image Handling

### ✅ Do: Import Images as Modules

Always import your images as modules at the top of your component files:

```jsx
import heroImage from "@/assets/images/hero.png";
import logoSVG from "@/assets/images/logo.svg";
// OR
import logoImage from "@/assets/images/logo.svg?url";

export default function Component() {
  return (
    <Image src={heroImage} alt='Hero section image' width={500} height={300} />
    <logoSVG />
    <Image src={logoImage} alt='Hero section image' width={500} height={300} />
  );
}
```

### ❌ Don't: Use Inline Image Paths

Avoid using inline string paths for images:

```jsx
// Don't do this
<Image
  src='/images/hero.png'
  alt='Hero section image'
  width={500}
  height={300}
/>
```

## Why Import Images?

1. **Better Build Optimization**: Next.js can better optimize imported images during build time
2. **Type Safety**: You get TypeScript support and IDE autocompletion
3. **Guaranteed Asset Existence**: Build will fail if image is missing or path is incorrect
4. **Automatic Hash Generation**: Helps with cache busting
5. **Better Development Experience**: Immediate feedback if images are moved or renamed

## Recommended Project Structure

```
src/
├── assets/
│   └── images/
│       ├── hero.png
│       ├── logo.svg
│       └── icons/
└── components/
    └── YourComponent.tsx
```

## Additional Tips

- Use meaningful names for imported images
- Keep images in a dedicated assets folder
- Consider using an index file to export all images if you have many
- Remember to optimize your images before importing them

## Example Image Index File

If you have many images, consider creating an index file:

```typescript:src/assets/images/index.ts
export { default as heroImage } from './hero.png';
export { default as logoImage } from './logo.svg';
export { default as bannerImage } from './banner.jpg';
```

Then import them in your components:

```typescript
import { heroImage, logoImage } from "@/assets/images";
```

---

For any questions about image handling in Next.js, please refer to the [Next.js Image Component Documentation](https://nextjs.org/docs/basic-features/image-optimization).
