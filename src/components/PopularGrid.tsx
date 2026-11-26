import { PRODUCTS, type CategoryId, type Product } from '../data/catalog';
import { StoreImage } from './StoreImage';

interface PopularGridProps {
  onOpenProduct: (product: Product) => void;
  onSelectCategory: (category: CategoryId) => void;
}

export function StarRating({ rating }: { rating: number }) {
  const stars = [1, 2, 3, 4, 5].map((index) => {
    if (rating >= index - 0.15) return 'star';
    if (rating >= index - 0.65) return 'star_half';
    return 'star_outline';
  });

  return (
    <div className="flex items-center gap-0.5 text-accent" aria-label={`${rating} out of 5 stars`}>
      {stars.map((icon, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-body-md"
          style={{ fontVariationSettings: icon === 'star_outline' ? "'FILL' 0" : "'FILL' 1" }}
          aria-hidden="true"
        >
          {icon === 'star_outline' ? 'star' : icon}
        </span>
      ))}
    </div>
  );
}

export function PopularGrid({ onOpenProduct, onSelectCategory }: PopularGridProps) {
  const popularOrder = ['kindle-signature-32', 'sony-xm5', 'breville-bambino', 'atomic-habits-book'];
  const popularProducts = popularOrder
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <section id="electronics" aria-label="Top picks in Singapore" className="bg-surface-card text-on-surface-card p-gutter-lg shadow-sm">
      <div className="flex items-baseline justify-between mb-gutter-md">
        <h2 className="font-headline text-headline-md text-on-surface-card">Popular in Singapore</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline cursor-pointer"
        >
          View all bestsellers
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md items-stretch">
        {popularProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onOpenProduct(product)}
            className="border border-outline hover:border-secondary rounded-sm p-gutter-md flex flex-col justify-between gap-gutter-sm transition-colors duration-state-change text-left cursor-pointer group"
          >
            <div className="bg-surface-subtle h-44 w-full flex items-center justify-center p-3 rounded-sm">
              <StoreImage
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <h3 className="font-body text-body-md text-on-surface-card text-balance line-clamp-2 group-hover:text-secondary">
                {product.title}
              </h3>
              <div className="flex items-center gap-1">
                <StarRating rating={product.rating} />
                <span className="font-label text-label-sm text-secondary tabular-nums ml-1">
                  {product.reviewCount.toLocaleString('en-SG')}
                </span>
              </div>
              <span className="font-headline text-headline-sm text-on-surface-card tabular-nums">
                S${product.price.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
