// src/components/catalog/SearchBar.jsx

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          id="product-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث عن مشروبك المفضل..."
          className="w-full rounded-2xl border-none bg-zinc-100/80 px-12 py-4 text-base font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-500 focus:bg-white focus:ring-2 focus:ring-amber-500/50 shadow-sm dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
