import { useMemo, useState } from 'react';
import { CATEGORY_LABELS, PRODUCTS, type CategoryId, type Product } from '../data/catalog';
import { StarRating } from './PopularGrid';
import { StoreImage } from './StoreImage';

interface CatalogResultsViewProps {
  searchQuery: string;
  activeCategory: CategoryId;
  deliveryLocation: string;
  onSelectCategory: (category: CategoryId | null) => void;
  onClearSearch: () => void;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const FILTER_TABS: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'deals', label: "Today's Deals" },
  { id: 'electronics', label: 'Electronics' },
  { id: 'computers', label: 'Computers' },
  { id: 'fresh', label: 'Amazon Fresh' },
  { id: 'books', label: 'Books' },
  { id: 'toys', label: 'Toys & Games' },
  { id: 'baby', label: 'Baby' },
  { id: 'grocery', label: 'Home & Kitchen' },
  { id: 'gift-cards', label: 'Gift Cards' },
];

export function CatalogResultsView({
  searchQuery,
  activeCategory,
  deliveryLocation,
  onSelectCategory,
  onClearSearch,
  onAddToCart,
  onOpenProduct,
}: CatalogResultsViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [primeOnly, setPrimeOnly] = useState(activeCategory === 'prime');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const list = PRODUCTS.filter((product) => {
      if (primeOnly && !product.isPrime) return false;

      if (activeCategory === 'deals' && !product.isDeal) return false;
      if (activeCategory === 'prime' && !product.isPrime) return false;
      if (
        activeCategory !== 'all' &&
        activeCategory !== 'deals' &&
        activeCategory !== 'prime' &&
        product.category !== activeCategory
      ) {
        return false;
      }

      if (query) {
        const haystack = `${product.title} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
        return haystack.includes(query);
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, activeCategory, sortBy, primeOnly]);

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  const headingLabel = searchQuery
    ? `Results for "${searchQuery}"`
    : CATEGORY_LABELS[activeCategory] || 'Storefront Catalog';

  return (
    <div className="px-page-margin py-gutter-lg flex flex-col gap-gutter-lg">
      {/* Top Result Toolbar */}
      <div className="bg-surface-card p-gutter-lg shadow-sm flex flex-col gap-gutter-md">
        <div className="flex flex-wrap items-center justify-between gap-gutter-md border-b border-outline pb-gutter-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-label text-label-sm text-on-surface-muted">
              <button
                type="button"
                onClick={() => onSelectCategory(null)}
                className="text-secondary hover:text-accent hover:underline cursor-pointer"
              >
                Amazon.sg Home
              </button>
              <span aria-hidden="true">/</span>
              <span>{headingLabel}</span>
            </div>
            <h1 className="font-headline text-headline-md text-on-surface-card">
              {headingLabel}{' '}
              <span className="font-body text-body-md text-on-surface-muted tabular-nums">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-gutter-md">
            <label className="flex items-center gap-2 font-body text-body-sm text-on-surface-card cursor-pointer">
              <input
                type="checkbox"
                checked={primeOnly}
                onChange={(e) => setPrimeOnly(e.target.checked)}
                className="rounded-sm border-outline text-secondary focus:ring-secondary"
              />
              <span className="bg-prime-blue text-on-tertiary font-label text-label-sm px-1.5 py-0.5 rounded-sm">
                prime
              </span>
              <span>Eligible</span>
            </label>

            <div className="flex items-center gap-2">
              <label htmlFor="catalog-sort" className="font-label text-label-sm text-on-surface-muted">
                Sort by:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-surface-subtle border border-outline rounded-sm px-3 py-1.5 font-body text-body-sm text-on-surface-card cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectCategory(null);
              }}
              className="px-3 py-1.5 border border-outline rounded-sm bg-surface-subtle hover:bg-outline/30 font-label text-label-sm text-on-surface-card cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_TABS.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3 py-1.5 rounded-sm font-label text-label-sm whitespace-nowrap shrink-0 border transition-colors duration-state-change cursor-pointer ${
                  active
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-subtle text-on-surface-card border-outline hover:border-secondary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-surface-card p-12 shadow-sm text-center flex flex-col items-center gap-gutter-md">
          <span className="material-symbols-outlined text-display-lg text-on-surface-muted" aria-hidden="true">
            search_off
          </span>
          <h2 className="font-headline text-headline-md text-on-surface-card">
            No products matched your filter
          </h2>
          <p className="font-body text-body-md text-on-surface-muted max-w-md">
            Try clearing your search term or browsing all Singapore departments for Electronics, Books, Fresh groceries, and more.
          </p>
          <button
            type="button"
            onClick={() => {
              onClearSearch();
              onSelectCategory('all');
              setPrimeOnly(false);
            }}
            className="bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg px-5 py-2 rounded-full cursor-pointer"
          >
            Show all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <article
                key={product.id}
                className="bg-surface-card border border-outline hover:border-secondary rounded-sm p-gutter-lg flex flex-col justify-between gap-gutter-md shadow-sm transition-colors duration-state-change"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="w-full text-left cursor-pointer group"
                  >
                    <div className="bg-surface-subtle h-48 flex items-center justify-center p-4 mb-gutter-md rounded-sm">
                      <StoreImage
                        src={product.image}
                        alt={product.imageAlt}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
                      />
                    </div>
                    <p className="font-label text-label-sm text-on-surface-muted mb-1">{product.brand}</p>
                    <h2 className="font-body text-body-md font-semibold text-on-surface-card line-clamp-2 mb-1 group-hover:text-secondary">
                      {product.title}
                    </h2>
                  </button>

                  <div className="flex items-center gap-1 mb-2">
                    <StarRating rating={product.rating} />
                    <span className="font-label text-label-sm text-secondary tabular-nums ml-1">
                      {product.reviewCount.toLocaleString('en-SG')}
                    </span>
                  </div>

                  {product.discountPercent && (
                    <div className="flex items-center gap-gutter-xs mb-1">
                      <span className="inline-flex items-center bg-deal-red text-on-deal-red font-label text-label-sm px-2 py-0.5 rounded-sm tabular-nums">
                        {product.discountPercent}% off
                      </span>
                      {product.dealLabel && (
                        <span className="font-label text-label-sm text-deal-red">{product.dealLabel}</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-baseline gap-gutter-xs tabular-nums">
                    <span className="font-headline text-headline-sm text-on-surface-card">
                      S${product.price.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    {product.originalPrice && (
                      <span className="font-label text-label-sm text-on-surface-muted line-through">
                        S${product.originalPrice.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>

                  <p className="font-label text-label-sm text-success mt-1">
                    {product.deliveryText} to {deliveryLocation}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className={`w-full font-label text-label-sm py-2 px-3 rounded-full transition-colors duration-state-change cursor-pointer ${
                      isAdded
                        ? 'bg-success text-on-success'
                        : 'bg-tertiary text-on-tertiary hover:bg-accent'
                    }`}
                  >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="w-full border border-outline bg-surface-subtle hover:bg-outline/30 text-on-surface-card font-label text-label-sm py-1.5 px-3 rounded-full transition-colors duration-state-change cursor-pointer"
                  >
                    View details
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
