import { IMAGES, type CategoryId } from '../data/catalog';
import { StoreImage } from './StoreImage';

interface TopBentoRowProps {
  userName: string | null;
  isPrimeMember: boolean;
  onSelectCategory: (category: CategoryId) => void;
  onOpenAuthModal: () => void;
  onOpenPrimeModal: () => void;
  onOpenOrdersModal: () => void;
}

export function TopBentoRow({
  userName,
  isPrimeMember,
  onSelectCategory,
  onOpenAuthModal,
  onOpenPrimeModal,
  onOpenOrdersModal,
}: TopBentoRowProps) {
  return (
    <section
      aria-label="Top categories and sign in"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch"
    >
      {/* Card 1: 2x2 Quad Grid — Deals in Electronics */}
      <article className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full">
        <h2 className="font-headline text-headline-md text-on-surface-card">Deals in Electronics</h2>
        <div className="grid grid-cols-2 gap-gutter-md flex-1">
          <button
            type="button"
            onClick={() => onSelectCategory('electronics')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catHeadphones}
                alt="Wireless headphones"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Headphones</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('computers')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catLaptop}
                alt="Ultrabook laptops"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Laptops</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('electronics')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catCamera}
                alt="Mirrorless cameras"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Cameras</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('electronics')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.prodKindle}
                alt="Kindle e-readers"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Kindle &amp; Tablets</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => onSelectCategory('deals')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          See all deals
        </button>
      </article>

      {/* Card 2: 2x2 Quad Grid — Shop by Category */}
      <article className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full">
        <h2 className="font-headline text-headline-md text-on-surface-card">Shop by category</h2>
        <div className="grid grid-cols-2 gap-gutter-md flex-1">
          <button
            type="button"
            onClick={() => onSelectCategory('books')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catBooks}
                alt="Books"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Books</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('toys')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catToys}
                alt="Toys and games"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Toys &amp; Games</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('baby')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.catBaby}
                alt="Baby essentials"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Baby</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectCategory('grocery')}
            className="group flex flex-col gap-1 text-left cursor-pointer"
          >
            <div className="bg-surface-subtle aspect-square overflow-hidden flex items-center justify-center p-2 w-full">
              <StoreImage
                src={IMAGES.prodEspresso}
                alt="Kitchen and coffee"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-state-change"
              />
            </div>
            <span className="font-body text-body-sm text-on-surface-card">Home &amp; Kitchen</span>
          </button>
        </div>
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Explore all categories
        </button>
      </article>

      {/* Card 3: Single Hero Image — Amazon Fresh */}
      <article
        id="fresh"
        className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full"
      >
        <h2 className="font-headline text-headline-md text-on-surface-card">Amazon Fresh</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('fresh')}
          className="flex-1 overflow-hidden bg-surface-subtle block w-full cursor-pointer"
          aria-label="Shop Amazon Fresh"
        >
          <StoreImage
            src={IMAGES.promoFresh}
            alt="Fresh groceries in kraft bag"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-state-change"
          />
        </button>
        <button
          type="button"
          onClick={() => onSelectCategory('fresh')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Shop same-day groceries
        </button>
      </article>

      {/* Card 4: Sign In Action Card + Prime Box */}
      <div className="flex flex-col gap-gutter-lg h-full">
        <article
          id="signin"
          className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm"
        >
          <header>
            <h2 className="font-headline text-headline-md text-on-surface-card">
              {userName ? `Welcome back, ${userName}` : 'Sign in for best deals'}
            </h2>
          </header>
          <footer>
            {userName ? (
              <button
                type="button"
                onClick={onOpenOrdersModal}
                className="w-full bg-tertiary text-on-tertiary hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary px-5 py-2 rounded-full font-label text-label-lg transition-colors duration-state-change shadow-sm cursor-pointer"
              >
                <span className="font-label text-label-lg">View your orders</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="w-full bg-tertiary text-on-tertiary hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary px-5 py-2 rounded-full font-label text-label-lg transition-colors duration-state-change shadow-sm cursor-pointer"
              >
                <span className="font-label text-label-lg">Sign in securely</span>
              </button>
            )}
          </footer>
        </article>

        <article
          id="prime"
          className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex-1 flex flex-col justify-between gap-gutter-sm shadow-sm"
        >
          <div className="flex items-center gap-gutter-sm">
            <span className="bg-prime-blue text-on-tertiary font-label text-label-sm px-2 py-0.5 rounded-sm">
              prime
            </span>
            <span className="font-label text-label-sm text-on-surface-muted">
              {isPrimeMember ? 'Active SG Member' : 'S$4.99/month'}
            </span>
          </div>
          <h3 className="font-headline text-headline-sm text-on-surface-card">Free 1-day SG delivery</h3>
          <p className="font-body text-body-sm text-on-surface-muted text-pretty">
            Plus Prime Video originals and exclusive member deals. Start your 30-day free trial.
          </p>
          <button
            type="button"
            onClick={onOpenPrimeModal}
            className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
          >
            {isPrimeMember ? 'Manage Prime membership' : 'Try Prime free'}
          </button>
        </article>
      </div>
    </section>
  );
}

interface DepartmentBentoRowProps {
  onSelectCategory: (category: CategoryId) => void;
}

export function DepartmentBentoRow({ onSelectCategory }: DepartmentBentoRowProps) {
  return (
    <section
      aria-label="Curated departments"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch"
    >
      {/* Books Card */}
      <article
        id="books"
        className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full"
      >
        <h2 className="font-headline text-headline-md text-on-surface-card">Bestsellers in Books</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('books')}
          className="flex-1 bg-surface-subtle overflow-hidden flex items-center justify-center p-4 w-full cursor-pointer"
        >
          <StoreImage
            src={IMAGES.catBooks}
            alt="Bestselling hardcover books"
            className="w-full h-56 object-contain hover:scale-105 transition-transform duration-state-change"
          />
        </button>
        <button
          type="button"
          onClick={() => onSelectCategory('books')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Shop Singapore Book Store
        </button>
      </article>

      {/* Computers & Workspace Card */}
      <article
        id="computers"
        className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full"
      >
        <h2 className="font-headline text-headline-md text-on-surface-card">Workspace Tech</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('computers')}
          className="flex-1 bg-surface-subtle overflow-hidden flex items-center justify-center p-4 w-full cursor-pointer"
        >
          <StoreImage
            src={IMAGES.catLaptop}
            alt="Ultrabook workspace setup"
            className="w-full h-56 object-contain hover:scale-105 transition-transform duration-state-change"
          />
        </button>
        <button
          type="button"
          onClick={() => onSelectCategory('computers')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Shop Computers &amp; Accessories
        </button>
      </article>

      {/* Baby Essentials Card */}
      <article
        id="baby"
        className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full"
      >
        <h2 className="font-headline text-headline-md text-on-surface-card">Baby &amp; nursery</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('baby')}
          className="flex-1 bg-surface-subtle overflow-hidden flex items-center justify-center p-4 w-full cursor-pointer"
        >
          <StoreImage
            src={IMAGES.catBaby}
            alt="Organic cotton baby essentials"
            className="w-full h-56 object-contain hover:scale-105 transition-transform duration-state-change"
          />
        </button>
        <button
          type="button"
          onClick={() => onSelectCategory('baby')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Shop Baby Store
        </button>
      </article>

      {/* Toys & Games Card */}
      <article
        id="toys"
        className="bg-surface-card text-on-surface-card p-gutter-lg rounded-none flex flex-col justify-between gap-gutter-md shadow-sm h-full"
      >
        <h2 className="font-headline text-headline-md text-on-surface-card">Toys &amp; games</h2>
        <button
          type="button"
          onClick={() => onSelectCategory('toys')}
          className="flex-1 bg-surface-subtle overflow-hidden flex items-center justify-center p-4 w-full cursor-pointer"
        >
          <StoreImage
            src={IMAGES.catToys}
            alt="Wooden toys and games"
            className="w-full h-56 object-contain hover:scale-105 transition-transform duration-state-change"
          />
        </button>
        <button
          type="button"
          onClick={() => onSelectCategory('toys')}
          className="font-body text-body-sm text-secondary hover:text-accent hover:underline text-left self-start cursor-pointer"
        >
          Shop Toys &amp; Games
        </button>
      </article>
    </section>
  );
}
