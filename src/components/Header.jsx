export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <span className="brand">Product Store</span>
        <button
          type="button"
          className="cart-button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
        >
          <svg
            className="cart-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h2.5l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
          </svg>
          <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}
