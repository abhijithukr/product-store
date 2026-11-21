import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=100'
const CATEGORIES_URL = 'https://dummyjson.com/products/categories'
const CART_KEY = 'cart'

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {}
  } catch {
    return {}
  }
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json()
}

export default function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('')

  const [cart, setCart] = useState(loadCart)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setError(null)

    Promise.all([fetchJson(PRODUCTS_URL), fetchJson(CATEGORIES_URL)])
      .then(([productData, categoryData]) => {
        if (ignore) return
        setProducts(productData.products)
        // The API returns objects ({ slug, name }); accept plain strings too.
        setCategories(
          categoryData.map((c) =>
            typeof c === 'string' ? { slug: c, name: c } : { slug: c.slug, name: c.name },
          ),
        )
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Something went wrong')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [reloadKey])

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch {
      // Storage can be unavailable (private mode); the cart still works in memory.
    }
  }, [cart])

  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    let list = products.filter(
      (p) =>
        p.title.toLowerCase().includes(term) &&
        (selectedCategory === 'all' || p.category === selectedCategory),
    )

    if (sortOrder === 'asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortOrder === 'desc') list = [...list].sort((a, b) => b.price - a.price)

    return list
  }, [products, searchTerm, selectedCategory, sortOrder])

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0)

  function addToCart(product) {
    setCart((prev) => ({
      ...prev,
      [product.id]: { product, qty: (prev[product.id]?.qty ?? 0) + 1 },
    }))
  }

  function changeQty(id, qty) {
    if (qty < 1) return
    setCart((prev) => ({ ...prev, [id]: { ...prev[id], qty } }))
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const { [id]: _removed, ...rest } = prev
      return rest
    })
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="container">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {loading && (
          <p className="status" role="status">
            Loading products…
          </p>
        )}
        {error && (
          <div className="status status-error" role="alert">
            <p>Could not load products: {error}.</p>
            <button type="button" className="btn" onClick={() => setReloadKey((k) => k + 1)}>
              Try again
            </button>
          </div>
        )}
        {!loading && !error && visibleProducts.length === 0 && (
          <p className="status">No products match your search.</p>
        )}
        {!loading && !error && visibleProducts.length > 0 && (
          <ProductGrid products={visibleProducts} onAddToCart={addToCart} />
        )}
      </main>

      {cartOpen && (
        <Cart
          cartItems={cart}
          onQtyChange={changeQty}
          onRemove={removeFromCart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </>
  )
}
