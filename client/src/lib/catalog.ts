export type ProductFlag = "featured" | "new-arrival" | "best-seller" | "editorial" | "giftable";

export type ProductVariant = { label: string; value: string; available: boolean; stock: number };

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

type AssetSet = string[];
const routeAssets: Record<string, AssetSet> = {
  iphone: [
    "/sites/apple-com-7b1a/route-assets/078-iphone-1-1d09ae167f.png",
    "/sites/apple-com-7b1a/route-assets/078-iphone-2-e655a3d71b.png",
    "/sites/apple-com-7b1a/route-assets/078-iphone-3-c04be7e8f8.png",
  ],
  iphone17: [
    "/sites/apple-com-7b1a/route-assets/079-iphone-17-1-c04be7e8f8.png",
    "/sites/apple-com-7b1a/route-assets/079-iphone-17-2-a02597c07e.png",
    "/sites/apple-com-7b1a/route-assets/079-iphone-17-3-c346db06ff.png",
  ],
  iphone17pro: [
    "/sites/apple-com-7b1a/route-assets/080-iphone-17-pro-2-ad9a441be5.png",
    "/sites/apple-com-7b1a/route-assets/080-iphone-17-pro-3-5230abe766.png",
    "/sites/apple-com-7b1a/route-assets/080-iphone-17-pro-4-5c560704db.png",
  ],
  iphoneAir: [
    "/sites/apple-com-7b1a/route-assets/082-iphone-air-1-c04be7e8f8.png",
    "/sites/apple-com-7b1a/route-assets/082-iphone-air-2-a02597c07e.png",
    "/sites/apple-com-7b1a/route-assets/082-iphone-air-3-c346db06ff.png",
  ],
  mac: [
    "/sites/apple-com-7b1a/route-assets/093-mac-1-3043362ea3.png",
    "/sites/apple-com-7b1a/route-assets/093-mac-2-caf9df0fa7.png",
    "/sites/apple-com-7b1a/route-assets/093-mac-3-3055b985aa.png",
  ],
  macbookAir: [
    "/sites/apple-com-7b1a/route-assets/098-macbook-air-2-27197ec39d.png",
    "/sites/apple-com-7b1a/route-assets/098-macbook-air-3-9aa2918f15.png",
    "/sites/apple-com-7b1a/route-assets/098-macbook-air-4-11517b60ab.png",
  ],
  macbookPro: [
    "/sites/apple-com-7b1a/route-assets/100-macbook-pro-2-732a4b22c8.jpg",
    "/sites/apple-com-7b1a/route-assets/100-macbook-pro-3-eb824c3914.jpg",
    "/sites/apple-com-7b1a/route-assets/100-macbook-pro-4-bd84f9d805.jpg",
  ],
  macMini: [
    "/sites/apple-com-7b1a/route-assets/094-mac-mini-2-fe819a9420.jpg",
    "/sites/apple-com-7b1a/route-assets/094-mac-mini-3-fb3346f18d.jpg",
  ],
  macStudio: [
    "/sites/apple-com-7b1a/route-assets/095-mac-studio-1-722b25961a.jpg",
    "/sites/apple-com-7b1a/route-assets/095-mac-studio-2-4cc0f87c91.jpg",
  ],
  ipad: [
    "/sites/apple-com-7b1a/route-assets/071-ipad-1-27c86fad77.png",
    "/sites/apple-com-7b1a/route-assets/071-ipad-2-1228adfe1f.png",
    "/sites/apple-com-7b1a/route-assets/071-ipad-3-f226d97fea.png",
  ],
  ipadAir: [
    "/sites/apple-com-7b1a/route-assets/073-ipad-air-2-4d8d214cab.png",
    "/sites/apple-com-7b1a/route-assets/073-ipad-air-3-b74e9d2e9f.png",
    "/sites/apple-com-7b1a/route-assets/073-ipad-air-4-2a2ad57c8a.png",
  ],
  ipadMini: [
    "/sites/apple-com-7b1a/route-assets/075-ipad-mini-1-e3608bf91c.png",
    "/sites/apple-com-7b1a/route-assets/075-ipad-mini-2-db04e32772.png",
  ],
  ipadPro: [
    "/sites/apple-com-7b1a/route-assets/076-ipad-pro-1-e82f53cff6.jpg",
    "/sites/apple-com-7b1a/route-assets/076-ipad-pro-2-e903afc89a.jpg",
    "/sites/apple-com-7b1a/route-assets/076-ipad-pro-3-aad006cd38.jpg",
  ],
  airpods: [
    "/sites/apple-com-7b1a/route-assets/005-airpods-2-a9445964f3.png",
    "/sites/apple-com-7b1a/route-assets/005-airpods-3-821b5b09c7.png",
    "/sites/apple-com-7b1a/route-assets/005-airpods-4-0f5fd8a611.png",
  ],
  airpods4: [
    "/sites/apple-com-7b1a/route-assets/006-airpods-4-2-837b2504da.jpg",
    "/sites/apple-com-7b1a/route-assets/006-airpods-4-3-0dcd56d0a7.jpg",
  ],
  airpodsMax: [
    "/sites/apple-com-7b1a/route-assets/007-airpods-max-2-5279fa06a7.jpg",
    "/sites/apple-com-7b1a/route-assets/007-airpods-max-3-3ae75f4c6f.jpg",
  ],
  airpodsPro: [
    "/sites/apple-com-7b1a/route-assets/008-airpods-pro-1-844b61f859.jpg",
    "/sites/apple-com-7b1a/route-assets/008-airpods-pro-2-f9070969a0.jpg",
  ],
  vision: [
    "/sites/apple-com-7b1a/route-assets/030-apple-vision-pro-1-75aee6f4db.jpg",
    "/sites/apple-com-7b1a/route-assets/030-apple-vision-pro-2-8e3a7ed1d7.jpg",
  ],
  watch: [
    "/sites/apple-com-7b1a/route-assets/221-watch-1-4e7766d05f.png",
    "/sites/apple-com-7b1a/route-assets/221-watch-2-57d11ebf53.png",
  ],
  watchSe: [
    "/sites/apple-com-7b1a/route-assets/075-apple-watch-se-3-1-3b1a0c3c46.jpg",
    "/sites/apple-com-7b1a/route-assets/075-apple-watch-se-3-2-5c5d55f563.jpg",
  ],
  watchSeries: [
    "/sites/apple-com-7b1a/route-assets/076-apple-watch-series-11-1-4d8a2de6a8.jpg",
    "/sites/apple-com-7b1a/route-assets/076-apple-watch-series-11-2-baf38dcf21.jpg",
  ],
  watchUltra: [
    "/sites/apple-com-7b1a/route-assets/077-apple-watch-ultra-3-1-7c1858bf75.jpg",
    "/sites/apple-com-7b1a/route-assets/077-apple-watch-ultra-3-2-27af8fc687.jpg",
  ],
  tvHome: [
    "/sites/apple-com-7b1a/route-assets/222-tv-home-1-3a908b80ef.png",
    "/sites/apple-com-7b1a/route-assets/222-tv-home-2-41f5d8e4c9.png",
  ],
  airtag: [
    "/sites/apple-com-7b1a/route-assets/010-airtag-1-8d7d95f2c8.jpg",
    "/sites/apple-com-7b1a/route-assets/010-airtag-2-6e0c6d818c.jpg",
  ],
  accessories: [
    "/sites/apple-com-7b1a/route-assets/003-accessories-1-9c9f3d72f8.jpg",
    "/sites/apple-com-7b1a/route-assets/003-accessories-2-ea7b4af57c.jpg",
  ],
};

const commonDetails = ["Free delivery or Apple Store pickup", "Apple support and setup included", "Financing options available at checkout"];

const variant = (label: string, values: string[], unavailable: string[] = []): ProductVariant[] => values.map((value, index) => ({ label, value, available: !unavailable.includes(value), stock: unavailable.includes(value) ? 0 : Math.max(3, 12 - index * 2) }));

const seeds: Array<Omit<Product, "id" | "collections" | "relatedProductIds" | "rating" | "reviewCount">> = [
  { slug: "iphone-17-pro", name: "iPhone 17 Pro", subtitle: "The ultimate iPhone.", price: 1099, category: "iPhone", collection: "iPhone", description: "iPhone 17 Pro delivers pro camera control, fast performance, and an advanced titanium design.", details: ["Pro camera system", "All-day battery life", "USB-C connectivity", ...commonDetails], care: "Use a soft, lint-free cloth and a compatible case for daily protection.", images: routeAssets.iphone17pro, variants: variant("Storage", ["256GB", "512GB", "1TB"]), tags: ["iphone", "pro", "camera", "apple intelligence"], flags: ["featured", "new-arrival"], availability: "in-stock", stock: 18 },
  { slug: "iphone-17", name: "iPhone 17", subtitle: "A new standard for iPhone.", price: 799, category: "iPhone", collection: "iPhone", description: "iPhone 17 combines a bright display, powerful camera system, and the smooth everyday performance of Apple silicon.", details: ["A18 chip", "Next-generation camera", "Ceramic Shield front", ...commonDetails], care: "Use a soft, lint-free cloth and avoid abrasive cleaners.", images: routeAssets.iphone17, variants: variant("Storage", ["256GB", "512GB"]), tags: ["iphone", "everyday", "apple intelligence"], flags: ["featured", "best-seller"], availability: "in-stock", stock: 22 },
  { slug: "iphone-air", name: "iPhone Air", subtitle: "The thinnest iPhone ever.", price: 999, category: "iPhone", collection: "iPhone", description: "iPhone Air brings a light, impossibly thin design together with a vivid display and all-day capability.", details: ["Lightweight design", "All-day battery", "Apple Intelligence", ...commonDetails], care: "Use a compatible MagSafe case for added protection.", images: routeAssets.iphoneAir, variants: variant("Storage", ["256GB", "512GB"]), tags: ["iphone", "thin", "lightweight"], flags: ["new-arrival"], availability: "in-stock", stock: 15 },
  { slug: "iphone-16", name: "iPhone 16", subtitle: "A total powerhouse.", price: 699, category: "iPhone", collection: "iPhone", description: "iPhone 16 brings the Camera Control, A18 chip, and a versatile camera system to more people.", details: ["A18 chip", "Camera Control", "Action button", ...commonDetails], care: "Pair with a MagSafe case or screen protector for daily use.", images: routeAssets.iphone, variants: variant("Storage", ["128GB", "256GB", "512GB"]), tags: ["iphone", "camera control"], flags: ["best-seller"], availability: "in-stock", stock: 19 },
  { slug: "iphone-16e", name: "iPhone 16e", subtitle: "The latest iPhone at a great value.", price: 599, category: "iPhone", collection: "iPhone", description: "iPhone 16e delivers powerful performance, a beautiful display, and Apple Intelligence in a compact package.", details: ["A18 chip", "48MP Fusion camera", "Apple Intelligence", ...commonDetails], care: "Use a compatible case and clean with a dry microfiber cloth.", images: routeAssets.iphone17, variants: variant("Storage", ["128GB", "256GB"]), tags: ["iphone", "value"], flags: ["giftable"], availability: "in-stock", stock: 24 },
  { slug: "macbook-air", name: "MacBook Air", subtitle: "Supercharged by M4.", price: 999, category: "Mac", collection: "MacBook", description: "MacBook Air is thin, light, and ready for work, study, creative projects, and everything in between.", details: ["Apple M4 chip", "Up to 18 hours of battery", "Two Thunderbolt 4 ports", ...commonDetails], care: "Keep the display closed when transporting and use a padded sleeve.", images: routeAssets.macbookAir, variants: variant("Screen size", ["13-inch", "15-inch"]), tags: ["mac", "macbook air", "m4", "laptop"], flags: ["featured", "best-seller"], availability: "in-stock", stock: 13 },
  { slug: "macbook-pro", name: "MacBook Pro", subtitle: "The most advanced Mac laptops.", price: 1599, category: "Mac", collection: "MacBook", description: "MacBook Pro brings pro-level performance, a stunning Liquid Retina XDR display, and ports for your workflow.", details: ["Apple silicon performance", "Liquid Retina XDR display", "ProRes video workflows", ...commonDetails], care: "Use a soft cloth for the enclosure and store in a protective sleeve.", images: routeAssets.macbookPro, variants: variant("Chip", ["M4", "M4 Pro", "M4 Max"]), tags: ["mac", "macbook pro", "creative", "pro"], flags: ["featured"], availability: "in-stock", stock: 10 },
  { slug: "mac-mini", name: "Mac mini", subtitle: "Small footprint. Giant possibilities.", price: 599, category: "Mac", collection: "Desktop Mac", description: "Mac mini gives you a compact desktop with serious performance and the freedom to choose your own display and accessories.", details: ["Compact aluminum design", "Apple silicon", "Multiple connectivity options", ...commonDetails], care: "Place on a stable, ventilated surface and keep ports free from dust.", images: routeAssets.macMini, variants: variant("Memory", ["16GB", "24GB", "32GB"]), tags: ["mac", "desktop", "mac mini"], flags: ["best-seller"], availability: "in-stock", stock: 16 },
  { slug: "mac-studio", name: "Mac Studio", subtitle: "Power to the studio.", price: 1999, category: "Mac", collection: "Desktop Mac", description: "Mac Studio is a compact powerhouse for creators, developers, and demanding professional workflows.", details: ["Pro desktop performance", "High-speed unified memory", "Front and rear connectivity", ...commonDetails], care: "Keep the vents unobstructed and clean the aluminum enclosure with a dry cloth.", images: routeAssets.macStudio, variants: variant("Chip", ["M4 Max", "M3 Ultra"]), tags: ["mac", "desktop", "studio", "pro"], flags: ["new-arrival"], availability: "in-stock", stock: 7 },
  { slug: "imac", name: "iMac", subtitle: "A splash of brilliance.", price: 1299, category: "Mac", collection: "Desktop Mac", description: "iMac is a complete desktop experience with a vibrant display, powerful Apple silicon, and a beautifully simple setup.", details: ["24-inch 4.5K display", "Apple silicon", "Color-matched accessories", ...commonDetails], care: "Use a soft, slightly damp cloth on the display and stand.", images: routeAssets.mac, variants: variant("Color", ["Blue", "Green", "Pink", "Silver", "Yellow", "Orange", "Purple"]), tags: ["mac", "imac", "desktop"], flags: ["giftable"], availability: "in-stock", stock: 9 },
  { slug: "studio-display", name: "Studio Display", subtitle: "A sight to behold.", price: 1599, category: "Mac", collection: "Displays & Accessories", description: "Studio Display pairs a 27-inch 5K Retina display with a six-speaker sound system and a 12MP camera.", details: ["27-inch 5K Retina display", "12MP Ultra Wide camera", "Studio-quality three-mic array", ...commonDetails], care: "Clean the glass with a soft, lint-free cloth; avoid sprays directly on the screen.", images: routeAssets.mac, variants: variant("Stand", ["Tilt-adjustable", "Tilt-and-height-adjustable", "VESA mount adapter"]), tags: ["mac", "display", "studio display"], flags: ["editorial"], availability: "in-stock", stock: 6 },
  { slug: "ipad-pro", name: "iPad Pro", subtitle: "Thinpossible.", price: 999, category: "iPad", collection: "iPad", description: "iPad Pro is impossibly thin and powered by Apple silicon for demanding creative and professional work.", details: ["Ultra Retina XDR display", "Apple silicon", "Apple Pencil Pro support", ...commonDetails], care: "Use a folio or Smart Folio when carrying iPad Pro.", images: routeAssets.ipadPro, variants: variant("Size", ["11-inch", "13-inch"]), tags: ["ipad", "ipad pro", "creative"], flags: ["featured", "new-arrival"], availability: "in-stock", stock: 12 },
  { slug: "ipad-air", name: "iPad Air", subtitle: "Fresh air.", price: 599, category: "iPad", collection: "iPad", description: "iPad Air pairs a colorful design with Apple silicon, a beautiful display, and support for Apple Pencil Pro.", details: ["Apple silicon", "11-inch or 13-inch display", "Magic Keyboard support", ...commonDetails], care: "Store in a case and clean the display with a dry microfiber cloth.", images: routeAssets.ipadAir, variants: variant("Size", ["11-inch", "13-inch"]), tags: ["ipad", "ipad air", "school", "work"], flags: ["best-seller"], availability: "in-stock", stock: 17 },
  { slug: "ipad", name: "iPad", subtitle: "Lovable. Drawable. Magical.", price: 349, category: "iPad", collection: "iPad", description: "iPad is a colorful, capable way to work, learn, create, and stay connected.", details: ["All-day battery", "Support for Apple Pencil", "Landscape camera", ...commonDetails], care: "Pair with a case for everyday carry and wipe with a soft cloth.", images: routeAssets.ipad, variants: variant("Storage", ["128GB", "256GB", "512GB"]), tags: ["ipad", "everyday", "education"], flags: ["best-seller", "giftable"], availability: "in-stock", stock: 21 },
  { slug: "ipad-mini", name: "iPad mini", subtitle: "Small wonder.", price: 499, category: "iPad", collection: "iPad", description: "iPad mini puts full iPad capability in a compact design that goes anywhere.", details: ["Compact 8.3-inch display", "Apple silicon", "Apple Pencil Pro support", ...commonDetails], care: "Use a Smart Folio or compact sleeve for travel.", images: routeAssets.ipadMini, variants: variant("Storage", ["128GB", "256GB", "512GB"]), tags: ["ipad", "ipad mini", "portable"], flags: ["new-arrival"], availability: "in-stock", stock: 11 },
  { slug: "apple-pencil-pro", name: "Apple Pencil Pro", subtitle: "Dream it. Draw it. Take notes.", price: 129, category: "Accessories", collection: "iPad Accessories", description: "Apple Pencil Pro adds squeeze, barrel roll, haptic feedback, and precise pixel-level control to supported iPad models.", details: ["Squeeze and barrel roll", "Haptic feedback", "Find My support", ...commonDetails], care: "Attach magnetically to a compatible iPad for storage and charging.", images: routeAssets.ipadPro, variants: variant("Compatibility", ["iPad Pro", "iPad Air"]), tags: ["ipad", "apple pencil", "creative", "accessory"], flags: ["best-seller"], availability: "in-stock", stock: 20 },
  { slug: "apple-watch-series-11", name: "Apple Watch Series 11", subtitle: "Thinks ahead.", price: 399, category: "Apple Watch", collection: "Apple Watch", description: "Apple Watch Series 11 brings powerful health insights, fitness features, and smart connectivity to your wrist.", details: ["Health notifications", "Workout app", "All-day battery", ...commonDetails], care: "Rinse after exposure to salt water and dry the band and case thoroughly.", images: routeAssets.watchSeries, variants: variant("Case size", ["42mm", "46mm"]), tags: ["apple watch", "health", "fitness"], flags: ["featured", "new-arrival"], availability: "in-stock", stock: 14 },
  { slug: "apple-watch-se-3", name: "Apple Watch SE 3", subtitle: "A great call for kids. A great call for you.", price: 249, category: "Apple Watch", collection: "Apple Watch", description: "Apple Watch SE 3 brings essential health, safety, and fitness features at a more accessible price.", details: ["Activity rings", "Emergency SOS", "Family Setup support", ...commonDetails], care: "Use the included band as directed and keep the case dry after workouts.", images: routeAssets.watchSe, variants: variant("Case size", ["40mm", "44mm"]), tags: ["apple watch", "se", "kids", "fitness"], flags: ["best-seller", "giftable"], availability: "in-stock", stock: 25 },
  { slug: "apple-watch-ultra-3", name: "Apple Watch Ultra 3", subtitle: "The ultimate sports watch.", price: 799, category: "Apple Watch", collection: "Apple Watch", description: "Apple Watch Ultra 3 is built for endurance athletes, explorers, and the moments that demand more.", details: ["Advanced metrics", "Emergency SOS via satellite", "Durable titanium case", ...commonDetails], care: "Rinse with fresh water after salt or chlorine exposure and dry completely.", images: routeAssets.watchUltra, variants: variant("Band", ["Alpine Loop", "Trail Loop", "Ocean Band"]), tags: ["apple watch", "ultra", "outdoor", "fitness"], flags: ["featured"], availability: "in-stock", stock: 8 },
  { slug: "airpods-pro-3", name: "AirPods Pro 3", subtitle: "The world’s best in-ear Active Noise Cancellation.", price: 249, category: "AirPods", collection: "AirPods", description: "AirPods Pro 3 bring intelligent noise control, personalized listening, and a secure fit to your everyday.", details: ["Active Noise Cancellation", "Adaptive Audio", "Conversation Awareness", ...commonDetails], care: "Keep earbuds and case dry; clean gently with a soft, dry brush.", images: routeAssets.airpodsPro, variants: variant("Case", ["MagSafe Charging Case"]), tags: ["airpods", "audio", "noise cancellation"], flags: ["featured", "new-arrival"], availability: "in-stock", stock: 18 },
  { slug: "airpods-4", name: "AirPods 4", subtitle: "Iconic. Now supersonic.", price: 129, category: "AirPods", collection: "AirPods", description: "AirPods 4 deliver a transformed listening experience with a comfortable open-ear design.", details: ["Personalized Spatial Audio", "Voice Isolation", "USB-C charging case", ...commonDetails], care: "Keep the case closed when not in use and clean with a dry cloth.", images: routeAssets.airpods4, variants: variant("Noise control", ["Standard", "Active Noise Cancellation"]), tags: ["airpods", "audio", "everyday"], flags: ["best-seller", "giftable"], availability: "in-stock", stock: 24 },
  { slug: "airpods-max-2", name: "AirPods Max 2", subtitle: "Listening. Remastered.", price: 549, category: "AirPods", collection: "AirPods", description: "AirPods Max 2 combine high-fidelity sound, adaptive noise control, and a premium over-ear design.", details: ["High-fidelity audio", "Improved Active Noise Cancellation", "Up to 20 hours of listening", ...commonDetails], care: "Store in the Smart Case and wipe the ear cushions with a dry cloth.", images: routeAssets.airpodsMax, variants: variant("Color", ["Midnight", "Starlight", "Blue", "Purple", "Orange"]), tags: ["airpods", "audio", "over-ear"], flags: ["new-arrival"], availability: "in-stock", stock: 7 },
  { slug: "apple-vision-pro", name: "Apple Vision Pro", subtitle: "The ultimate spatial computer.", price: 3499, category: "Apple Vision Pro", collection: "Vision", description: "Apple Vision Pro blends digital content with your physical space and is powered by the M5 chip.", details: ["Spatial computing", "Responsive eye tracking", "Spatial Audio", ...commonDetails], care: "Use the cover and polishing cloth provided; keep lenses free from dust and fingerprints.", images: routeAssets.vision, variants: variant("Storage", ["256GB", "512GB", "1TB"]), tags: ["vision pro", "spatial computing", "visionos"], flags: ["editorial"], availability: "in-stock", stock: 3 },
  { slug: "apple-tv-4k", name: "Apple TV 4K", subtitle: "The best way to watch TV.", price: 129, category: "TV & Home", collection: "TV & Home", description: "Apple TV 4K brings Apple TV+, live sports, Apple Music, and your photos to the biggest screen in your home.", details: ["4K HDR video", "Siri Remote", "Apple Arcade and Apple Fitness+", ...commonDetails], care: "Keep the Apple TV and power supply in a well-ventilated area.", images: routeAssets.tvHome, variants: variant("Storage", ["64GB Wi-Fi", "128GB Wi-Fi + Ethernet"]), tags: ["apple tv", "home", "entertainment"], flags: ["best-seller"], availability: "in-stock", stock: 10 },
  { slug: "homepod", name: "HomePod", subtitle: "Profound sound.", price: 299, category: "TV & Home", collection: "TV & Home", description: "HomePod delivers high-fidelity sound, intelligent assistance, and a smart home hub in one beautiful speaker.", details: ["High-fidelity audio", "Siri", "Smart home hub", ...commonDetails], care: "Place on a stable surface away from moisture and direct heat.", images: routeAssets.tvHome, variants: variant("Color", ["Midnight", "White"]), tags: ["homepod", "home", "speaker"], flags: ["featured"], availability: "in-stock", stock: 6 },
  { slug: "homepod-mini", name: "HomePod mini", subtitle: "Surprising sound for its size.", price: 99, category: "TV & Home", collection: "TV & Home", description: "HomePod mini fills the room with rich sound and works beautifully with the rest of your Apple ecosystem.", details: ["360-degree audio", "Siri", "Thread smart home support", ...commonDetails], care: "Keep the speaker on a dry, stable surface and wipe with a soft cloth.", images: routeAssets.tvHome, variants: variant("Color", ["Midnight", "White", "Yellow", "Orange", "Blue"]), tags: ["homepod", "home", "speaker"], flags: ["giftable", "best-seller"], availability: "in-stock", stock: 12 },
  { slug: "airtag", name: "AirTag", subtitle: "What was lost is now sound.", price: 29, category: "Accessories", collection: "AirTag", description: "AirTag helps you keep track of your belongings with Precision Finding and the Find My network.", details: ["Precision Finding", "Built-in speaker", "Replaceable battery", ...commonDetails], care: "Keep the AirTag dry and replace the battery when needed.", images: routeAssets.airtag, variants: variant("Pack", ["1 pack", "4 pack"]), tags: ["airtag", "find my", "travel", "gift"], flags: ["best-seller", "giftable"], availability: "in-stock", stock: 36 },
  { slug: "magsafe-charger", name: "MagSafe Charger", subtitle: "Fast wireless charging, magnetically aligned.", price: 39, category: "Accessories", collection: "iPhone Accessories", description: "MagSafe Charger makes wireless charging simple, with perfect magnetic alignment for compatible iPhone models.", details: ["Magnetic alignment", "USB-C connector", "Works with MagSafe cases", ...commonDetails], care: "Keep the charging surface free of dust and metal objects.", images: routeAssets.accessories, variants: variant("Cable length", ["1 metre", "2 metres"]), tags: ["magsafe", "charger", "iphone", "accessory"], flags: ["best-seller"], availability: "in-stock", stock: 29 },
  { slug: "magic-keyboard", name: "Magic Keyboard", subtitle: "A great keyboard for your Mac.", price: 99, category: "Accessories", collection: "Mac Accessories", description: "Magic Keyboard delivers a comfortable, precise typing experience with a rechargeable design.", details: ["Full-size layout", "Rechargeable battery", "Touch ID option", ...commonDetails], care: "Wipe with a soft, lint-free cloth and keep the charging port clear.", images: routeAssets.mac, variants: variant("Feature", ["Standard", "With Touch ID", "With Touch ID and Numeric Keypad"]), tags: ["magic keyboard", "mac", "keyboard"], flags: ["giftable"], availability: "in-stock", stock: 17 },
  { slug: "magic-mouse", name: "Magic Mouse", subtitle: "A touch of genius.", price: 79, category: "Accessories", collection: "Mac Accessories", description: "Magic Mouse has a Multi-Touch surface for simple gestures and a rechargeable design.", details: ["Multi-Touch surface", "Rechargeable battery", "Wireless Bluetooth", ...commonDetails], care: "Clean the Multi-Touch surface with a soft, dry cloth.", images: routeAssets.mac, variants: variant("Color", ["White", "Black"]), tags: ["magic mouse", "mac", "mouse"], flags: ["giftable"], availability: "in-stock", stock: 14 },
  { slug: "iphone-17-pro-clear-case", name: "iPhone 17 Pro Clear Case with MagSafe", subtitle: "Protection that shows off your iPhone.", price: 49, category: "Accessories", collection: "iPhone Accessories", description: "A slim clear case designed to protect iPhone 17 Pro while showing off its finish and working with MagSafe.", details: ["MagSafe compatible", "Scratch-resistant coating", "Camera protection", ...commonDetails], care: "Remove regularly to clean both the case and iPhone.", images: routeAssets.iphone17pro, variants: variant("Compatibility", ["iPhone 17 Pro"]), tags: ["case", "iphone", "magsafe", "protection"], flags: ["new-arrival"], availability: "in-stock", stock: 23 },
  { slug: "apple-watch-sport-band", name: "Apple Watch Sport Band", subtitle: "Soft, breathable, and made to move.", price: 49, category: "Accessories", collection: "Apple Watch Accessories", description: "The Sport Band is made from a durable fluoroelastomer and closes with a pin-and-tuck fastener.", details: ["Soft fluoroelastomer", "Pin-and-tuck closure", "Multiple sizes", ...commonDetails], care: "Rinse and dry after workouts or water exposure.", images: routeAssets.watch, variants: variant("Color", ["Black", "Starlight", "Ultramarine", "Plum"]), tags: ["apple watch", "band", "fitness"], flags: ["best-seller"], availability: "in-stock", stock: 31 },
  { slug: "beats-studio-pro", name: "Beats Studio Pro", subtitle: "Premium wireless over-ear headphones.", price: 349, category: "Accessories", collection: "Beats", description: "Beats Studio Pro bring rich sound, Active Noise Cancelling, and comfortable all-day listening.", details: ["Active Noise Cancelling", "Transparency mode", "USB-C lossless audio", ...commonDetails], care: "Store in the included case and wipe ear cushions gently.", images: routeAssets.airpodsMax, variants: variant("Color", ["Black", "Sandstone", "Deep Brown", "Navy"]), tags: ["beats", "headphones", "audio"], flags: ["best-seller"], availability: "in-stock", stock: 8 },
  { slug: "apple-usb-c-cable", name: "USB-C Charge Cable", subtitle: "Charge and connect.", price: 19, category: "Accessories", collection: "Cables & Adapters", description: "A woven USB-C charge cable for connecting and charging Apple devices.", details: ["USB-C connectors", "Durable woven design", "Available in multiple lengths", ...commonDetails], care: "Coil loosely and keep connectors free of debris.", images: routeAssets.accessories, variants: variant("Length", ["1 metre", "2 metres"]), tags: ["cable", "usb-c", "charger"], flags: ["giftable"], availability: "in-stock", stock: 45 },
];

const inventory: Product[] = seeds.map((seed, index) => ({
  ...seed,
  id: `apple-${String(index + 1).padStart(3, "0")}`,
  collections: [seed.collection.toLowerCase().replaceAll(" ", "-"), seed.category.toLowerCase().replaceAll(" ", "-")],
  rating: null,
  reviewCount: 0,
  relatedProductIds: [],
}));

export const products: Product[] = inventory.map((product) => ({
  ...product,
  relatedProductIds: inventory.filter((candidate) => candidate.id !== product.id && (candidate.category === product.category || candidate.collection === product.collection)).slice(0, 4).map((candidate) => candidate.id),
}));

const collectionImage = (key: keyof typeof routeAssets) => routeAssets[key][0] ?? routeAssets.accessories[0];

export const collections = [
  { slug: "iphone", name: "iPhone", eyebrow: "Meet the latest iPhone", description: "Explore iPhone 17 Pro, iPhone 17, iPhone Air, iPhone 16, and iPhone 16e.", image: collectionImage("iphone17pro"), category: "iPhone" },
  { slug: "mac", name: "Mac", eyebrow: "Choose your Mac", description: "From MacBook Air to Mac Studio, find the Mac that fits your work and your life.", image: collectionImage("macbookAir"), category: "Mac" },
  { slug: "ipad", name: "iPad", eyebrow: "iPad for every kind of work", description: "Meet iPad Pro, iPad Air, iPad, and iPad mini, plus the accessories that make them yours.", image: collectionImage("ipadPro"), category: "iPad" },
  { slug: "apple-watch", name: "Apple Watch", eyebrow: "A healthier, more connected you", description: "Shop Apple Watch Series 11, Apple Watch SE 3, Apple Watch Ultra 3, and bands.", image: collectionImage("watchSeries"), category: "Apple Watch" },
  { slug: "airpods", name: "AirPods", eyebrow: "Sound all around", description: "Choose AirPods Pro 3, AirPods 4, or AirPods Max 2 and make them yours.", image: collectionImage("airpodsPro"), category: "AirPods" },
  { slug: "tv-home", name: "TV & Home", eyebrow: "Entertainment at home", description: "Apple TV 4K, HomePod, and HomePod mini bring Apple services and sound to every room.", image: collectionImage("tvHome"), category: "TV & Home" },
  { slug: "accessories", name: "Accessories", eyebrow: "Make it yours", description: "Cases, cables, chargers, Apple Pencil, Magic accessories, AirTag, Beats, and more.", image: collectionImage("accessories"), category: "Accessories" },
  { slug: "vision", name: "Apple Vision Pro", eyebrow: "The ultimate spatial computer", description: "Discover Apple Vision Pro and the accessories that extend the experience.", image: collectionImage("vision"), category: "Apple Vision Pro" },
] as const;

export const journals = [
  { slug: "why-iphone", title: "Why iPhone", type: "Apple Store guide", date: "Updated 2026", excerpt: "A practical guide to choosing the right iPhone, comparing models, and moving your data.", image: collectionImage("iphone17") },
  { slug: "choose-your-mac", title: "Choose your Mac", type: "Apple Store guide", date: "Updated 2026", excerpt: "Compare MacBook Air, MacBook Pro, Mac mini, iMac, Mac Studio, and Studio Display.", image: collectionImage("macbookPro") },
  { slug: "ipad-accessories", title: "The iPad setup", type: "Apple Store guide", date: "Updated 2026", excerpt: "Build an iPad setup with Apple Pencil Pro, Magic Keyboard, and the right case.", image: collectionImage("ipadAir") },
  { slug: "make-it-yours", title: "Make it yours", type: "Apple Store guide", date: "Updated 2026", excerpt: "Personalize your Apple devices with engraving, bands, cases, and accessories.", image: collectionImage("watch") },
];

export const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
export const findProduct = (slug?: string) => products.find((product) => product.slug === slug);
export const findCollection = (slug?: string) => collections.find((collection) => collection.slug === slug);
export const findJournal = (slug?: string) => journals.find((journal) => journal.slug === slug);
export const featuredProducts = () => products.filter((product) => product.flags.includes("featured") || product.flags.includes("best-seller"));
export const newArrivalProducts = () => products.filter((product) => product.flags.includes("new-arrival"));
