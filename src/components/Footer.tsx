interface FooterProps {
  onOpenInfo: (title: string, body: string) => void;
  onOpenOrders: () => void;
  onOpenAuth: () => void;
  onOpenLocation: () => void;
}

export function Footer({ onOpenInfo, onOpenOrders, onOpenAuth, onOpenLocation }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto">
      <button
        id="back-to-top"
        type="button"
        onClick={scrollToTop}
        className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-label text-label-lg py-gutter-md text-center transition-colors duration-state-change cursor-pointer"
      >
        <span className="font-label text-label-lg">Back to top</span>
      </button>

      <div className="bg-primary-container text-on-primary-container border-t border-outline/20">
        <div className="max-w-[1000px] mx-auto px-page-margin py-10 grid grid-cols-2 md:grid-cols-4 gap-gutter-xl">
          <div className="flex flex-col gap-gutter-sm">
            <h3 className="font-headline text-title-md text-on-primary">Get to Know Us</h3>
            <ul className="flex flex-col gap-1.5 font-body text-body-sm text-on-footer-dark">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'About Amazon.sg',
                      'Amazon.sg serves customers across Singapore with local fulfillment, 2-hour Amazon Fresh grocery delivery, and Prime international shipping.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  About Amazon
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Careers in Singapore',
                      'Explore software engineering, operations, and retail roles at Amazon Singapore corporate offices and fulfillment centers.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Sustainability',
                      'Climate Pledge Friendly packaging and zero-emission last-mile delivery initiatives across Singapore.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Amazon Science',
                      'Research in automated fulfillment, machine learning recommendations, and natural language shopping.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Amazon Science
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-gutter-sm">
            <h3 className="font-headline text-title-md text-on-primary">Make Money with Us</h3>
            <ul className="flex flex-col gap-1.5 font-body text-body-sm text-on-footer-dark">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Sell on Amazon.sg',
                      'Reach shoppers across Singapore with Fulfillment by Amazon (FBA) local storage and next-day delivery.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Sell on Amazon.sg
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Sell Global',
                      'Expand your Singapore brand into international Amazon marketplaces across North America, Europe, and Japan.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Sell Global
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Associates Programme',
                      'Earn commissions by recommending eligible Amazon.sg products through content and curated lists.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Associates Programme
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Advertise Your Products',
                      'Sponsored Products and brand storefront tools to help customers discover your catalog.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Advertise Your Products
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-gutter-sm">
            <h3 className="font-headline text-title-md text-on-primary">Payment Methods</h3>
            <ul className="flex flex-col gap-1.5 font-body text-body-sm text-on-footer-dark">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Shop with Points',
                      'Redeem eligible Singapore bank rewards points directly at checkout on Amazon.sg.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Shop with Points
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Amazon.sg Gift Cards',
                      'Instant email gift cards with zero expiry dates, redeemable across all Amazon.sg categories.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Amazon.sg Gift Cards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Credit Card Instalments',
                      '0% interest monthly instalments available on qualifying electronics and home purchases with participating SG banks.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Credit Card Instalments
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-gutter-sm">
            <h3 className="font-headline text-title-md text-on-primary">Let Us Help You</h3>
            <ul className="flex flex-col gap-1.5 font-body text-body-sm text-on-footer-dark">
              <li>
                <button type="button" onClick={onOpenAuth} className="hover:underline text-left cursor-pointer">
                  Your Account
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenOrders} className="hover:underline text-left cursor-pointer">
                  Your Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Shipping Rates & Policies',
                      'Free standard delivery on eligible orders over S$40. Prime members enjoy free 1-day local delivery with no minimum.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Shipping Rates &amp; Policies
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenOrders} className="hover:underline text-left cursor-pointer">
                  Returns &amp; Replacements
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfo(
                      'Customer Service Help',
                      'Need assistance with an order, delivery slot, or return? Manage orders anytime from Your Orders or contact 24/7 Singapore support.'
                    )
                  }
                  className="hover:underline text-left cursor-pointer"
                >
                  Help
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-footer-dark text-on-footer-dark py-6 px-page-margin text-center flex flex-col items-center gap-gutter-sm">
        <div className="flex items-center gap-gutter-lg">
          <span className="font-headline text-headline-sm text-on-primary">
            amazon<span className="text-accent">.sg</span>
          </span>
          <button
            type="button"
            onClick={onOpenLocation}
            className="border border-outline/40 hover:border-outline px-3 py-1 rounded-sm font-label text-label-sm cursor-pointer"
          >
            Singapore
          </button>
        </div>
        <p className="font-label text-label-sm text-on-footer-dark/80">
          Conditions of Use &amp; Sale · Privacy Notice · © 1996–2026, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
}
