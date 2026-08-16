import { useEffect, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { Link } from "wouter";
import { assetUrl } from "@/lib/assetUrl";

const asset = assetUrl("/sites/apple-com-7b1a/homepage-6a2c");

type GalleryItem = { title: string; eyebrow: string; copy: string; action: string; tone: string };

const gallery: GalleryItem[] = [
  { title: "MLS on Apple TV", eyebrow: "Sports", copy: "Watch every club, every match, live—all season long.", action: "Explore guides", tone: "gallery--soccer" },
  { title: "Sabrina Carpenter: The Zane Lowe Interview", eyebrow: "Music", copy: "The artist opens up about making music, finding joy, and what comes next.", action: "Explore guides", tone: "gallery--music" },
  { title: "Hello Kitty Island Adventure", eyebrow: "Arcade", copy: "A cozy game of friendship, exploration, and discovery.", action: "Explore guides", tone: "gallery--hello" },
  { title: "F1 on Apple TV", eyebrow: "Action", copy: "Every Grand Prix, live and on demand—all in one place, all year long.", action: "Explore guides", tone: "gallery--f1" },
  { title: "Programs", eyebrow: "Apple TV+", copy: "New stories to watch, share, and come back to.", action: "Explore guides", tone: "gallery--programs" },
];

function PillLink({ href = "/shop", children, secondary = false }: { href?: string; children: ReactNode; secondary?: boolean }) {
  return <Link className={`apple-pill ${secondary ? "apple-pill--secondary" : ""}`} href={href}>{children}</Link>;
}

function FeatureHero({ id, className, title, subtitle, image, imageAlt, children }: { id: string; className?: string; title: string; subtitle: string; image: string; imageAlt: string; children?: ReactNode }) {
  return <section id={id} className={`apple-feature ${className ?? ""}`}><div className="apple-feature__copy"><h2>{title}</h2><p>{subtitle}</p><div className="apple-feature__links">{children}</div></div><img src={`${asset}/${image}`} alt={imageAlt} loading="lazy" /></section>;
}

function PromoTile({ id, className, title, subtitle, image, imageAlt, children }: { id: string; className?: string; title: ReactNode; subtitle: string; image?: string; imageAlt?: string; children: ReactNode }) {
  return <article id={id} className={`apple-promo ${className ?? ""}`}><div className="apple-promo__copy"><h3>{title}</h3><p>{subtitle}</p><div className="apple-promo__links">{children}</div></div>{image && <img src={`${asset}/${image}`} alt={imageAlt ?? ""} loading="lazy" />}</article>;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setActive((index) => (index + 1) % gallery.length), 4200); return () => window.clearInterval(timer); }, [playing]);
  const current = gallery[active];
  return <>
    <section className="apple-education" id="apple-store"><div className="apple-education__copy"><h1>College, sorted.</h1><p>Get a gift card from $100 to $150<sup>*</sup> when you buy Mac or iPad with education savings.</p><PillLink href="/shop">Shop</PillLink></div><img src={`${asset}/education-hero.jpg`} alt="Students carrying Apple devices and creative supplies" /></section>

    <FeatureHero id="iphone" className="apple-feature--iphone" title="iPhone" subtitle="Meet the latest iPhone lineup." image="iphone-family.jpg" imageAlt="The latest iPhone lineup"><PillLink href="/collections/iphone">Learn more</PillLink><PillLink href="/collections/iphone" secondary>Shop iPhone</PillLink></FeatureHero>
    <FeatureHero id="macbook-air" className="apple-feature--air" title="MacBook Air" subtitle="Now supercharged by M5." image="macbook-air.jpg" imageAlt="MacBook Air"><PillLink href="/products/macbook-air">Learn more</PillLink><PillLink href="/products/macbook-air" secondary>Buy</PillLink></FeatureHero>

    <section className="apple-promos" id="promos"><PromoTile id="ipad" className="apple-promo--ipad" title="iPad Air" subtitle="Now supercharged by M4." image="ipad-air.jpg" imageAlt="iPad Air"><PillLink href="/products/ipad-air">Learn more</PillLink><PillLink href="/products/ipad-air" secondary>Buy</PillLink></PromoTile><PromoTile id="mac" className="apple-promo--mac" title="MacBook Pro" subtitle="Now with M5, M5 Pro, and M5 Max." image="macbook-pro.jpg" imageAlt="MacBook Pro"><PillLink href="/products/macbook-pro">Learn more</PillLink><PillLink href="/products/macbook-pro" secondary>Buy</PillLink></PromoTile><PromoTile id="watch" className="apple-promo--watch" title="Apple Watch Series 11" subtitle="The ultimate way to watch your health." image="apple-watch.jpg" imageAlt="Apple Watch Series 11"><PillLink href="/products/apple-watch-series-11">Learn more</PillLink><PillLink href="/products/apple-watch-series-11" secondary>Buy</PillLink></PromoTile><PromoTile id="ipad-pro" className="apple-promo--pro" title="iPad Pro" subtitle="Advanced AI performance and game-changing capabilities." image="ipad-pro.jpg" imageAlt="iPad Pro"><PillLink href="/products/ipad-pro">Learn more</PillLink><PillLink href="/products/ipad-pro" secondary>Buy</PillLink></PromoTile><PromoTile id="trade-in" className="apple-promo--trade" title="Apple Trade In" subtitle="Get up to $205–$720 in credit when you trade in iPhone 13 or higher."><PillLink href="/contact">Get your estimate</PillLink></PromoTile><PromoTile id="apple-card" className="apple-promo--card" title="Apple Card" subtitle="Get up to 3% Daily Cash back with every purchase."><PillLink href="/about">Learn more</PillLink><PillLink href="/about" secondary>About this demo</PillLink></PromoTile></section>

    <section className="apple-entertainment" id="entertainment"><div className="apple-entertainment__heading"><h2>Endless entertainment.</h2><button type="button" className="apple-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause endless entertainment gallery" : "Play endless entertainment gallery"}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button></div><div className={`apple-gallery ${current.tone}`}><div className="apple-gallery__content"><span className="apple-gallery__eyebrow">{current.eyebrow}</span><h3>{current.title}</h3><p>{current.copy}</p><Link href="/journal">{current.action} <span aria-hidden="true">›</span></Link></div></div><div className="apple-gallery__controls" role="tablist" aria-label="Endless entertainment gallery">{gallery.map((item, index) => <button type="button" key={item.title} role="tab" aria-selected={index === active} aria-controls="entertainment-panel" className={index === active ? "is-active" : ""} onClick={() => { setActive(index); setPlaying(false); }}>{String(index + 1).padStart(2, "0")}<span>{item.title}</span></button>)}</div></section>
  </>;
}
