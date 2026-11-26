import { useEffect, useState } from 'react';
import { DepartmentBentoRow, TopBentoRow } from './components/BentoGrid';
import { CartDrawer } from './components/CartDrawer';
import { CatalogResultsView } from './components/CatalogResultsView';
import { DealsCarousel } from './components/DealsCarousel';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { PopularGrid } from './components/PopularGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import {
  AuthModal,
  DepartmentDrawer,
  InfoModal,
  LocationModal,
  OrdersModal,
  PrimeModal,
} from './components/StoreModals';
import {
  INITIAL_ORDERS,
  PRODUCTS,
  type CartItem,
  type CategoryId,
  type OrderRecord,
  type Product,
} from './data/catalog';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => loadStored('amazonsg_cart', []));
  const [savedIds, setSavedIds] = useState<string[]>(() => loadStored('amazonsg_saved', []));
  const [orders, setOrders] = useState<OrderRecord[]>(() => loadStored('amazonsg_orders', INITIAL_ORDERS));
  const [userName, setUserName] = useState<string | null>(() => loadStored('amazonsg_user', null));
  const [deliveryLocation, setDeliveryLocation] = useState<string>(() =>
    loadStored('amazonsg_location', 'Singapore')
  );
  const [isPrimeMember, setIsPrimeMember] = useState<boolean>(() => loadStored('amazonsg_prime', false));
  const [language, setLanguage] = useState<string>('EN');

  // Navigation & Search state (null activeCategory + empty query = Homepage Storefront)
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<CategoryId>('all');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isPrimeOpen, setIsPrimeOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string | null; body: string }>({
    title: null,
    body: '',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('amazonsg_cart', JSON.stringify(cart));
      window.localStorage.setItem('amazonsg_saved', JSON.stringify(savedIds));
      window.localStorage.setItem('amazonsg_orders', JSON.stringify(orders));
      window.localStorage.setItem('amazonsg_user', JSON.stringify(userName));
      window.localStorage.setItem('amazonsg_location', JSON.stringify(deliveryLocation));
      window.localStorage.setItem('amazonsg_prime', JSON.stringify(isPrimeMember));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart, savedIds, orders, userName, deliveryLocation, isPrimeMember]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setIsCartOpen(false);
        setIsMenuOpen(false);
        setIsLocationOpen(false);
        setIsAuthOpen(false);
        setIsOrdersOpen(false);
        setIsPrimeOpen(false);
        setInfoModal({ title: null, body: '' });
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId: product.id, quantity }];
    });
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handlePlaceOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleReorder = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      handleAddToCart(product, 1);
      setIsCartOpen(true);
    }
  };

  const handleSelectCategory = (category: CategoryId | null) => {
    if (category === null) {
      setActiveCategory(null);
      setSearchQuery('');
      return;
    }
    setSearchQuery('');
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitSearch = (query: string, category: CategoryId) => {
    setSearchCategory(category);
    setSearchQuery(query);
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCatalogView = activeCategory !== null || searchQuery.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header
        deliveryLocation={deliveryLocation}
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        activeNavCategory={activeCategory}
        cartCount={totalCartCount}
        userName={userName}
        language={language}
        onChangeLanguage={setLanguage}
        onSubmitSearch={handleSubmitSearch}
        onSelectCategory={handleSelectCategory}
        onOpenMenuDrawer={() => setIsMenuOpen(true)}
        onOpenLocationModal={() => setIsLocationOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
        onOpenOrdersModal={() => setIsOrdersOpen(true)}
        onOpenCartDrawer={() => setIsCartOpen(true)}
        onOpenPrimeModal={() => setIsPrimeOpen(true)}
      />

      <main id="top" className="flex-1 max-w-[1500px] w-full mx-auto pb-gutter-xl">
        {isCatalogView ? (
          <CatalogResultsView
            searchQuery={searchQuery}
            activeCategory={activeCategory ?? 'all'}
            deliveryLocation={deliveryLocation}
            onSelectCategory={handleSelectCategory}
            onClearSearch={() => setSearchQuery('')}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onOpenProduct={setSelectedProduct}
          />
        ) : (
          <>
            <HeroCarousel onSelectCategory={handleSelectCategory} />

            {/* Main Grid Container (Overlapping Hero Bottom) */}
            <div className="px-page-margin -mt-36 relative z-20 flex flex-col gap-gutter-lg">
              <TopBentoRow
                userName={userName}
                isPrimeMember={isPrimeMember}
                onSelectCategory={handleSelectCategory}
                onOpenAuthModal={() => setIsAuthOpen(true)}
                onOpenPrimeModal={() => setIsPrimeOpen(true)}
                onOpenOrdersModal={() => setIsOrdersOpen(true)}
              />

              <DealsCarousel
                onAddToCart={(product) => handleAddToCart(product, 1)}
                onOpenProduct={setSelectedProduct}
                onSelectCategory={handleSelectCategory}
              />

              <DepartmentBentoRow onSelectCategory={handleSelectCategory} />

              <PopularGrid
                onOpenProduct={setSelectedProduct}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </>
        )}
      </main>

      <Footer
        onOpenInfo={(title, body) => setInfoModal({ title, body })}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        key={selectedProduct?.id ?? 'none'}
        product={selectedProduct}
        deliveryLocation={deliveryLocation}
        isSaved={selectedProduct ? savedIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleSave={handleToggleSave}
      />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        deliveryLocation={deliveryLocation}
        isPrimeMember={isPrimeMember}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        onOpenProduct={setSelectedProduct}
      />

      <DepartmentDrawer
        isOpen={isMenuOpen}
        userName={userName}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={handleSelectCategory}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      <LocationModal
        isOpen={isLocationOpen}
        currentLocation={deliveryLocation}
        onClose={() => setIsLocationOpen(false)}
        onSelectLocation={setDeliveryLocation}
      />

      <AuthModal
        isOpen={isAuthOpen}
        userName={userName}
        savedIds={savedIds}
        onClose={() => setIsAuthOpen(false)}
        onSignIn={(name) => setUserName(name)}
        onSignOut={() => setUserName(null)}
        onOpenProduct={setSelectedProduct}
        onToggleSave={handleToggleSave}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        orders={orders}
        onClose={() => setIsOrdersOpen(false)}
        onReorder={handleReorder}
      />

      <PrimeModal
        isOpen={isPrimeOpen}
        isPrimeMember={isPrimeMember}
        onClose={() => setIsPrimeOpen(false)}
        onTogglePrime={() => setIsPrimeMember((prev) => !prev)}
      />

      <InfoModal
        title={infoModal.title}
        body={infoModal.body}
        onClose={() => setInfoModal({ title: null, body: '' })}
      />
    </div>
  );
}
