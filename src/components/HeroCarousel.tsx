import { useEffect, useState } from 'react';
import { HERO_SLIDES, type CategoryId } from '../data/catalog';
import { StoreImage } from './StoreImage';

interface HeroCarouselProps {
  onSelectCategory: (category: CategoryId) => void;
}

export function HeroCarousel({ onSelectCategory }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      aria-label="Featured promotions"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[420px] md:h-[480px] w-full">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-250 ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <StoreImage
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center"
                fallbackLabel={slide.headline}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/35 to-transparent" />
              <div className="absolute top-12 left-12 md:left-20 max-w-lg flex flex-col gap-gutter-sm text-on-primary pr-12">
                <span
                  className={`inline-flex self-start ${slide.badgeClass} font-label text-label-sm px-gutter-sm py-1 rounded-sm`}
                >
                  {slide.badge}
                </span>
                {idx === 0 ? (
                  <h1 className="font-headline text-display-lg text-balance">{slide.headline}</h1>
                ) : (
                  <h2 className="font-headline text-display-lg text-balance">{slide.headline}</h2>
                )}
                <p className="font-body text-title-md text-on-primary text-pretty">{slide.subtitle}</p>
                <div className="pt-gutter-xs">
                  <button
                    type="button"
                    onClick={() => onSelectCategory(slide.targetCategory)}
                    className="inline-flex items-center gap-1 bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg px-5 py-2 rounded-full transition-colors duration-state-change cursor-pointer"
                  >
                    <span className="font-label text-label-lg">{slide.ctaLabel}</span>
                    <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Carousel Prev / Next Controls */}
      <button
        id="hero-prev"
        type="button"
        onClick={goPrev}
        aria-label="Previous promotion"
        className="absolute left-3 top-24 z-20 w-11 h-20 rounded-sm bg-surface-card/70 hover:bg-surface-card text-on-surface-card flex items-center justify-center border border-outline transition-colors duration-state-change cursor-pointer"
      >
        <span className="material-symbols-outlined text-headline-lg">chevron_left</span>
      </button>
      <button
        id="hero-next"
        type="button"
        onClick={goNext}
        aria-label="Next promotion"
        className="absolute right-3 top-24 z-20 w-11 h-20 rounded-sm bg-surface-card/70 hover:bg-surface-card text-on-surface-card flex items-center justify-center border border-outline transition-colors duration-state-change cursor-pointer"
      >
        <span className="material-symbols-outlined text-headline-lg">chevron_right</span>
      </button>
    </section>
  );
}
