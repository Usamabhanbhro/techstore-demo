# Commerce validation notes

- `http://localhost:3000/` rendered the Apple-style home route with the updated navigation and in-scope footer destinations.
- `/shop` rendered the expanded catalog with 48 products, category filter buttons, availability, price, and sort controls.
- `/products/iphone-17-pro` rendered structured product detail content: image gallery, storage variants, availability and delivery panel, quantity controls, add-to-bag/wishlist actions, accordions, compatibility notes, compatible accessories, related products, and recently viewed products.
- Adding the iPhone 17 Pro changed the live bag count from 0 to 1 and the CTA to `Added to bag`.
- `/cart` rendered the persisted cart line, quantity controls, remove action, subtotal, free delivery logic, promo code field, and checkout handoff.
- `/checkout` rendered contact/address fields, validation messages, standard delivery and Apple Store pickup choices, six simulated payment methods, demo outcome selector, transparent no-real-payment disclosure, and order summary.
- Clicking the checkout CTA with blank/invalid required fields displayed field-level validation without submitting an order.
- The repository smoke test passed all 272 documented routes: `routes=272 passed=272 failed=0`.
- `pnpm run check` and `pnpm run build` passed. Build retains existing non-blocking analytics placeholder and chunk-size warnings.
