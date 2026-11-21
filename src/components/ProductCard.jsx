export default function ProductCard({ product, onAddToCart }) {
  const stars = Math.round(product.rating)

  return (
    <article className="card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p className="rating" aria-label={`Rated ${product.rating} out of 5`}>
          <span aria-hidden="true">
            {'★'.repeat(stars)}
            {'☆'.repeat(5 - stars)}
          </span>{' '}
          <span className="rating-number">{product.rating.toFixed(1)}</span>
        </p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button type="button" className="btn" onClick={() => onAddToCart(product)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
