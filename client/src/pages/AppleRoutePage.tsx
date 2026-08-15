import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";

const asset = (name: string) => `/sites/apple-com-7b1a/homepage-6a2c/${name}`;

const pageLabels: Record<string, string> = {
  "/mac": "Mac",
  "/ipad": "iPad",
  "/iphone": "iPhone",
  "/watch": "Apple Watch",
  "/apple-vision-pro": "Apple Vision Pro",
  "/airpods": "AirPods",
  "/tv-home": "TV & Home",
  "/entertainment": "Entertainment",
  "/macbook-air": "MacBook Air",
  "/macbook-pro": "MacBook Pro",
  "/macbook-neo": "MacBook Neo",
  "/imac": "iMac",
  "/mac-mini": "Mac mini",
  "/mac-studio": "Mac Studio",
  "/ipad-pro": "iPad Pro",
  "/ipad-air": "iPad Air",
  "/ipad-11": "iPad",
  "/ipad-mini": "iPad mini",
  "/iphone-17-pro": "iPhone 17 Pro",
  "/iphone-air": "iPhone Air",
  "/iphone-17": "iPhone 17",
  "/iphone-17e": "iPhone 17e",
  "/apple-watch-series-11": "Apple Watch Series 11",
  "/apple-watch-ultra-3": "Apple Watch Ultra 3",
  "/apple-watch-se-3": "Apple Watch SE 3",
  "/airpods-4": "AirPods 4",
  "/airpods-pro": "AirPods Pro 3",
  "/airpods-max": "AirPods Max 2",
  "/apple-tv": "Apple TV",
  "/apple-tv-4k": "Apple TV 4K",
  "/homepod-2nd-generation": "HomePod",
  "/homepod-mini": "HomePod mini",
  "/apple-music": "Apple Music",
  "/apple-tv-app": "Apple TV app",
  "/apple-arcade": "Apple Arcade",
  "/apple-fitness-plus": "Apple Fitness+",
  "/apple-one": "Apple One",
  "/apple-pay": "Apple Pay",
  "/apple-card": "Apple Card",
  "/apple-cash": "Apple Cash",
  "/wallet": "Wallet",
  "/icloud": "iCloud+",
  "/services": "Entertainment",
  "/retail": "Find a Store",
  "/retail/geniusbar": "Genius Bar",
  "/today": "Today at Apple",
  "/today/calendar": "Today at Apple Calendar",
  "/today/camp": "Apple Camp",
  "/today/groups": "Group Reservations",
  "/newsroom": "Newsroom",
  "/apple-events": "Apple Events",
  "/contact": "Contact Apple",
  "/privacy": "Privacy",
  "/environment": "Environment",
  "/accessibility": "Accessibility",
  "/leadership": "Apple Leadership",
  "/careers/us": "Career Opportunities",
  "/sitemap": "Apple Site Map",
  "/us/search": "Search Apple.com",
};

const familyCopy: Record<string, { eyebrow: string; body: string; image: string }> = {
  mac: { eyebrow: "Mac", body: "Powerful tools for every kind of work, creativity, and play.", image: "macbook-air.jpg" },
  ipad: { eyebrow: "iPad", body: "Touch, power, and versatility come together in a device made to move with you.", image: "ipad-air.jpg" },
  iphone: { eyebrow: "iPhone", body: "Meet the latest iPhone lineup, built for the moments that matter.", image: "iphone-family.jpg" },
  watch: { eyebrow: "Apple Watch", body: "A healthier, more connected day is closer than ever.", image: "apple-watch.jpg" },
  airpods: { eyebrow: "AirPods", body: "Immersive sound, intelligent features, and effortless connection.", image: "airpods-hero.jpg" },
  tv: { eyebrow: "TV & Home", body: "Entertainment and smart home experiences, all in one place.", image: "education-hero.jpg" },
  service: { eyebrow: "Apple Services", body: "More ways to enjoy the things you love, across every Apple device.", image: "education-start.png" },
};

const routeFamilies = ["mac", "ipad", "iphone", "watch", "airpods", "tv", "service"];

function humanize(path: string) {
  const last = path.split("/").filter(Boolean).pop() || "Apple";
  return last
    .replace(/\.html$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function familyFor(path: string) {
  if (path.includes("mac") || path.includes("studio-display")) return "mac";
  if (path.includes("ipad")) return "ipad";
  if (path.includes("iphone")) return "iphone";
  if (path.includes("watch")) return "watch";
  if (path.includes("airpods")) return "airpods";
  if (path.includes("tv") || path.includes("homepod") || path.includes("home-app")) return "tv";
  return "service";
}

function isComparison(path: string) {
  return path.includes("compare") || path.includes("specs");
}

function isStore(path: string) {
  return path.startsWith("/us/shop") || path === "/us/shop/goto/store" || path === "/us/shop/goto/buy_accessories";
}

function isEditorial(path: string) {
  return ["/newsroom", "/apple-events", "/tv-pr", "/leadership", "/careers/us", "/contact", "/environment", "/privacy", "/accessibility", "/legal", "/sitemap"].includes(path);
}

function isAppleRoute(path: string) {
  const commerce = ["/shop", "/collections", "/products", "/search", "/cart", "/checkout", "/account", "/wishlist", "/journal", "/about", "/order-confirmation"];
  return path === "/" || (!commerce.some((route) => path === route || path.startsWith(`${route}/`)) && path !== "");
}

export default function AppleRoutePage() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const path = location.split("?")[0].replace(/\/$/, "") || "/";
  const family = familyFor(path);
  const copy = familyCopy[family];
  const title = pageLabels[path] || humanize(path);
  const compare = isComparison(path);
  const store = isStore(path);
  const editorial = isEditorial(path);
  const tabs = compare ? ["Overview", "Features", "Tech specs"] : ["Overview", "Why Apple", "Accessories"];
  const cards = useMemo(() => {
    const related = routeFamilies.filter((item) => item !== family).slice(0, 3);
    return related.map((item) => ({ ...familyCopy[item], title: familyCopy[item].eyebrow }));
  }, [family]);

  if (!isAppleRoute(path)) return null;

  if (store) {
    return <AppleStorePage title={title} path={path} />;
  }
  if (compare) {
    return <AppleComparisonPage title={title} family={family} />;
  }
  if (editorial || ["/choose-country-region", "/feedback", "/rss", "/us/search"].includes(path)) {
    return <AppleEditorialPage title={title} path={path} />;
  }

  return <div className={`apple-route-page apple-route-page--${family}`}>
    <section className="apple-route-hero">
      <div className="apple-route-hero__copy">
        <p className="apple-eyebrow">{copy.eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy.body}</p>
        <div className="apple-route-actions"><Link className="apple-button apple-button--blue" href="#details">Learn more</Link><Link className="apple-button apple-button--outline" href="#related">Explore {copy.eyebrow}</Link></div>
      </div>
      <img src={asset(copy.image)} alt="" />
    </section>

    <section className="apple-route-intro" id="details">
      <p className="apple-eyebrow">Designed for what’s next</p>
      <h2>{editorial ? "Ideas that move the world forward." : `The ${title} experience starts here.`}</h2>
      <p>Apple products and services are designed to feel familiar from the first moment, while opening up new ways to create, connect, and get things done.</p>
    </section>

    <section className="apple-route-tabs" aria-label="Page sections">
      <div className="apple-route-tabs__bar">{tabs.map((tab) => <button className={activeTab === tab ? "is-active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
      <div className="apple-route-tabs__panel"><p className="apple-eyebrow">{activeTab}</p><h3>{activeTab === "Tech specs" ? "Every detail, considered." : activeTab === "Why Apple" ? "Technology made personal." : `${title}, in its element.`}</h3><p>From the materials and software to the way everything works together, every detail is made to disappear into the experience.</p></div>
    </section>

    <section className="apple-feature-grid">
      <article><span>01</span><h3>Powerful by design.</h3><p>Fast, fluid performance gives you more time for the things you want to do.</p></article>
      <article><span>02</span><h3>Made to fit your life.</h3><p>Thoughtful features and seamless continuity keep the experience moving with you.</p></article>
      <article><span>03</span><h3>Private and secure.</h3><p>Your information stays yours, with privacy built into every layer.</p></article>
    </section>

    <section className="apple-accordion" aria-label="More information">
      {["What’s included", "Compatibility", "Support and AppleCare"].map((item) => <div className={`apple-accordion__item ${expanded === item ? "is-open" : ""}`} key={item}><button onClick={() => setExpanded(expanded === item ? null : item)}><span>{item}</span><b>{expanded === item ? "−" : "+"}</b></button>{expanded === item && <p>Explore helpful details, compatibility notes, and support options for {title}.</p>}</div>)}
    </section>

    <section className="apple-related" id="related"><div className="apple-route-intro apple-route-intro--compact"><p className="apple-eyebrow">Keep exploring</p><h2>There’s more to discover.</h2></div><div className="apple-related__grid">{cards.map((card) => <Link href={`/${card.eyebrow.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="apple-related__card" key={card.title}><img src={asset(card.image)} alt="" /><div><p className="apple-eyebrow">{card.eyebrow}</p><h3>{card.title}</h3><span>Learn more →</span></div></Link>)}</div></section>
  </div>;
}

function AppleComparisonPage({ title, family }: { title: string; family: string }) {
  const rows = ["Performance", "Battery life", "Display", "Cameras", "Connectivity", "Privacy"]; 
  const products = [familyCopy[family]?.eyebrow || title, "Previous generation", "Best for you"];
  return <div className="apple-comparison-page"><section className="apple-route-intro"><p className="apple-eyebrow">Compare</p><h1>{title}</h1><p>See how the lineup compares, then choose the model that’s right for you.</p></section><div className="apple-comparison-table"><div className="apple-comparison-table__head"><span>Features</span>{products.map((product) => <strong key={product}>{product}</strong>)}</div>{rows.map((row, index) => <div className="apple-comparison-table__row" key={row}><span>{row}</span>{products.map((product) => <p key={product}>{index === 0 ? "Fast and fluid" : index === 1 ? "All-day battery" : index === 2 ? "Immersive display" : index === 3 ? "Advanced system" : index === 4 ? "Seamless connection" : "Built-in privacy"}</p>)}</div>)}</div><section className="apple-store-note"><p className="apple-eyebrow">Still deciding?</p><h2>We’re here to help.</h2><p>Chat with a Specialist or visit an Apple Store for a closer look.</p><Link href="/retail" className="apple-text-link">Find a Store →</Link></section></div>;
}

function AppleEditorialPage({ title, path }: { title: string; path: string }) {
  const isSearch = path === "/us/search";
  const [query, setQuery] = useState("");
  const cards = [
    { label: "Innovation", heading: "The future is bright.", image: "education-hero.jpg" },
    { label: "Apple values", heading: "Technology with a human touch.", image: "education-start.png" },
    { label: "Newsroom", heading: "Stories from Apple.", image: "iphone-family.jpg" },
  ];
  return <div className="apple-editorial-page"><section className="apple-route-intro"><p className="apple-eyebrow">{isSearch ? "Search" : "Apple"}</p><h1>{isSearch ? "Search Apple.com" : title}</h1><p>{isSearch ? "Find the products, support, and stories you’re looking for." : "Discover the people, ideas, and work behind Apple."}</p>{isSearch && <form className="apple-editorial-search" onSubmit={(event) => event.preventDefault()}><input aria-label="Search Apple.com" placeholder="Search Apple.com" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="submit">Search</button></form>}</section><section className="apple-editorial-grid">{cards.map((card) => <article key={card.heading}><img src={asset(card.image)} alt="" /><div><p className="apple-eyebrow">{card.label}</p><h2>{card.heading}</h2><p>Read more about the people and ideas shaping the next chapter.</p><Link className="apple-text-link" href="/newsroom">Explore →</Link></div></article>)}</section><section className="apple-editorial-list"><p className="apple-eyebrow">More from Apple</p>{["Designing for everyone", "A more sustainable future", "Support that goes further"].map((item, index) => <Link key={item} href={index === 0 ? "/accessibility" : index === 1 ? "/environment" : "/retail/geniusbar"}><span>{item}</span><b>↗</b></Link>)}</section></div>;
}

function AppleStorePage({ title, path }: { title: string; path: string }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Mac", "iPad", "iPhone", "Watch"];
  const products = [
    { name: "MacBook Air", category: "Mac", image: "macbook-air.jpg", price: "From $999" },
    { name: "iPad Air", category: "iPad", image: "ipad-air.jpg", price: "From $599" },
    { name: "iPhone", category: "iPhone", image: "iphone-family.jpg", price: "From $799" },
    { name: "Apple Watch", category: "Watch", image: "apple-watch.jpg", price: "From $399" },
  ];
  const visible = filter === "All" ? products : products.filter((product) => product.category === filter);
  return <div className="apple-store-page"><section className="apple-route-intro"><p className="apple-eyebrow">Apple Store</p><h1>{title || "Store"}</h1><p>Shop the latest Apple products and get help choosing what’s right for you.</p></section><div className="apple-store-filters">{categories.map((category) => <button className={filter === category ? "is-active" : ""} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div><section className="apple-store-grid">{visible.map((product) => <article className="apple-store-card" key={product.name}><img src={asset(product.image)} alt="" /><p className="apple-eyebrow">{product.category}</p><h2>{product.name}</h2><p>{product.price}</p><Link className="apple-button apple-button--blue" href={`/products/${product.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>Buy</Link></article>)}</section><section className="apple-store-note"><p className="apple-eyebrow">Shopping help</p><h2>Need a hand?</h2><p>Get personalized help from an Apple Specialist, or visit an Apple Store near you.</p><Link href="/retail" className="apple-text-link">Find a Store →</Link></section></div>;
}

export { isAppleRoute };
