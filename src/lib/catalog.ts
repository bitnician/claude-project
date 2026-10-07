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
};

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

export const newArrivals: Product[] = [
  {
    slug: "chain-shoulder-bag-blush",
    name: "Chain Shoulder Bag",
    category: "Bags",
    price: 2450,
    label: "New in",
    image: unsplash("1566150905458-1bf1fc113f0d", "A blush pink leather shoulder bag on a white plinth"),
  },
  {
    slug: "woven-basket-bag",
    name: "Woven Basket Bag",
    category: "Bags",
    price: 1890,
    label: "New in",
    image: unsplash("1590874103328-eac38a683ce7", "An orange woven top-handle basket bag"),
  },
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    category: "Ready-to-wear",
    price: 4200,
    image: unsplash("1551028719-00167b16eac5", "A black leather biker jacket on white linen"),
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "Eyewear",
    price: 520,
    image: unsplash("1511499767150-a48a237f0083", "Gold round sunglasses with green lenses"),
  },
  {
    slug: "technical-bomber-jacket",
    name: "Technical Bomber Jacket",
    category: "Ready-to-wear",
    price: 2800,
    label: "Exclusive",
    image: unsplash("1591047139829-d91aecb6caea", "A rust bomber jacket held on a hanger"),
  },
  {
    slug: "cotton-crewneck-sweatshirt",
    name: "Cotton Crewneck Sweatshirt",
    category: "Ready-to-wear",
    price: 980,
    image: unsplash("1620799140408-edc6dcb6d633", "A white cotton crewneck sweatshirt laid flat"),
  },
  {
    slug: "leather-derby-shoe",
    name: "Leather Derby Shoe",
    category: "Shoes",
    price: 1150,
    image: unsplash("1614252235316-8c857d38b5f4", "A close-up of a polished brown leather derby shoe"),
  },
  {
    slug: "sculpted-hoop-earrings",
    name: "Sculpted Hoop Earrings",
    category: "Jewelry",
    price: 690,
    label: "New in",
    image: unsplash("1617038220319-276d3cfab638", "Gold hoop earrings resting on a shell"),
  },
];

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
