# Product Store

A React + Vite product store. It loads 100 products and their categories from the
[DummyJSON API](https://dummyjson.com/docs/products), with search, category filter,
price sort and a cart that survives a refresh.

## Features

- Products and categories fetched on mount, with loading, error and retry states
- Search by title as you type, filter by category, sort by price (low/high)
- Responsive product grid with image, title, rating, price and Add to cart
- "No products match" empty state
- Cart drawer: increase/decrease quantity, remove items, live line totals and total
- Cart count in the header, persisted in `localStorage` (key `cart`)
- Layout adapts from phone (1 column) to laptop/desktop (2–4 columns)

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` holds all state (products, filters, cart) and passes it down with props.
- `src/components/Header.jsx` — brand and cart button with item count.
- `src/components/Filters.jsx` — search input, category select, price sort.
- `src/components/ProductGrid.jsx` — maps products to cards.
- `src/components/ProductCard.jsx` — image, title, rating, price, add button.
- `src/components/Cart.jsx` — drawer with quantities, remove and total.
- The cart is saved in `localStorage` under the key `cart`.
- Decrementing a quantity stops at 1; use **Remove** to delete an item.

## Tech

React 19, Vite 8, plain CSS. Function components and `useState`, `useEffect`,
`useMemo`, `useRef` only. No UI libraries.

## Deploy

The app is a static Vite build, so it deploys to Vercel with no configuration.
