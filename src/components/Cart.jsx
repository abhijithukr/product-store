import { useEffect, useRef } from 'react'

export default function Cart({ cartItems, onQtyChange, onRemove, onClose }) {
  const closeRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const items = Object.values(cartItems)
  const total = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const itemCount = items.reduce((sum, { qty }) => sum + qty, 0)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.classList.add('no-scroll')

    function onKeyDown(e) {
      if (e.key === 'Escape') onCloseRef.current()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <div className="overlay" onClick={onClose}>
      <aside
        className="cart"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>
            Your cart
            {itemCount > 0 && <span className="cart-header-count"> ({itemCount})</span>}
          </h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close cart"
            ref={closeRef}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="cart-item">
                <img src={product.thumbnail} alt="" />
                <div className="cart-item-info">
                  <p className="cart-item-title">{product.title}</p>
                  <p className="cart-item-price">${product.price.toFixed(2)} each</p>
                  <div className="qty">
                    <button
                      type="button"
                      onClick={() => onQtyChange(product.id, qty - 1)}
                      disabled={qty <= 1}
                      aria-label={`Decrease quantity of ${product.title}`}
                    >
                      −
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button
                      type="button"
                      onClick={() => onQtyChange(product.id, qty + 1)}
                      aria-label={`Increase quantity of ${product.title}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-side">
                  <p className="line-total">${(product.price * qty).toFixed(2)}</p>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => onRemove(product.id)}
                    aria-label={`Remove ${product.title} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-footer">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </aside>
    </div>
  )
}
