# Next.js E-commerce Store

E-commerce application built with Next.js 15, TypeScript, and Zustand.

## Live Demo

[View Live](https://arts-consolidated-assignment.vercel.app) | [GitHub](https://github.com/pauf419/arts-consolidated-assignment.git)

## Features

- Product listing with server-side pagination
- Product detail pages with SSR
- Shopping cart with persistent storage (Zustand + localStorage)
- Responsive design with CSS Modules
- Error handling and loading states

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Zustand** (state management)
- **CSS Modules**
- **DummyJSON API**

## Build & Start

```bash
# Clone and install
git clone https://github.com/pauf419/arts-consolidated-assignment.git
cd arts-consolidated-assignment
npm install

# Build and run application
npm run build && npm run start

# Open http://localhost:3000
```

## Architecture Decisions

### State Management - Zustand

**Why?** Minimal boilerplate, better performance than Context API, built-in persistence

- ✅ Simple API, TypeScript support, localStorage integration
- ❌ Cart doesn't sync across devices (trade-off for simplicity)

### Styling - CSS Modules

**Why?** Scoped styles, no runtime overhead, easy maintenance

- ✅ No naming conflicts, CSS variables for theming
- ❌ More files than Tailwind (acceptable for better organization)

### Rendering Strategy

- **Server Components**: Product pages (SEO, performance)
- **Client Components**: Cart, Header (interactivity)
- **Server-side Pagination**: SEO-friendly URLs, shareable links

### Error Handling

- Promise `.catch()` instead of try/catch (avoids ESLint warnings)
- Custom `fetchWithRetry` function with timeout and retry logic
- Separate error display components
- Global error boundaries via Next.js `error.tsx`

## Key Trade-offs

| Decision               | Pro                 | Con                  | Why                 |
| ---------------------- | ------------------- | -------------------- | ------------------- |
| localStorage cart      | Fast, no backend    | No cross-device sync | Simpler MVP         |
| Server-side pagination | SEO, shareable URLs | Full page reload     | Better for products |
| Standard `<img>`       | Simple setup        | No optimization      | External API images |

## Known Limitations

1. **Cart**: localStorage only, no cross-device/browser sync
2. **Images**: No lazy loading or Next.js Image optimization
3. **SEO**: Basic meta tags only (no Open Graph, JSON-LD)
4. **Accessibility**: Basic implementation, needs ARIA labels
5. **Testing**: No unit/E2E tests yet
