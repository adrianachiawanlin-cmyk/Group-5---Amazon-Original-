import { useState, type FormEvent } from 'react';
import { PRODUCTS, type CartItem, type OrderRecord, type Product } from '../data/catalog';
import { StoreImage } from './StoreImage';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  deliveryLocation: string;
  isPrimeMember: boolean;
  onClose: () => void;
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  onOpenProduct: (product: Product) => void;
}

export function CartDrawer({
  isOpen,
  cart,
  deliveryLocation,
  isPrimeMember,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onPlaceOrder,
  onOpenProduct,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'confirm' | 'success'>('cart');
  const [recipientName, setRecipientName] = useState('Adriana Chia');
  const [postalCode, setPostalCode] = useState(deliveryLocation.replace('Singapore ', '') || '238801');
  const [lastOrderId, setLastOrderId] = useState('');

  if (!isOpen) return null;

  const lineItems = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((entry): entry is { product: Product; quantity: number } => Boolean(entry));

  const subtotal = lineItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItems = lineItems.reduce((sum, item) => sum + item.quantity, 0);
  const freeDeliveryThreshold = 40;
  const qualifiesFreeShipping = isPrimeMember || subtotal >= freeDeliveryThreshold || subtotal === 0;
  const shippingFee = qualifiesFreeShipping ? 0 : 4.99;
  const orderTotal = subtotal + shippingFee;

  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    const orderId = `SG-408-${Math.floor(1000000 + Math.random() * 8999999)}`;
    const newOrder: OrderRecord = {
      id: orderId,
      date: '25 Nov 2026',
      status: isPrimeMember ? 'Confirmed — Arriving tomorrow via Prime' : 'Confirmed — Preparing shipment',
      total: orderTotal,
      address: `${recipientName}, Singapore ${postalCode}`,
      items: lineItems.map(({ product, quantity }) => ({
        productId: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
      })),
    };
    setLastOrderId(orderId);
    onPlaceOrder(newOrder);
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={handleClose}
    >
      <div
        className="bg-surface-card text-on-surface-card w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-primary text-on-primary px-gutter-lg py-gutter-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-headline-sm">shopping_cart</span>
            <h2 className="font-headline text-headline-sm tabular-nums">
              {checkoutStep === 'success'
                ? 'Order Confirmed'
                : `Shopping Cart (${totalItems})`}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-sm hover:bg-primary-container flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-title-md">close</span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-gutter-lg flex flex-col gap-gutter-md">
          {checkoutStep === 'success' ? (
            <div className="py-8 flex flex-col items-center text-center gap-gutter-md">
              <span className="material-symbols-outlined text-display-lg text-success" aria-hidden="true">
                check_circle
              </span>
              <h3 className="font-headline text-headline-md text-on-surface-card">
                Order #{lastOrderId} Confirmed
              </h3>
              <p className="font-body text-body-md text-on-surface-muted">
                Thank you, {recipientName}. Your items are being prepared at our Singapore fulfillment center for delivery to Singapore {postalCode}.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg px-6 py-2.5 rounded-full cursor-pointer mt-2"
              >
                Continue shopping
              </button>
            </div>
          ) : lineItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center text-center gap-gutter-md">
              <span className="material-symbols-outlined text-display-lg text-on-surface-muted" aria-hidden="true">
                remove_shopping_cart
              </span>
              <h3 className="font-headline text-headline-sm text-on-surface-card">
                Your Amazon.sg Cart is empty
              </h3>
              <p className="font-body text-body-sm text-on-surface-muted max-w-xs">
                Explore Today&apos;s Deals, Electronics, Books, or Amazon Fresh groceries to add items to your cart.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg px-6 py-2 rounded-full cursor-pointer"
              >
                Shop Today&apos;s Deals
              </button>
            </div>
          ) : checkoutStep === 'confirm' ? (
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="flex flex-col gap-gutter-md">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="self-start flex items-center gap-1 font-body text-body-sm text-secondary hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-body-md">arrow_back</span>
                Back to Cart
              </button>

              <h3 className="font-headline text-headline-sm text-on-surface-card">
                Singapore Delivery Details
              </h3>

              <div className="flex flex-col gap-1">
                <label htmlFor="checkout-name" className="font-label text-label-sm text-on-surface-card">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="border border-outline rounded-sm px-3 py-2 font-body text-body-md focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="checkout-postal" className="font-label text-label-sm text-on-surface-card">
                  Singapore Postal Code
                </label>
                <input
                  id="checkout-postal"
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  title="Enter a 6-digit Singapore postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="border border-outline rounded-sm px-3 py-2 font-body text-body-md tabular-nums focus:outline-none focus:border-secondary"
                />
              </div>

              <div className="bg-surface-subtle border border-outline rounded-sm p-gutter-md flex flex-col gap-1.5 text-body-sm">
                <div className="flex justify-between tabular-nums">
                  <span>Items ({totalItems}):</span>
                  <span>S${subtotal.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between tabular-nums">
                  <span>SG Delivery:</span>
                  <span className={qualifiesFreeShipping ? 'text-success font-semibold' : ''}>
                    {qualifiesFreeShipping ? 'FREE' : `S$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-headline text-headline-sm border-t border-outline pt-2 mt-1 tabular-nums">
                  <span>Order Total:</span>
                  <span>S${orderTotal.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg py-2.5 px-5 rounded-full shadow-sm cursor-pointer"
              >
                Place your order
              </button>
            </form>
          ) : (
            <>
              {/* Free delivery threshold indicator */}
              <div className="bg-surface-subtle border border-outline rounded-sm p-gutter-md flex items-start gap-2">
                <span className="material-symbols-outlined text-title-md text-success shrink-0" aria-hidden="true">
                  {qualifiesFreeShipping ? 'verified' : 'local_shipping'}
                </span>
                <p className="font-body text-body-sm text-on-surface-card">
                  {qualifiesFreeShipping ? (
                    <span className="text-success font-medium">
                      Your order qualifies for FREE Singapore delivery.
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="tabular-nums">
                        S${(freeDeliveryThreshold - subtotal).toFixed(2)}
                      </strong>{' '}
                      more for FREE Singapore delivery (or join Prime).
                    </span>
                  )}
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col divide-y divide-outline">
                {lineItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-gutter-md flex gap-gutter-md">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenProduct(product);
                        onClose();
                      }}
                      className="w-20 h-20 bg-surface-subtle rounded-sm p-2 shrink-0 flex items-center justify-center cursor-pointer"
                    >
                      <StoreImage src={product.image} alt={product.imageAlt} className="w-full h-full object-contain" />
                    </button>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          onOpenProduct(product);
                          onClose();
                        }}
                        className="font-body text-body-sm font-semibold text-on-surface-card line-clamp-2 text-left hover:text-secondary cursor-pointer"
                      >
                        {product.title}
                      </button>
                      <span className="font-headline text-title-md text-on-surface-card tabular-nums">
                        S${(product.price * quantity).toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="inline-flex items-center border border-outline rounded-sm bg-surface-subtle">
                          <button
                            type="button"
                            aria-label={`Decrease quantity for ${product.title}`}
                            onClick={() => onUpdateQty(product.id, quantity - 1)}
                            className="px-2 py-0.5 hover:bg-outline/40 font-label text-label-lg cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-label text-label-sm tabular-nums bg-surface-card">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity for ${product.title}`}
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="px-2 py-0.5 hover:bg-outline/40 font-label text-label-lg cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          className="font-body text-body-sm text-secondary hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {checkoutStep === 'cart' && lineItems.length > 0 && (
          <div className="border-t border-outline bg-surface-subtle p-gutter-lg flex flex-col gap-gutter-sm">
            <div className="flex items-baseline justify-between">
              <span className="font-body text-title-md text-on-surface-card">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
              </span>
              <span className="font-headline text-headline-md text-on-surface-card tabular-nums">
                S${subtotal.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutStep('confirm')}
              className="w-full bg-tertiary text-on-tertiary hover:bg-accent font-label text-label-lg py-2.5 px-5 rounded-full shadow-sm transition-colors duration-state-change cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
