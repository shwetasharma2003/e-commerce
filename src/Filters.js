export default function Filters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort
}) {
  return (
    <div className="filters">
      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>All</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Books</option>
      </select>

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <button onClick={() => {
        setSearch("");
        setCategory("All");
        setSort("");
      }}>
        Clear Filters
      </button>
    </div>
  );
}
