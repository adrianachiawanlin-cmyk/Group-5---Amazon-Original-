import { useState, type FormEvent } from 'react';
import type { Product } from '../data/catalog';
import { StarRating } from './PopularGrid';
import { StoreImage } from './StoreImage';

export interface MoodRecommendationItem {
  product: Product;
  reason: string;
}

export const QUICK_MOODS = [
  'Cozy rainy afternoon',
  'Deep focus workday',
  'Weekend photo walk',
  'Fresh healthy reset',
];

interface MoodPromptCardProps {
  moodInput: string;
  loading: boolean;
  errorMsg: string | null;
  affirmation: string | null;
  hasResults: boolean;
  onChangeMood: (val: string) => void;
  onSubmitMood: (moodText: string) => void;
  onClear: () => void;
}

export function MoodPromptCard({
  moodInput,
  loading,
  errorMsg,
  affirmation,
  hasResults,
  onChangeMood,
  onSubmitMood,
  onClear,
}: MoodPromptCardProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitMood(moodInput);
  };

  const handleQuickMood = (preset: string) => {
    onChangeMood(preset);
    onSubmitMood(preset);
  };

  return (
    <div
      aria-label="Mood-based product recommendations"
      className="bg-surface-card/95 backdrop-blur-sm text-on-surface-card p-4 rounded-sm shadow-md border border-outline flex flex-col gap-2.5"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-headline text-headline-sm text-on-surface-card leading-snug">
            How are you feeling today?
          </h2>
          <p className="font-body text-body-sm text-on-surface-muted">
            Get a daily affirmation and matching product picks.
          </p>
        </div>
        {(hasResults || errorMsg || affirmation) && (
          <button
            type="button"
            onClick={onClear}
            className="font-label text-label-sm text-secondary hover:text-accent hover:underline shrink-0 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-stretch gap-2">
        <label htmlFor="mood-prompt-input" className="sr-only">
          Your mood for the day
        </label>
        <input
          id="mood-prompt-input"
          type="text"
          maxLength={300}
          value={moodInput}
          onChange={(e) => onChangeMood(e.target.value)}
          placeholder="e.g., Tired, craving cozy coffee..."
          className="flex-1 min-w-0 border border-outline bg-surface-subtle text-on-surface-card placeholder:text-on-surface-muted rounded-sm px-2.5 py-1.5 font-body text-body-sm focus:outline-none focus:border-secondary focus:bg-surface-card"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-tertiary text-on-tertiary hover:bg-accent disabled:opacity-60 font-label text-label-sm px-3.5 py-1.5 rounded-full transition-colors duration-state-change whitespace-nowrap shrink-0 cursor-pointer"
        >
          {loading ? 'Finding...' : 'Match'}
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5">
        {QUICK_MOODS.map((preset) => (
          <button
            key={preset}
            type="button"
            disabled={loading}
            onClick={() => handleQuickMood(preset)}
            className="px-2 py-0.5 rounded-sm border border-outline bg-surface-subtle hover:border-secondary hover:bg-surface-card font-body text-label-sm text-on-surface-card transition-colors duration-state-change whitespace-nowrap cursor-pointer"
          >
            {preset}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="border border-deal-red/40 bg-deal-red/5 text-deal-red px-2.5 py-1.5 rounded-sm flex items-center justify-between gap-2"
        >
          <span className="font-body text-label-sm line-clamp-2">{errorMsg}</span>
          <button
            type="button"
            onClick={() => onSubmitMood(moodInput)}
            className="font-label text-label-sm underline shrink-0 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {affirmation && !errorMsg && (
        <div className="bg-surface-subtle border border-outline rounded-sm px-2.5 py-2 flex items-start gap-2">
          <span
            className="material-symbols-outlined text-title-md text-secondary mt-0.5 shrink-0"
            aria-hidden="true"
          >
            wb_sunny
          </span>
          <p className="font-body text-body-sm text-on-surface-card line-clamp-2">
            &ldquo;{affirmation}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}

interface MoodResultsShelfProps {
  loading: boolean;
  affirmation: string | null;
  summary: string | null;
  results: MoodRecommendationItem[];
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onClear: () => void;
}

export function MoodResultsShelf({
  loading,
  affirmation,
  summary,
  results,
  onAddToCart,
  onOpenProduct,
  onClear,
}: MoodResultsShelfProps) {
  const [addedId, setAddedId] = useState<string | null>(null);

  if (!loading && results.length === 0) {
    return null;
  }

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      aria-label="Mood-matched recommendations"
      className="bg-surface-card text-on-surface-card p-gutter-lg shadow-sm"
    >
      <div className="flex items-center justify-between gap-gutter-md mb-gutter-md">
        <h2 className="font-headline text-headline-md text-on-surface-card">
          Picked for your mood today
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline cursor-pointer"
        >
          Dismiss
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md">
          {[0, 1, 2, 3].map((slot) => (
            <div key={slot} className="border border-outline rounded-sm p-gutter-md flex flex-col gap-3 animate-pulse">
              <div className="bg-surface-subtle h-40 rounded-sm" />
              <div className="h-4 bg-surface-subtle rounded w-3/4" />
              <div className="h-4 bg-surface-subtle rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-gutter-md">
          {affirmation && (
            <div className="bg-surface-subtle border border-outline rounded-sm px-gutter-lg py-gutter-md flex items-start gap-gutter-md">
              <span
                className="material-symbols-outlined text-title-md text-secondary mt-0.5 shrink-0"
                aria-hidden="true"
              >
                wb_sunny
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-label text-label-sm text-secondary">
                  Daily positive affirmation
                </span>
                <p className="font-body text-title-md text-on-surface-card text-pretty">
                  &ldquo;{affirmation}&rdquo;
                </p>
              </div>
            </div>
          )}

          {summary && (
            <p className="font-body text-body-md text-on-surface-card font-medium">{summary}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md items-stretch">
            {results.map(({ product, reason }) => {
              const isAdded = addedId === product.id;
              return (
                <article
                  key={product.id}
                  className="border border-outline hover:border-secondary rounded-sm p-gutter-md flex flex-col justify-between gap-gutter-sm bg-surface-card transition-colors duration-state-change"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenProduct(product)}
                      className="w-full text-left cursor-pointer group"
                    >
                      <div className="bg-surface-subtle h-40 flex items-center justify-center p-3 mb-gutter-sm rounded-sm">
                        <StoreImage
                          src={product.image}
                          alt={product.imageAlt}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
                        />
                      </div>
                      <h3 className="font-body text-body-md font-semibold text-on-surface-card line-clamp-2 mb-1 group-hover:text-secondary">
                        {product.title}
                      </h3>
                    </button>
                    <div className="flex items-center gap-1 mb-1">
                      <StarRating rating={product.rating} />
                      <span className="font-label text-label-sm text-secondary tabular-nums ml-1">
                        {product.reviewCount.toLocaleString('en-SG')}
                      </span>
                    </div>
                    <p className="font-body text-body-sm text-on-surface-muted mb-2 line-clamp-3">
                      {reason}
                    </p>
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
        </div>
      )}
    </section>
  );
}
