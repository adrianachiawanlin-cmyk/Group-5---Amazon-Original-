import { useState, type FormEvent } from 'react';
import {
  PRODUCTS,
  SINGAPORE_DISTRICTS,
  type CategoryId,
  type OrderRecord,
  type Product,
} from '../data/catalog';
import { StoreImage } from './StoreImage';

/* 1. All Departments Side Drawer */
export function DepartmentDrawer({
  isOpen,
  userName,
  onClose,
  onSelectCategory,
  onOpenAuth,
  onOpenOrders,
}: {
  isOpen: boolean;
  userName: string | null;
  onClose: () => void;
  onSelectCategory: (category: CategoryId) => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
}) {
  if (!isOpen) return null;

  const departments: { id: CategoryId; label: string }[] = [
    { id: 'fresh', label: 'Amazon Fresh' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'computers', label: 'Computers & Workspace' },
    { id: 'books', label: 'Books' },
    { id: 'toys', label: 'Toys & Games' },
    { id: 'baby', label: 'Baby & Nursery' },
    { id: 'grocery', label: 'Home, Kitchen & Grocery' },
    { id: 'gift-cards', label: 'Gift Cards' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Shop by Department"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card w-80 max-w-[85vw] h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary-container text-on-primary-container px-gutter-lg py-gutter-md flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="flex items-center gap-2 font-headline text-title-md cursor-pointer"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span>{userName ? `Hello, ${userName}` : 'Hello, sign in'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 rounded-sm hover:bg-primary flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-gutter-md divide-y divide-outline">
          <div className="pb-gutter-md">
            <h3 className="px-gutter-lg py-2 font-headline text-title-md text-on-surface-card">
              Trending
            </h3>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('deals');
                onClose();
              }}
              className="w-full text-left px-gutter-lg py-2.5 font-body text-body-md hover:bg-surface-subtle flex items-center justify-between cursor-pointer"
            >
              <span>Today&apos;s Deals</span>
              <span className="material-symbols-outlined text-body-md text-on-surface-muted">chevron_right</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('prime');
                onClose();
              }}
              className="w-full text-left px-gutter-lg py-2.5 font-body text-body-md hover:bg-surface-subtle flex items-center justify-between cursor-pointer"
            >
              <span>Prime Exclusives</span>
              <span className="material-symbols-outlined text-body-md text-on-surface-muted">chevron_right</span>
            </button>
          </div>

          <div className="py-gutter-md">
            <h3 className="px-gutter-lg py-2 font-headline text-title-md text-on-surface-card">
              Shop by Department
            </h3>
            {departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => {
                  onSelectCategory(dept.id);
                  onClose();
                }}
                className="w-full text-left px-gutter-lg py-2.5 font-body text-body-md hover:bg-surface-subtle flex items-center justify-between cursor-pointer"
              >
                <span>{dept.label}</span>
                <span className="material-symbols-outlined text-body-md text-on-surface-muted">chevron_right</span>
              </button>
            ))}
          </div>

          <div className="pt-gutter-md">
            <h3 className="px-gutter-lg py-2 font-headline text-title-md text-on-surface-card">
              Help &amp; Settings
            </h3>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full text-left px-gutter-lg py-2.5 font-body text-body-md hover:bg-surface-subtle cursor-pointer"
            >
              Your Account &amp; Saved List
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenOrders();
              }}
              className="w-full text-left px-gutter-lg py-2.5 font-body text-body-md hover:bg-surface-subtle cursor-pointer"
            >
              Returns &amp; Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. Delivery Location Modal */
export function LocationModal({
  isOpen,
  currentLocation,
  onClose,
  onSelectLocation,
}: {
  isOpen: boolean;
  currentLocation: string;
  onClose: () => void;
  onSelectLocation: (loc: string) => void;
}) {
  const [postalInput, setPostalInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = postalInput.trim();
    if (/^\d{6}$/.test(cleaned)) {
      onSelectLocation(`Singapore ${cleaned}`);
      setPostalInput('');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your Singapore delivery location"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card max-w-md w-full rounded-sm shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-subtle border-b border-outline px-gutter-lg py-gutter-md flex items-center justify-between">
          <h2 className="font-headline text-title-md">Choose your location</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close location modal"
            className="w-8 h-8 rounded-sm hover:bg-outline/40 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-gutter-lg flex flex-col gap-gutter-md">
          <p className="font-body text-body-sm text-on-surface-muted">
            Delivery options and speeds may vary for different Singapore districts.
          </p>

          <div className="flex flex-col gap-1.5">
            {SINGAPORE_DISTRICTS.map((dist) => (
              <button
                key={dist.label}
                type="button"
                onClick={() => {
                  onSelectLocation(dist.label);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 rounded-sm border flex items-center justify-between cursor-pointer ${
                  currentLocation === dist.label
                    ? 'border-secondary bg-surface-subtle font-semibold'
                    : 'border-outline hover:border-secondary'
                }`}
              >
                <span className="font-body text-body-sm">{dist.label}</span>
                <span className="font-label text-label-sm text-on-surface-muted">{dist.area}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="pt-gutter-sm border-t border-outline flex flex-col gap-2">
            <label htmlFor="sg-postal" className="font-label text-label-sm text-on-surface-card">
              Or enter a 6-digit Singapore postal code
            </label>
            <div className="flex gap-2">
              <input
                id="sg-postal"
                type="text"
                pattern="[0-9]{6}"
                placeholder="e.g. 238801"
                value={postalInput}
                onChange={(e) => setPostalInput(e.target.value)}
                className="flex-1 border border-outline rounded-sm px-3 py-1.5 font-body text-body-sm tabular-nums"
              />
              <button
                type="submit"
                className="bg-surface-subtle border border-outline hover:bg-outline/30 px-4 py-1.5 rounded-sm font-label text-label-sm cursor-pointer"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* 3. Sign In / Account & Saved List Modal */
export function AuthModal({
  isOpen,
  userName,
  savedIds,
  onClose,
  onSignIn,
  onSignOut,
  onOpenProduct,
  onToggleSave,
}: {
  isOpen: boolean;
  userName: string | null;
  savedIds: string[];
  onClose: () => void;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
  onOpenProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
}) {
  const [nameInput, setNameInput] = useState('Adriana Chia');
  const [emailInput, setEmailInput] = useState('adrianachia@example.sg');

  if (!isOpen) return null;

  const savedProducts = savedIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = nameInput.trim();
    if (cleaned) {
      onSignIn(cleaned);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Account and Lists"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card max-w-lg w-full rounded-sm shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-subtle border-b border-outline px-gutter-lg py-gutter-md flex items-center justify-between">
          <h2 className="font-headline text-title-md">
            {userName ? `Account & Lists — ${userName}` : 'Sign in to Amazon.sg'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account dialog"
            className="w-8 h-8 rounded-sm hover:bg-outline/40 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-gutter-lg overflow-y-auto flex flex-col gap-gutter-lg">
          {!userName ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-gutter-md">
              <div className="flex flex-col gap-1">
                <label htmlFor="auth-name" className="font-label text-label-sm">
                  Your Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="border border-outline rounded-sm px-3 py-2 font-body text-body-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="auth-email" className="font-label text-label-sm">
                  Email address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="border border-outline rounded-sm px-3 py-2 font-body text-body-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg py-2.5 rounded-full cursor-pointer"
              >
                Sign in securely
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-between bg-surface-subtle border border-outline rounded-sm p-gutter-md">
              <div>
                <p className="font-headline text-title-md">{userName}</p>
                <p className="font-body text-body-sm text-on-surface-muted">Amazon.sg Shopper</p>
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className="border border-outline bg-surface-card hover:bg-outline/30 px-3 py-1.5 rounded-sm font-label text-label-sm cursor-pointer"
              >
                Sign out
              </button>
            </div>
          )}

          <div className="border-t border-outline pt-gutter-md">
            <h3 className="font-headline text-headline-sm mb-gutter-sm">
              Your Saved List ({savedProducts.length})
            </h3>
            {savedProducts.length === 0 ? (
              <p className="font-body text-body-sm text-on-surface-muted">
                No saved items yet. Click &quot;Add to List&quot; inside any product view to bookmark items here.
              </p>
            ) : (
              <div className="flex flex-col gap-gutter-sm">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 border border-outline rounded-sm p-2"
                  >
                    <div className="w-12 h-12 bg-surface-subtle p-1 shrink-0">
                      <StoreImage src={product.image} alt={product.imageAlt} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenProduct(product);
                          onClose();
                        }}
                        className="font-body text-body-sm font-semibold line-clamp-1 text-left hover:text-secondary cursor-pointer"
                      >
                        {product.title}
                      </button>
                      <span className="font-label text-label-sm tabular-nums">
                        S${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleSave(product.id)}
                      className="font-body text-body-sm text-secondary hover:underline px-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4. Returns & Orders Modal */
export function OrdersModal({
  isOpen,
  orders,
  onClose,
  onReorder,
}: {
  isOpen: boolean;
  orders: OrderRecord[];
  onClose: () => void;
  onReorder: (productId: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Returns and Orders"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card max-w-2xl w-full rounded-sm shadow-xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-subtle border-b border-outline px-gutter-lg py-gutter-md flex items-center justify-between">
          <h2 className="font-headline text-title-md">Your Orders &amp; Returns</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close orders dialog"
            className="w-8 h-8 rounded-sm hover:bg-outline/40 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-gutter-lg overflow-y-auto flex flex-col gap-gutter-md">
          {orders.map((order) => (
            <div key={order.id} className="border border-outline rounded-sm overflow-hidden">
              <div className="bg-surface-subtle px-gutter-md py-gutter-sm border-b border-outline flex flex-wrap justify-between gap-2 text-label-sm text-on-surface-muted">
                <div>
                  <span className="block font-label">ORDER PLACED</span>
                  <span className="text-on-surface-card font-medium">{order.date}</span>
                </div>
                <div>
                  <span className="block font-label">TOTAL</span>
                  <span className="text-on-surface-card font-medium tabular-nums">
                    S${order.total.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="block font-label">SHIP TO</span>
                  <span className="text-on-surface-card font-medium">{order.address}</span>
                </div>
                <div>
                  <span className="block font-label">ORDER #</span>
                  <span className="text-on-surface-card font-mono">{order.id}</span>
                </div>
              </div>
              <div className="p-gutter-md flex flex-col gap-gutter-sm">
                <p className="font-label text-label-sm text-success">{order.status}</p>
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 bg-surface-subtle p-1 shrink-0">
                        <StoreImage src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-body-sm font-semibold line-clamp-1">{item.title}</p>
                        <p className="font-label text-label-sm text-on-surface-muted tabular-nums">
                          Qty: {item.quantity} · S${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onReorder(item.productId);
                        onClose();
                      }}
                      className="shrink-0 bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-sm px-3 py-1.5 rounded-full cursor-pointer"
                    >
                      Buy it again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 5. Prime Membership Modal */
export function PrimeModal({
  isOpen,
  isPrimeMember,
  onClose,
  onTogglePrime,
}: {
  isOpen: boolean;
  isPrimeMember: boolean;
  onClose: () => void;
  onTogglePrime: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Amazon Prime Singapore"
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card max-w-md w-full rounded-sm shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary text-on-primary px-gutter-lg py-gutter-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-prime-blue text-on-tertiary font-label text-label-sm px-2 py-0.5 rounded-sm">
              prime
            </span>
            <h2 className="font-headline text-title-md">Amazon Prime Singapore</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Prime dialog"
            className="w-8 h-8 rounded-sm hover:bg-primary-container flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-gutter-lg flex flex-col gap-gutter-md">
          <h3 className="font-headline text-headline-md">
            {isPrimeMember ? 'Your Prime membership is active' : 'Enjoy Prime benefits for S$4.99/month'}
          </h3>
          <ul className="flex flex-col gap-2 font-body text-body-sm text-on-surface-card">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-title-md text-prime-blue shrink-0">local_shipping</span>
              <span>Free 1-day local delivery on millions of eligible items with no minimum spend.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-title-md text-prime-blue shrink-0">shopping_bag</span>
              <span>2-hour scheduled Amazon Fresh grocery delivery across Singapore.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-title-md text-prime-blue shrink-0">movie</span>
              <span>Unlimited streaming of Prime Video originals and exclusive member deals.</span>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              onTogglePrime();
              onClose();
            }}
            className="w-full bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg py-2.5 rounded-full cursor-pointer"
          >
            {isPrimeMember ? 'Cancel Prime Membership' : 'Start 30-day free trial'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 6. Footer Info Modal */
export function InfoModal({
  title,
  body,
  onClose,
}: {
  title: string | null;
  body: string;
  onClose: () => void;
}) {
  if (!title) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="bg-surface-card text-on-surface-card max-w-md w-full rounded-sm shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-surface-subtle border-b border-outline px-gutter-lg py-gutter-md flex items-center justify-between">
          <h2 className="font-headline text-title-md">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close info dialog"
            className="w-8 h-8 rounded-sm hover:bg-outline/40 flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-gutter-lg flex flex-col gap-gutter-md">
          <p className="font-body text-body-md text-on-surface-card">{body}</p>
          <button
            type="button"
            onClick={onClose}
            className="self-end bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-sm px-5 py-2 rounded-full cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
