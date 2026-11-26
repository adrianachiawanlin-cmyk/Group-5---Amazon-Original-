import { useRef, useState } from 'react';
import { PRODUCTS, type CategoryId, type Product } from '../data/catalog';
import { StoreImage } from './StoreImage';

interface DealsCarouselProps {
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryId) => void;
}

export function DealsCarousel({ onAddToCart, onOpenProduct, onSelectCategory }: DealsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const dealProducts = PRODUCTS.filter((p) => p.isDeal);

  const scrollTrack = (delta: number) => {
    if (trackRef.current) {
      trackRef.current.scrollLeft += delta;
    }
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="deals" aria-label="Today's Deals" className="bg-surface-card text-on-surface-card p-gutter-lg shadow-sm relative">
      <div className="flex items-baseline justify-between mb-gutter-md">
        <div className="flex items-baseline gap-gutter-md">
          <h2 className="font-headline text-headline-md text-on-surface-card">Today&apos;s Deals</h2>
          <button
            type="button"
            onClick={() => onSelectCategory('deals')}
            className="font-body text-body-sm text-secondary hover:text-accent hover:underline cursor-pointer"
          >
            See all deals
          </button>
        </div>
        <div className="flex items-center gap-gutter-xs">
          <button
            id="deals-prev"
            type="button"
            onClick={() => scrollTrack(-460)}
            aria-label="Scroll deals left"
            className="w-9 h-9 rounded-md border border-outline bg-surface-card hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-md">chevron_left</span>
          </button>
          <button
            id="deals-next"
            type="button"
            onClick={() => scrollTrack(460)}
            aria-label="Scroll deals right"
            className="w-9 h-9 rounded-md border border-outline bg-surface-card hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-md">chevron_right</span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        id="deals-track"
        className="flex gap-gutter-md overflow-x-auto no-scrollbar scroll-smooth pb-gutter-xs"
      >
        {dealProducts.map((product) => {
          const isAdded = recentlyAddedId === product.id;
          return (
            <article
              key={product.id}
              className="shrink-0 w-56 border border-outline rounded-sm p-gutter-md flex flex-col justify-between gap-gutter-sm bg-surface-card hover:border-secondary transition-colors duration-state-change"
            >
              <div>
                <button
                  type="button"
                  onClick={() => onOpenProduct(product)}
                  className="w-full text-left cursor-pointer group"
                >
                  <div className="bg-surface-subtle h-44 flex items-center justify-center p-3 mb-gutter-sm rounded-sm">
                    <StoreImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
                    />
                  </div>
                  <div className="flex items-center gap-gutter-xs mb-1">
                    {product.discountPercent && (
                      <span
                        role="status"
                        className="inline-flex items-center bg-deal-red text-on-deal-red font-label text-label-sm px-2 py-0.5 rounded-sm tabular-nums"
                      >
                        <span className="font-label text-label-sm">{product.discountPercent}% off</span>
                      </span>
                    )}
                    {product.dealLabel && (
                      <span className="font-label text-label-sm text-deal-red">{product.dealLabel}</span>
                    )}
                  </div>
                  <h3 className="font-body text-body-md text-on-surface-card line-clamp-2 mb-1 group-hover:text-secondary">
                    {product.title}
                  </h3>
                </button>
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
                <p className="font-label text-label-sm text-success mt-0.5">{product.deliveryText}</p>
              </div>
              <button
                type="button"
                onClick={() => handleQuickAdd(product)}
                className={`w-full font-label text-label-sm py-1.5 px-3 rounded-full transition-colors duration-state-change cursor-pointer ${
                  isAdded
                    ? 'bg-success text-on-success'
                    : 'bg-tertiary text-on-tertiary hover:bg-accent'
                }`}
              >
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
