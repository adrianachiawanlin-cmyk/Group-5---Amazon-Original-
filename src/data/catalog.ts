export type CategoryId =
  | 'all'
  | 'fresh'
  | 'deals'
  | 'prime'
  | 'electronics'
  | 'computers'
  | 'books'
  | 'toys'
  | 'baby'
  | 'grocery'
  | 'gift-cards';

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: Exclude<CategoryId, 'all' | 'deals' | 'prime'>;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  dealLabel?: string;
  rating: number;
  reviewCount: number;
  deliveryText: string;
  isPrime: boolean;
  isDeal?: boolean;
  isPopular?: boolean;
  inStock: boolean;
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
}

export interface HeroSlide {
  id: string;
  badge: string;
  badgeClass: string;
  headline: string;
  subtitle: string;
  ctaLabel: string;
  targetCategory: CategoryId;
  image: string;
  imageAlt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  status: string;
  total: number;
  address: string;
  items: { productId: string; title: string; image: string; price: number; quantity: number }[];
}

export const IMAGES = {
  heroElectronics:
    'https://lh3.googleusercontent.com/aida/ALJJyrDJwFixwlZKr1reyBdRP8KUVxmHcYEiv-jzZ-cPr8xDC8GOwAngew9omm37arBAbk94GU8By-o-ljEdI8V_OG7r6ZsyvvAIM34RrLP-dlj-FEnWqgR_JkumqvaoWCYKnV8yFexVQFV-f7MR8LC53ag6_G7jpXCtpObM6_jJp43BZdpqbV0X0Z5eRKcDVpa3O-W7ffRU19IndUnILDoDhu4in5bCUncp2P0z5dtHumt4cyGZR5kuII0bQvqdng',
  promoFresh:
    'https://lh3.googleusercontent.com/aida/ALJJyrBzQs3FwoKtK5CIwRF65oMJdQ7jtAXx4dDyPktZp-cBBeg4p4zQaTkXofVIFVqu_uvXZGtU4TxwAo_LbwguhysImosqJ6OyaiQ_ZUPep8zY2G_ekZyEXT4oKk1EJDR5_SvlOQOm5Tcm3IsNeRAd3w2Q3HvfV3b_4tmUtzDfVILTh0MG1eXls7cFyagY9DDP4ZW8S0j5b7yVO0C6OpFILSTr8QyqBMpuRj8XibMcdNIribVS4DHzlg',
  catBooks:
    'https://lh3.googleusercontent.com/aida/ALJJyrC7-OummP9Z-jCdFdmxUEbRmu7ZwiPX8lTd4luJ2l36_RD5lIo7r7iAQ1SAONcb1C9BHgrTt490WOMoHgxpKvnhNALVJrWMI47aKjWZT5w2IqUopcTS6oA4SpFrOR3CF0VHx5FClWlMc5gSPQVuGABJtPCINJYmpsjEGrqGF4gaKpjM0uERS4e3cecq1zKr6Z4t5ZeHD8-u6lSaeeAqo6m6EBfgW2rHd1p4-MrtHWwT8wk',
  catHeadphones:
    'https://lh3.googleusercontent.com/aida/ALJJyrC4tfFPBEYBhsYAPra8FodI-bUcJd3r2oXTfWtYQDa9UNPQ0FBygpuLSEQbpSnh8xzw_h6pvVRGw97rsJ8T1IkFs-aRvmZGjYmzvy6fCBLkqT_YFPbbpElrIEMus9N0oZKggV7uCjpzjY3e7juADdi4qB1ie7h1W9T3ZPPpymly3VMOaye1tZ0lil1ZB2seOkf5eg8K-QJwIkRaGRjg_-pbn3w7Icotid--K4c1CPd3V4GWbs2M',
  catLaptop:
    'https://lh3.googleusercontent.com/aida/ALJJyrDByUC6eRcLlXIfsuODovjP8Ie7WgvXeYXb68WeW1-LSouE450WGHnopJYJxuSifp5xjilnmN_Np_jnOQHfzqZztA6mLG5mfroeelrtU_mPknDb9-UdfLL3wqmemd3wG4zywF1YPsW2tN7yK8kA-HMSoUDUAfryLxy8SyBOYeSVjf7zGL83seUH_Cj0WB4McjOJ3NmtspddCPaswNM_vuMY89V-4Sf3jEg_c0QKOWVlAM8T',
  catCamera:
    'https://lh3.googleusercontent.com/aida/ALJJyrAj8HmRGOZvNuI4y1nhTDFvdrT5WoCLQp7NfkYbR-N1SIlNLe7cDTzr1ZwvVFTrEHmwC90jV7aI94f2TOetVxWENyauBI96Q5xmIjp6iro0AZIrruFXLWcMqej1VOAKeTf9JnmeiQt7unLS20BuqEScqIr7DDLSOc0FRQjYYjdxvfZwY2mpKnibgxn_-xR5PW5sDUuxduw9UY-aNcTmGLzDprtFJfduSg1DWouMjBBEoeBw',
  prodKindle:
    'https://lh3.googleusercontent.com/aida/ALJJyrBIDXtIBUHh-OpvOgEpXVTQQHKudtZ1n1XGox-UER6yU4nAfThiOqBoFI8d3yskURz7HS2PUwwUn41zs2JM1W0IhlJ8sy4AbP1-3m7H4f1Zu0WEHOKBlCmvHfATqU8x4BvsK7G34WV_H-Mr0Tk89cc6oo5o-f1tIr89HZ-nfLiQiw6yYdQBj4YhkrdMPYHAT3LZRcdjSWdGGUJ3P8PtfDh5lxfU-B5fqcMZ2DS_Mcdhc_2QKA',
  catToys:
    'https://lh3.googleusercontent.com/aida/ALJJyrD9N460Hv5Ne3ecx_6NDhXeOY3U5G0oqSl8MdVwW0__pvjlRJFNJbQTikwMjBk6U5lb5UXytbQocJaiIL3xTzVEVdUcIeSyzZ8jo3f_Jkwx4u3yJrHPo9LyZjY5C3Jo9kcgM6w4_eRLIeSeiMz-s5xqpZiw3EyIb1UtpuMEujeqUIGSjppaO8vc-WOjK3G5dQ4NiFR060g3oqwcoMpLhuYvvUHaM8Z5V26tWWkhMD8gpQ',
  catBaby:
    'https://lh3.googleusercontent.com/aida/ALJJyrBws7ZPwBHAokCmdypWtFp3ea0PxbEqiJDSn8x-MpyqIboCFopFCwclheh09tHBo4odjif3rlnhkmU5okibahXdiMGEnZxf865TFFlhRjrzQDR_NsHWoCw34tuJKmUr8OsGnHDwusNCUsYq5VfT533Ao81RV8WkocaHcli0hiT-jTV8vVRhoc7BcT8jpXPSbZlQ4c1D6ueU4kaTkuqFuxfnnyX6qOt0GljCQJhI_rPd-Q',
  prodEspresso:
    'https://lh3.googleusercontent.com/aida/ALJJyrDq8hPB7WWp1AdG1iR_bk7cf09500cCKSudqiKjuu1-Bih7fuigfXXa2Y3ff2_MfY2DS3sqbPK-MxIJHb-ouy4sO2et4TQQ6ovCMzEmO_Tn2Y1rEKY-hKVIEb668fU4gm8uI_m1TRK4l-TLA8v35rVY7-8xQNKtcnPKjJNQGAjEvjZaZ0fYvfnsLHQTJ532jEP78Pg1SFbiZitFRCTv-23V8Ec6lHRDsp7B2zkmwuR0lXVCTbS0',
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-electronics',
    badge: 'Black Friday Week',
    badgeClass: 'bg-deal-red text-on-deal-red',
    headline: 'Up to 40% off Electronics & Tech',
    subtitle: 'Fast Prime delivery across Singapore on top audio, laptops, and smart home gear.',
    ctaLabel: 'Shop Electronics Deals',
    targetCategory: 'deals',
    image: IMAGES.heroElectronics,
    imageAlt: 'Wireless headphones, ultrabook laptop, and smart speaker on a studio desk',
  },
  {
    id: 'slide-fresh',
    badge: 'Amazon Fresh Singapore',
    badgeClass: 'bg-prime-blue text-on-tertiary',
    headline: '2-hour grocery delivery to your door',
    subtitle: 'Fresh produce, chilled dairy, and pantry staples with free delivery on orders over S$60.',
    ctaLabel: 'Shop Amazon Fresh',
    targetCategory: 'fresh',
    image: IMAGES.promoFresh,
    imageAlt: 'Fresh tropical fruits, vegetables, and sourdough bread in a grocery bag',
  },
  {
    id: 'slide-gift-guide',
    badge: 'Holiday Gift Guide',
    badgeClass: 'bg-accent text-on-tertiary',
    headline: 'Bestselling Books, Toys & Games',
    subtitle: 'Discover top-rated reads, family board games, and STEM gifts for every age.',
    ctaLabel: 'Explore Gift Guide',
    targetCategory: 'books',
    image: IMAGES.catBooks,
    imageAlt: 'Curated stack of hardcover books',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'sony-xm5',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 399.0,
    originalPrice: 559.0,
    discountPercent: 28,
    dealLabel: 'Limited time deal',
    rating: 4.8,
    reviewCount: 9240,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: true,
    inStock: true,
    image: IMAGES.catHeadphones,
    imageAlt: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description:
      'Industry-leading noise cancellation powered by two processors and eight microphones, with 30 hours of battery life and ultra-clear hands-free calling.',
    highlights: [
      'Auto NC Optimizer automatically adapts to wearing conditions and environment',
      'Up to 30-hour battery life with quick USB-PD charging (3 min charge = 3 hrs playback)',
      'Multipoint Bluetooth connection lets you switch seamlessly between two devices',
    ],
  },
  {
    id: 'kindle-paperwhite-16',
    title: 'Kindle Paperwhite (16 GB) — Glare-free 7" display',
    brand: 'Amazon',
    category: 'electronics',
    price: 189.0,
    originalPrice: 242.0,
    discountPercent: 22,
    dealLabel: 'Limited time deal',
    rating: 4.7,
    reviewCount: 4812,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: false,
    inStock: true,
    image: IMAGES.prodKindle,
    imageAlt: 'Kindle Paperwhite 16 GB',
    description:
      'Now with a 7-inch glare-free display, faster page turns, adjustable warm light, and up to 12 weeks of battery life on a single USB-C charge.',
    highlights: [
      'Waterproof (IPX8) for reading comfortably by the pool or in the bath',
      '16 GB storage holds thousands of books, manga, and audiobooks',
      'Adjustable warm light shifts screen tone from crisp white to amber',
    ],
  },
  {
    id: 'asus-zenbook-14',
    title: 'ASUS Zenbook 14 OLED Ultrabook, 16GB RAM, 512GB SSD',
    brand: 'ASUS',
    category: 'computers',
    price: 1399.0,
    originalPrice: 1699.0,
    discountPercent: 18,
    dealLabel: 'Prime Deal',
    rating: 4.6,
    reviewCount: 642,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: false,
    inStock: true,
    image: IMAGES.catLaptop,
    imageAlt: 'ASUS Zenbook 14 OLED Laptop',
    description:
      'Sleek 1.2kg all-metal ultrabook featuring a 14-inch 2.8K OLED Lumina display, Intel Core Ultra processor, and 15-hour all-day battery.',
    highlights: [
      '14" 2.8K 120Hz OLED HDR NanoEdge display with 100% DCI-P3 colour gamut',
      '16GB LPDDR5X memory and 512GB PCIe 4.0 NVMe SSD',
      'Singapore 3-pin USB-C power adapter included in box',
    ],
  },
  {
    id: 'breville-bambino',
    title: 'Breville Bambino Stainless Steel Espresso Machine (SG Plug)',
    brand: 'Breville',
    category: 'grocery',
    price: 449.0,
    originalPrice: 598.0,
    discountPercent: 25,
    dealLabel: 'Limited time deal',
    rating: 4.7,
    reviewCount: 1590,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: true,
    inStock: true,
    image: IMAGES.prodEspresso,
    imageAlt: 'Breville Bambino Espresso Machine',
    description:
      'Barista-quality third wave specialty coffee at home with ThermoJet heating ready in 3 seconds, 54mm portafilter, and powerful microfoam steam wand.',
    highlights: [
      'ThermoJet heating system achieves optimal 93°C extraction temperature in 3 seconds',
      'Low-pressure pre-infusion followed by high-pressure 9-bar extraction',
      'Local 220-240V Singapore warranty and 3-pin Type G plug',
    ],
  },
  {
    id: 'fujifilm-xs20',
    title: 'Fujifilm X-S20 Mirrorless Camera Body with 18-55mm Lens',
    brand: 'Fujifilm',
    category: 'electronics',
    price: 1849.0,
    originalPrice: 2175.0,
    discountPercent: 15,
    dealLabel: 'Limited time deal',
    rating: 4.9,
    reviewCount: 384,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: false,
    inStock: true,
    image: IMAGES.catCamera,
    imageAlt: 'Fujifilm X-S20 Mirrorless Camera',
    description:
      'Compact 26.1MP X-Trans CMOS 4 mirrorless camera with 5-axis in-body image stabilization, AI subject-detection AF, and 6.2K/30p open-gate video.',
    highlights: [
      'Up to 7.0 stops of 5-axis In-Body Image Stabilization (IBIS)',
      '19 signature Fujifilm Film Simulation modes including Nostalgic Neg.',
      'Includes XF 18-55mm F2.8-4 R LM OIS versatile zoom lens',
    ],
  },
  {
    id: 'melissa-doug-stem',
    title: 'Melissa & Doug Wooden Building Blocks & Robot Kit',
    brand: 'Melissa & Doug',
    category: 'toys',
    price: 42.9,
    originalPrice: 65.9,
    discountPercent: 35,
    dealLabel: 'Limited time deal',
    rating: 4.8,
    reviewCount: 1218,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isDeal: true,
    isPopular: false,
    inStock: true,
    image: IMAGES.catToys,
    imageAlt: 'Classic Wooden STEM Building Set',
    description:
      '100-piece solid wood architectural block and buildable robot kit crafted for imaginative open-ended STEM play and spatial motor development.',
    highlights: [
      'FSC-certified sustainably sourced hardwood with smooth water-based finish',
      'Includes illustrated idea booklet for 12 beginner and advanced builds',
      'Suitable for ages 3 and up with sturdy cotton storage bag',
    ],
  },
  {
    id: 'kindle-signature-32',
    title: 'Kindle Paperwhite Signature Edition (32 GB)',
    brand: 'Amazon',
    category: 'electronics',
    price: 249.0,
    rating: 4.7,
    reviewCount: 4812,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    isPopular: true,
    inStock: true,
    image: IMAGES.prodKindle,
    imageAlt: 'Kindle Paperwhite Signature Edition',
    description:
      'Wireless charging, auto-adjusting front light sensor, and 32 GB storage in a sleek flush-front e-reader built for effortless reading anywhere.',
    highlights: [
      'Auto-adjusting front light adapts smoothly to indoor and outdoor brightness',
      'Qi wireless charging compatible plus USB-C fast charging',
      'Ad-free lockscreen with up to 12 weeks battery life',
    ],
  },
  {
    id: 'atomic-habits-book',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    brand: 'Penguin Random House',
    category: 'books',
    price: 24.5,
    originalPrice: 32.0,
    discountPercent: 23,
    dealLabel: 'Bestseller',
    rating: 4.9,
    reviewCount: 142310,
    deliveryText: 'FREE delivery Tomorrow on orders over S$40',
    isPrime: true,
    isPopular: true,
    inStock: true,
    image: IMAGES.catBooks,
    imageAlt: 'Atomic Habits Hardcover Book',
    description:
      'James Clear’s #1 New York Times bestseller reveals practical strategies that teach you how to form good habits, break bad ones, and master tiny behaviors.',
    highlights: [
      'Hardcover international edition — crisp archival paper',
      'Over 15 million copies sold worldwide',
      'Ships directly from Amazon Singapore fulfillment center',
    ],
  },
  {
    id: 'fresh-organic-bundle',
    title: 'Amazon Fresh Tropical Harvest & Artisan Sourdough Pantry Bundle',
    brand: 'Amazon Fresh',
    category: 'fresh',
    price: 38.9,
    originalPrice: 46.5,
    discountPercent: 16,
    dealLabel: '2-Hour Fresh Delivery',
    rating: 4.8,
    reviewCount: 845,
    deliveryText: '2-hour delivery available today',
    isPrime: true,
    inStock: true,
    image: IMAGES.promoFresh,
    imageAlt: 'Fresh produce and sourdough bread bundle',
    description:
      'Curated weekly essentials featuring vine-ripened tomatoes, Japanese cucumbers, Australian avocados, organic baby spinach, and freshly baked sourdough boule.',
    highlights: [
      'Chilled temperature-controlled 2-hour delivery across Singapore',
      'Locally baked stone-hearth sourdough loaf included',
      'Free Fresh delivery on orders over S$60',
    ],
  },
  {
    id: 'organic-baby-bundle',
    title: 'PureCotton Organic Muslin Swaddle & Baby Nursery Starter Set (6-Pack)',
    brand: 'PureCotton',
    category: 'baby',
    price: 54.0,
    originalPrice: 68.0,
    discountPercent: 21,
    dealLabel: 'Parent Favorite',
    rating: 4.8,
    reviewCount: 726,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    inStock: true,
    image: IMAGES.catBaby,
    imageAlt: 'Organic cotton baby essentials',
    description:
      'GOTS-certified 100% organic cotton muslin wraps, hooded bath towel, and breathable crib sheet designed for Singapore’s warm tropical climate.',
    highlights: [
      'Ultra-breathable open-weave organic cotton gentle on newborn skin',
      'Machine washable — grows softer with every wash',
      'Presented in a recyclable gift box ready for baby showers',
    ],
  },
  {
    id: 'pro-creator-workstation',
    title: 'ProBook Air M-Series 15" Ultrabook + USB-C Dock Bundle',
    brand: 'ASUS',
    category: 'computers',
    price: 1649.0,
    originalPrice: 1899.0,
    discountPercent: 13,
    dealLabel: 'Workspace Pick',
    rating: 4.7,
    reviewCount: 312,
    deliveryText: 'FREE delivery Tomorrow',
    isPrime: true,
    inStock: true,
    image: IMAGES.catLaptop,
    imageAlt: 'Workspace ultrabook setup',
    description:
      'Complete remote work setup pairing a whisper-quiet 15-inch OLED laptop with a dual-4K USB-C desktop hub and ergonomic sleeve.',
    highlights: [
      '24GB unified memory & 1TB high-speed NVMe storage',
      'Wi-Fi 6E and dual Thunderbolt 4 ports',
      '2-year local Singapore on-site pickup warranty',
    ],
  },
  {
    id: 'amazon-sg-egift-card',
    title: 'Amazon.sg Digital Gift Card — Instant Email Delivery (S$50)',
    brand: 'Amazon.sg',
    category: 'gift-cards',
    price: 50.0,
    rating: 4.9,
    reviewCount: 3120,
    deliveryText: 'Instant digital delivery via email',
    isPrime: false,
    inStock: true,
    image: IMAGES.catBooks,
    imageAlt: 'Amazon.sg Gift Card',
    description:
      'Redeemable towards millions of items across Amazon.sg with no expiration date and zero processing fees.',
    highlights: [
      'Delivered in minutes to any Singapore or international email address',
      'No expiry date and no hidden fees',
      'Valid across Electronics, Books, Baby, Toys, and Amazon Fresh',
    ],
  },
];

export const SINGAPORE_DISTRICTS = [
  { label: 'Singapore 238801', area: 'Orchard / Central' },
  { label: 'Singapore 018956', area: 'Marina Bay' },
  { label: 'Singapore 529510', area: 'Tampines' },
  { label: 'Singapore 608526', area: 'Jurong East' },
  { label: 'Singapore 138577', area: 'One-North / Queenstown' },
  { label: 'Singapore 769098', area: 'Yishun' },
];

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  all: 'All Departments',
  fresh: 'Amazon Fresh',
  deals: "Today's Deals",
  prime: 'Prime Exclusives',
  electronics: 'Electronics',
  computers: 'Computers & Workspace',
  books: 'Books',
  toys: 'Toys & Games',
  baby: 'Baby & Nursery',
  grocery: 'Home, Kitchen & Grocery',
  'gift-cards': 'Gift Cards',
};

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'SG-408-9214507',
    date: '18 Nov 2026',
    status: 'Delivered to parcel locker',
    total: 189.0,
    address: 'Singapore 238801',
    items: [
      {
        productId: 'kindle-paperwhite-16',
        title: 'Kindle Paperwhite (16 GB) — Glare-free 7" display',
        image: IMAGES.prodKindle,
        price: 189.0,
        quantity: 1,
      },
    ],
  },
];
