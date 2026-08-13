export type ProductVariant = { label: string; value: string; available: boolean; stock: number };
export type ProductFlag = "featured" | "new-arrival" | "best-seller" | "editorial" | "giftable";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection: string;
  collections: string[];
  description: string;
  details: string[];
  care: string;
  images: string[];
  variants: ProductVariant[];
  tags: string[];
  flags: ProductFlag[];
  availability: "in-stock" | "low-stock" | "out-of-stock";
  stock: number;
  rating: null;
  reviewCount: 0;
  relatedProductIds: string[];
};

const assets = {
  campaignHero: "/manus-storage/1786605638826_c5b84767.png",
  jewellery: "/manus-storage/1786605641752_5f120be7.png",
  travel: "/manus-storage/1786605644082_a3996dc6.png",
  arc: "/manus-storage/1786605646678_6fb24be6.png",
  workBag: "/manus-storage/1786605649946_70946391.png",
  bagsEditorial: "/manus-storage/1786605652965_fc685904.png",
  accessories: "/manus-storage/1786605656583_7c5b1232.png",
  eveningBag: "/manus-storage/1786605661481_93115a2a.png",
  travelEditorial: "/manus-storage/1786605664388_bc8a7e5a.png",
  home: "/manus-storage/1786605671429_d418f0a0.png",
  smallLeather: "/manus-storage/1786605673788_e007e92b.png",
  wallet: "/manus-storage/1786605677702_9c3e757f.png",
  tote: "/manus-storage/1786605681885_2144d048.png",
  softGoods: "/manus-storage/1786605695263_992330a0.png",
  homePortrait: "/manus-storage/1786605704946_80d9d4e5.png",
  eyewear: "/manus-storage/1786605704964_210be81d.png",
} as const;

const mediaFor: Record<string, string[]> = {
  Bags: [assets.campaignHero, assets.arc, assets.workBag],
  "Small Leather Goods": [assets.smallLeather, assets.wallet, assets.accessories],
  Accessories: [assets.accessories, assets.smallLeather, assets.tote],
  Jewellery: [assets.jewellery, assets.eveningBag, assets.accessories],
  Travel: [assets.travel, assets.travelEditorial, assets.tote],
  "Soft Goods": [assets.softGoods, assets.softGoods, assets.campaignHero],
  Home: [assets.home, assets.homePortrait, assets.campaignHero],
  Eyewear: [assets.eyewear, assets.eyewear, assets.tote],
};

const detailsFor: Record<string, string[]> = {
  Bags: ["Full-grain leather", "Considered interior compartments", "Brushed metal hardware"],
  "Small Leather Goods": ["Pebble leather exterior", "Hand-finished edges", "Compact daily format"],
  Accessories: ["Artisanal material study", "Finished for daily use", "Presented in a dust pouch"],
  Jewellery: ["Recycled metal construction", "Nickel-safe finishing", "Balanced for layering"],
  Travel: ["Durable material mix", "Built for long horizons", "Protective lining"],
  "Soft Goods": ["Natural-fibre composition", "Soft hand feel", "Folded in a reusable sleeve"],
  Home: ["Small-batch artisan finish", "Made for everyday rituals", "Protective presentation box"],
  Eyewear: ["Hand-polished acetate", "UV protective lenses", "Hard case included"],
};

const defaultVariant = (category: string): ProductVariant[] => {
  if (category === "Jewellery") return [{ label: "Finish", value: "Soft Gold", available: true, stock: 7 }, { label: "Finish", value: "Burnished Silver", available: true, stock: 5 }];
  if (category === "Soft Goods") return [{ label: "Colour", value: "Ink", available: true, stock: 13 }, { label: "Colour", value: "Cedar", available: true, stock: 9 }];
  if (category === "Home") return [{ label: "Finish", value: "Espresso", available: true, stock: 8 }, { label: "Finish", value: "Stone", available: true, stock: 6 }];
  if (category === "Eyewear") return [{ label: "Colour", value: "Tortoise", available: true, stock: 9 }, { label: "Colour", value: "Ink", available: true, stock: 4 }];
  return [{ label: "Colour", value: "Cedar", available: true, stock: 11 }, { label: "Colour", value: "Ink", available: true, stock: 6 }];
};

type Seed = {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  collection: string;
  flags?: ProductFlag[];
  tags?: string[];
  availability?: Product["availability"];
  compareAtPrice?: number;
};

const seeds: Seed[] = [
  { slug: "meridian-frame-tote", name: "Meridian Frame Tote", subtitle: "An architectural everyday carryall", price: 48500, category: "Bags", collection: "Signature", flags: ["featured", "best-seller"] },
  { slug: "arc-mini-bag", name: "Arc Mini Bag", subtitle: "A curved evening-to-everyday shoulder bag", price: 32800, category: "Bags", collection: "New Arrivals", flags: ["new-arrival", "featured"] },
  { slug: "column-shoulder-bag", name: "Column Shoulder Bag", subtitle: "A long, quiet profile with an easy shoulder line", price: 39800, category: "Bags", collection: "Signature", flags: ["best-seller"] },
  { slug: "studio-east-west-bag", name: "Studio East-West Bag", subtitle: "A slender form for the essential edit", price: 36500, category: "Bags", collection: "New Arrivals", flags: ["new-arrival"] },
  { slug: "fold-crossbody", name: "Fold Crossbody", subtitle: "A soft-folded silhouette for unhurried days", price: 27900, category: "Bags", collection: "Bags", flags: ["giftable"] },
  { slug: "rivet-bucket-bag", name: "Rivet Bucket Bag", subtitle: "A circular base with restrained hardware", price: 34400, category: "Bags", collection: "Bags" },
  { slug: "palm-structured-bag", name: "Palm Structured Bag", subtitle: "A precise compact bag with a curved top handle", price: 45200, category: "Bags", collection: "Signature", flags: ["editorial"] },
  { slug: "harbour-large-tote", name: "Harbour Large Tote", subtitle: "A generous open tote for the full working day", price: 51800, category: "Bags", collection: "Bags", flags: ["best-seller"] },
  { slug: "verge-continental-wallet", name: "Verge Continental Wallet", subtitle: "A long wallet with a composed interior", price: 16900, category: "Small Leather Goods", collection: "Essentials", flags: ["best-seller", "giftable"] },
  { slug: "studio-card-holder", name: "Studio Card Holder", subtitle: "A slim four-slot daily card case", price: 8900, category: "Small Leather Goods", collection: "Essentials", flags: ["giftable"] },
  { slug: "quiet-zip-pouch", name: "Quiet Zip Pouch", subtitle: "A small considered organiser for the in-between", price: 10500, category: "Small Leather Goods", collection: "Accessories" },
  { slug: "palma-key-folio", name: "Palma Key Folio", subtitle: "A compact key keeper with a polished loop", price: 7600, category: "Small Leather Goods", collection: "Essentials" },
  { slug: "ledger-passport-holder", name: "Ledger Passport Holder", subtitle: "A travel document wallet in softened leather", price: 14200, category: "Small Leather Goods", collection: "Travel", flags: ["giftable"] },
  { slug: "noor-silk-scarf", name: "Noor Silk Scarf", subtitle: "A hand-rolled silk square in warm studio tones", price: 11900, category: "Soft Goods", collection: "Accessories", flags: ["giftable", "editorial"] },
  { slug: "still-wool-wrap", name: "Still Wool Wrap", subtitle: "A brushed merino layer with a tonal border", price: 17800, category: "Soft Goods", collection: "New Arrivals", flags: ["new-arrival"] },
  { slug: "folded-cotton-stole", name: "Folded Cotton Stole", subtitle: "A finely woven layer for shifting light", price: 9800, category: "Soft Goods", collection: "Accessories" },
  { slug: "sable-camera-strap", name: "Sable Camera Strap", subtitle: "A stitched leather strap with a woven edge", price: 13800, category: "Accessories", collection: "Travel", flags: ["editorial"] },
  { slug: "field-belt", name: "Field Belt", subtitle: "A classic leather belt with softened structure", price: 11200, category: "Accessories", collection: "Essentials" },
  { slug: "orbit-bottle-holder", name: "Orbit Bottle Holder", subtitle: "A clipped leather sleeve for long city walks", price: 6900, category: "Accessories", collection: "Travel", flags: ["new-arrival"] },
  { slug: "quiet-luggage-tag", name: "Quiet Luggage Tag", subtitle: "A hidden-address tag made for the distance", price: 5200, category: "Accessories", collection: "Travel", flags: ["giftable"] },
  { slug: "column-hoop-earrings", name: "Column Hoop Earrings", subtitle: "Rounded hoops with a sculptural weight", price: 13200, category: "Jewellery", collection: "New Arrivals", flags: ["new-arrival"] },
  { slug: "linea-chain-bracelet", name: "Linea Chain Bracelet", subtitle: "A fine linked bracelet designed to layer", price: 14600, category: "Jewellery", collection: "Signature", flags: ["best-seller"] },
  { slug: "cairn-pendant", name: "Cairn Pendant", subtitle: "A small weighted form on a fine chain", price: 15800, category: "Jewellery", collection: "Jewellery", flags: ["giftable"] },
  { slug: "soft-signature-ring", name: "Soft Signature Ring", subtitle: "A polished signet ring with softened edges", price: 12900, category: "Jewellery", collection: "Jewellery" },
  { slug: "morrow-stud-set", name: "Morrow Stud Set", subtitle: "Two restrained forms for the everyday ear", price: 8600, category: "Jewellery", collection: "Jewellery", flags: ["giftable"] },
  { slug: "field-canvas-weekender", name: "Field Canvas Weekender", subtitle: "A waxed canvas companion for the long weekend", price: 41900, category: "Travel", collection: "Travel", flags: ["best-seller"] },
  { slug: "waypoint-garment-case", name: "Waypoint Garment Case", subtitle: "A protective fold for considered travel", price: 27800, category: "Travel", collection: "Travel", flags: ["editorial"] },
  { slug: "north-bound-duffle", name: "North Bound Duffle", subtitle: "A soft-sided leather and canvas holdall", price: 46300, category: "Travel", collection: "Travel", flags: ["new-arrival"] },
  { slug: "studio-weekend-kit", name: "Studio Weekend Kit", subtitle: "A compact paired pouch set for overnight rituals", price: 15600, category: "Travel", collection: "Essentials", flags: ["giftable"] },
  { slug: "cedar-espresso-cup", name: "Cedar Espresso Cup", subtitle: "A hand-thrown cup for a measured pause", price: 4800, category: "Home", collection: "Home", flags: ["new-arrival", "giftable"] },
  { slug: "limestone-catchall", name: "Limestone Catchall", subtitle: "A small stone dish for the daily threshold", price: 6600, category: "Home", collection: "Home" },
  { slug: "evening-incense-holder", name: "Evening Incense Holder", subtitle: "A low metal vessel with a quiet patina", price: 7400, category: "Home", collection: "Home", flags: ["editorial"] },
  { slug: "archive-sunglasses", name: "Archive Sunglasses", subtitle: "A balanced acetate frame for clear days", price: 21400, category: "Eyewear", collection: "New Arrivals", flags: ["new-arrival"] },
  { slug: "morrow-optical-frame", name: "Morrow Optical Frame", subtitle: "A gently squared frame in polished tortoise", price: 19800, category: "Eyewear", collection: "Accessories" },
  { slug: "horizon-sun-frame", name: "Horizon Sun Frame", subtitle: "A softened geometric frame with warm lenses", price: 22500, category: "Eyewear", collection: "Eyewear", flags: ["best-seller"] },
  { slug: "studio-hair-clip", name: "Studio Hair Clip", subtitle: "A sculptural clasp with a polished metal line", price: 5800, category: "Accessories", collection: "Accessories", flags: ["giftable"] },
];

const productFrom = (seed: Seed, index: number): Product => {
  const stock = seed.availability === "out-of-stock" ? 0 : seed.availability === "low-stock" ? 3 : 5 + ((index * 3) % 15);
  return {
    id: `ub-${String(index + 1).padStart(3, "0")}`,
    slug: seed.slug,
    name: seed.name,
    subtitle: seed.subtitle,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    category: seed.category,
    collection: seed.collection,
    collections: [seed.collection.toLowerCase().replaceAll(" ", "-"), seed.category.toLowerCase().replaceAll(" ", "-")],
    description: `${seed.subtitle}. Designed as part of the original Usamabhanbhro object study, it balances material presence with a practical, unhurried rhythm.`,
    details: detailsFor[seed.category],
    care: "Wipe gently with a soft dry cloth and store away from prolonged direct sunlight.",
    images: mediaFor[seed.category],
    variants: defaultVariant(seed.category),
    tags: [...(seed.tags ?? []), seed.category.toLowerCase(), seed.collection.toLowerCase(), "usamabhanbhro"],
    flags: seed.flags ?? [],
    availability: seed.availability ?? (stock < 5 ? "low-stock" : "in-stock"),
    stock,
    rating: null,
    reviewCount: 0,
    relatedProductIds: [],
  };
};

const inventory = seeds.map(productFrom);
export const products: Product[] = inventory.map((product) => ({
  ...product,
  relatedProductIds: inventory.filter((candidate) => candidate.id !== product.id && (candidate.category === product.category || candidate.collection === product.collection)).slice(0, 4).map((candidate) => candidate.id),
}));

export const collections = [
  { slug: "new-arrivals", name: "New Arrivals", eyebrow: "The new edit", description: "Quietly expressive pieces shaped for the pace of now.", image: assets.bagsEditorial, category: "Seasonal" },
  { slug: "signature", name: "Signature", eyebrow: "The house codes", description: "Form, material, and the details that stay with you.", image: assets.campaignHero, category: "Core" },
  { slug: "bags", name: "Bags", eyebrow: "Carry considered", description: "Sculptural silhouettes, useful interiors, and an easy point of view.", image: assets.bagsEditorial, category: "Carry" },
  { slug: "accessories", name: "Accessories", eyebrow: "Small gestures", description: "Objects and layers that bring a considered rhythm to every day.", image: assets.accessories, category: "Finish" },
  { slug: "jewellery", name: "Jewellery", eyebrow: "Reflective forms", description: "Polished forms designed for layering, gifting, and keeping.", image: assets.jewellery, category: "Adornment" },
  { slug: "travel", name: "Travel", eyebrow: "Long horizons", description: "Useful objects for leaving, arriving, and the unplanned interval.", image: assets.travel, category: "Journey" },
  { slug: "home", name: "Home", eyebrow: "Small rituals", description: "Quiet domestic objects with material presence.", image: assets.home, category: "Living" },
  { slug: "essentials", name: "Essentials", eyebrow: "Made for every day", description: "The reliable objects that make the rest feel easy.", image: assets.smallLeather, category: "Daily" },
] as const;

export const journals = [
  { slug: "the-shape-of-a-day", title: "The shape of a day", type: "Studio notes", date: "18 June 2025", excerpt: "A study in useful beauty, warm light, and the objects that move with us.", image: assets.eyewear },
  { slug: "material-in-motion", title: "Material in motion", type: "The journal", date: "04 June 2025", excerpt: "Why a good material changes the way a piece is worn, carried, and remembered.", image: assets.softGoods },
  { slug: "a-quiet-kind-of-colour", title: "A quiet kind of colour", type: "Field notes", date: "22 May 2025", excerpt: "On cedar, parchment, charcoal, and the warmth they bring to a daily uniform.", image: assets.homePortrait },
  { slug: "the-ritual-of-carry", title: "The ritual of carry", type: "Object dossier", date: "07 May 2025", excerpt: "A compact exercise in proportion, pockets, and the things worth bringing close.", image: assets.bagsEditorial },
];

export const money = (value: number) => new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
export const findProduct = (slug?: string) => products.find((product) => product.slug === slug);
export const findCollection = (slug?: string) => collections.find((collection) => collection.slug === slug);
export const findJournal = (slug?: string) => journals.find((journal) => journal.slug === slug);
export const featuredProducts = () => products.filter((product) => product.flags.includes("featured") || product.flags.includes("best-seller"));
export const newArrivalProducts = () => products.filter((product) => product.flags.includes("new-arrival"));
