export default function Filters({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        placeholder="Search products…"
        aria-label="Search products by title"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        aria-label="Filter by category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort by price"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Sort by price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  )
}
