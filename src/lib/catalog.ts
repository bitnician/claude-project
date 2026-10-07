// Placeholder storefront content until products and collections come from the database.
// Photography: Unsplash (https://unsplash.com/license).

export type Photo = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  label?: string;
  image: Photo;
  /** Further shots for the product page, after the main image. */
  gallery: Photo[];
  description: string;
  details: string[];
  /** Units available to sell; drives the stock state. */
  stock: number;
};

export type StockState = "in-stock" | "low-stock" | "sold-out";

export type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: Photo;
};

export type Category = {
  slug: string;
  title: string;
  image: Photo;
};

function unsplash(id: string, alt: string): Photo {
  return { src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&q=80`, alt };
}

// A 3:4 close-up of the same photograph, zoomed `zoom` times around the focal point (x, y), each 0–1.
function unsplashDetail(id: string, alt: string, x: number, y: number, zoom: number): Photo {
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}&w=1200&h=1600&q=80`,
    alt,
  };
}

export const campaign = {
  eyebrow: "Autumn–Winter 2026",
  title: "The Quiet Season",
  description: "Sharp tailoring, soft leathers and long coats cut for the city after dark.",
  images: [
    unsplash("1584273143981-41c073dfe8f8", "A model in a black tailored suit crossing a city street"),
    unsplash("1485968579580-b6d095142e6e", "A model in a long dark plaid coat on a shopping street"),
  ],
} as const;

export const collections: Collection[] = [
  {
    slug: "women",
    eyebrow: "Women",
    title: "Light Layers",
    description: "Printed silks and fluid dresses that move with the last warm days.",
    image: unsplash("1496747611176-843222e1e57c", "A model in a floral wrap dress by the sea"),
  },
  {
    slug: "men",
    eyebrow: "Men",
    title: "Leather, Reconsidered",
    description: "Supple outerwear in rich browns, worn over open collars.",
    image: unsplash("1487222477894-8943e31ef7b2", "A model in a brown leather jacket and round sunglasses"),
  },
];

export const products: Product[] = [
  {
    slug: "chain-shoulder-bag-blush",
    name: "Chain Shoulder Bag",
    category: "Bags",
    price: 2450,
    label: "New in",
    image: unsplash("1566150905458-1bf1fc113f0d", "A blush pink leather shoulder bag on a white plinth"),
    gallery: [
      unsplashDetail("1566150905458-1bf1fc113f0d", "Painted chevron stripes across the bag's flap", 0.55, 0.45, 2.2),
      unsplashDetail("1566150905458-1bf1fc113f0d", "The silver chain fixed to the bag with a square ring", 0.66, 0.25, 3),
    ],
    description:
      "A structured flap bag in blush calfskin, crossed by a hand-painted chevron in cream and butter yellow. The sliding chain strap wears doubled on the shoulder or long across the body.",
    details: [
      "Smooth calfskin with hand-painted edges",
      "Palladium-finish curb chain, 120 cm",
      "Magnetic flap closure; one interior slip pocket",
      "W 22 × H 14 × D 7 cm",
      "Made in Italy",
    ],
    stock: 2,
  },
  {
    slug: "woven-basket-bag",
    name: "Woven Basket Bag",
    category: "Bags",
    price: 1890,
    label: "New in",
    image: unsplash("1590874103328-eac38a683ce7", "An orange woven top-handle basket bag"),
    gallery: [
      unsplashDetail("1590874103328-eac38a683ce7", "The rounded leather top handle", 0.55, 0.2, 2.2),
      unsplashDetail("1590874103328-eac38a683ce7", "Close weave of the wicker body", 0.5, 0.75, 2.5),
    ],
    description:
      "A wicker body hand-woven in a tight basket stitch, finished with a saddle-leather flap and rounded top handle. Carry it by hand or on the detachable shoulder strap.",
    details: [
      "Hand-woven wicker with calfskin trim",
      "Turn-lock closure in gold-finish brass",
      "Detachable, adjustable leather strap",
      "W 26 × H 22 × D 13 cm",
      "Made in Italy",
    ],
    stock: 0,
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    category: "Ready-to-wear",
    price: 4200,
    image: unsplash("1551028719-00167b16eac5", "A black leather biker jacket on white linen"),
    gallery: [
      unsplashDetail("1551028719-00167b16eac5", "Angled zip pockets across the front", 0.4, 0.75, 2.2),
      unsplashDetail("1551028719-00167b16eac5", "Snap-fastened collar and shoulder seam", 0.68, 0.5, 2.6),
    ],
    description:
      "The classic biker, cut close in supple black lambskin with an asymmetric zip, snap-down lapels and a belted hem. It softens and takes the shape of the wearer with time.",
    details: [
      "100% lambskin; viscose lining",
      "Silver-tone hardware",
      "Asymmetric front zip; three zip pockets",
      "Regular fit; true to size",
      "Made in Italy",
    ],
    stock: 6,
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "Eyewear",
    price: 520,
    image: unsplash("1511499767150-a48a237f0083", "Gold round sunglasses with green lenses"),
    gallery: [
      unsplashDetail("1511499767150-a48a237f0083", "Green lens set in a thin gold rim", 0.55, 0.5, 2.5),
      unsplashDetail("1511499767150-a48a237f0083", "The fine gold temple and hinge", 0.66, 0.5, 3),
    ],
    description:
      "Round, lightweight frames in gold-finish metal with bottle-green mineral lenses. Adjustable nose pads keep them settled through a long day.",
    details: [
      "Gold-finish metal frame",
      "Green mineral glass lenses, 100% UV protection",
      "Lens 49 mm, bridge 21 mm, temple 145 mm",
      "Comes with a leather case and cleaning cloth",
      "Made in Japan",
    ],
    stock: 12,
  },
  {
    slug: "technical-bomber-jacket",
    name: "Technical Bomber Jacket",
    category: "Ready-to-wear",
    price: 2800,
    label: "Exclusive",
    image: unsplash("1591047139829-d91aecb6caea", "A rust bomber jacket held on a hanger"),
    gallery: [
      unsplashDetail("1591047139829-d91aecb6caea", "Ribbed collar and centre zip", 0.48, 0.35, 2.2),
      unsplashDetail("1591047139829-d91aecb6caea", "Zip utility pocket on the sleeve", 0.75, 0.48, 2.5),
    ],
    description:
      "A bomber in a light, water-repellent technical twill, dyed a deep rust. Ribbed collar, cuffs and hem close out the wind; the sleeve pocket holds a card and keys.",
    details: [
      "Recycled polyamide twill, water-repellent finish",
      "Ribbed cotton collar, cuffs and hem",
      "Two welt pockets; zip sleeve pocket",
      "Relaxed fit; take your usual size",
      "Made in Portugal",
    ],
    stock: 3,
  },
  {
    slug: "cotton-crewneck-sweatshirt",
    name: "Cotton Crewneck Sweatshirt",
    category: "Ready-to-wear",
    price: 980,
    image: unsplash("1620799140408-edc6dcb6d633", "A white cotton crewneck sweatshirt laid flat"),
    gallery: [
      unsplashDetail("1620799140408-edc6dcb6d633", "The ribbed crew neckline", 0.47, 0.3, 2.2),
      unsplashDetail("1620799140408-edc6dcb6d633", "Ribbed cuff and hem", 0.65, 0.85, 2.2),
    ],
    description:
      "A heavyweight crewneck in brushed-back organic cotton, with a clean ribbed neck and a shape that holds after every wash.",
    details: [
      "100% organic cotton loopback, 480 gsm",
      "Ribbed neckline, cuffs and hem",
      "Garment-washed for softness",
      "Relaxed fit; true to size",
      "Made in Portugal",
    ],
    stock: 18,
  },
  {
    slug: "leather-derby-shoe",
    name: "Leather Derby Shoe",
    category: "Shoes",
    price: 1150,
    image: unsplash("1614252235316-8c857d38b5f4", "A close-up of a polished brown leather derby shoe"),
    gallery: [
      unsplashDetail("1614252235316-8c857d38b5f4", "Waxed laces through the perforated vamp", 0.33, 0.35, 2.2),
      unsplashDetail("1614252235316-8c857d38b5f4", "Hand-burnished leather at the toe", 0.72, 0.5, 1.6),
    ],
    description:
      "An open-laced derby in cognac calfskin with a micro-perforated vamp. Each pair is burnished by hand, so the colour deepens and varies slightly from shoe to shoe.",
    details: [
      "Calfskin upper, hand-burnished",
      "Leather lining and Goodyear-welted leather sole",
      "Waxed cotton laces",
      "Fits true to size; half sizes available",
      "Made in Spain",
    ],
    stock: 5,
  },
  {
    slug: "sculpted-hoop-earrings",
    name: "Sculpted Hoop Earrings",
    category: "Jewelry",
    price: 690,
    label: "New in",
    image: unsplash("1617038220319-276d3cfab638", "Gold hoop earrings resting on a shell"),
    gallery: [
      unsplashDetail("1617038220319-276d3cfab638", "The twisted hoop resting on a stone", 0.47, 0.63, 2.8),
      unsplashDetail("1617038220319-276d3cfab638", "Hinged clasp of the second hoop", 0.55, 0.78, 3),
    ],
    description:
      "Chunky twisted hoops, cast and polished by hand, with a hinged clasp that closes flush. Hollow, so they wear lighter than they look.",
    details: [
      "18k gold-plated sterling silver",
      "Hinged snap closure",
      "Diameter 2.4 cm; 6 g per earring",
      "Sold as a pair",
      "Made in Italy",
    ],
    stock: 1,
  },
];

export const newArrivals = products.slice(0, 8);

export const editorial = {
  eyebrow: "The Journal",
  title: "Notes from the Atelier",
  description:
    "Inside the workshop where each piece is cut, stitched and finished by hand — and the slow decisions behind a season.",
  image: unsplash("1581044777550-4cfa60707c03", "A model in a voluminous pink dress standing in a dry field"),
};

export const categories: Category[] = [
  { slug: "bags", title: "Bags", image: unsplash("1584917865442-de89df76afd3", "A red top-handle bag on a pedestal") },
  { slug: "shoes", title: "Shoes", image: unsplash("1543163521-1bf539c55dd2", "A floral pointed pump on a blue plinth") },
  { slug: "jewelry", title: "Jewelry", image: unsplash("1515562141207-7a88fb7ce338", "A pearl necklace in an open box") },
  {
    slug: "ready-to-wear",
    title: "Ready-to-wear",
    image: unsplash("1551232864-3f0890e580d9", "A clothing rail of coats and knitwear in neutral tones"),
  },
];

export const services = [
  { title: "Complimentary Shipping", description: "Express delivery on every order, packed in our signature box." },
  { title: "Returns Within 30 Days", description: "Return or exchange any piece free of charge, online or in store." },
  { title: "Private Appointments", description: "Book time with a client advisor in store or by video call." },
  { title: "Gift Wrapping", description: "Every order can be wrapped and finished with a handwritten note." },
];

const priceFormat = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function formatPrice(amount: number) {
  return priceFormat.format(amount);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

/** Same-category pieces first, then the rest of the catalog. */
export function getRelatedProducts(product: Product, limit = 4) {
  const others = products.filter((candidate) => candidate.slug !== product.slug);
  return [
    ...others.filter((candidate) => candidate.category === product.category),
    ...others.filter((candidate) => candidate.category !== product.category),
  ].slice(0, limit);
}

export function categorySlug(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export const LOW_STOCK_THRESHOLD = 3;

export function stockState(product: Product): StockState {
  if (product.stock <= 0) return "sold-out";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}
