# Product Store

A React + Vite product store. It loads 100 products from the [DummyJSON API](https://dummyjson.com/docs/products), with search, category filter, price sort and a cart that survives a refresh.

## Run it

```bash
npm install
npm run dev
```

## Structure

- `src/App.jsx` holds all state (products, filters, cart) and passes it down with props.
- `src/components/` has `Header`, `Filters`, `ProductGrid`, `ProductCard` and `Cart`.
- The cart is saved in `localStorage` under the key `cart`.
- Decrementing a quantity stops at 1; use **Remove** to delete an item.
