import { useEffect, useState, type ReactNode } from "react";
import { Apple, ChevronRight, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCommerce } from "@/lib/commerce";
import { assetUrl } from "@/lib/assetUrl";

const appleNavItems = [
  ["Store", "/shop"], ["Mac", "/collections/mac"], ["iPad", "/collections/ipad"], ["iPhone", "/collections/iphone"],
  ["Watch", "/collections/apple-watch"], ["Vision", "/collections/vision"], ["AirPods", "/collections/airpods"],
  ["TV & Home", "/collections/tv-home"], ["Accessories", "/collections/accessories"], ["Support", "/contact"],
] as const;

const footerGroups = [
  { title: "Shop and Learn", links: [["Store", "/shop"], ["Mac", "/collections/mac"], ["iPad", "/collections/ipad"], ["iPhone", "/collections/iphone"], ["Watch", "/collections/apple-watch"], ["AirPods", "/collections/airpods"], ["Vision", "/collections/vision"], ["TV & Home", "/collections/tv-home"], ["Accessories", "/collections/accessories"], ["Compare products", "/compare"]] },
  { title: "Services", links: [["Product guides", "/journal"], ["Contact support", "/contact"], ["About this demo", "/about"], ["Order confirmation", "/order-confirmation"]] },
  { title: "Apple Store", links: [["Your account", "/account"], ["Saved products", "/wishlist"], ["Your bag", "/cart"], ["Checkout", "/checkout"], ["Find a Store", "/contact"]] },
  { title: "For Business", links: [["Apple and Business", "/collections/mac"], ["Shop for Business", "/shop"], ["For Education", "/collections/ipad"], ["Get help choosing", "/contact"]] },
  { title: "Apple Values", links: [["Accessibility", "/contact"], ["Education", "/collections/ipad"], ["Environment", "/about"], ["Privacy", "/privacy"], ["Inclusion and Diversity", "/contact"], ["Legal", "/terms"]] },
] as const;

function AppleNav() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();
  const { cartCount } = useCommerce();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenu(false); setSearch(false); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKeyDown); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const closeMenu = () => setMenu(false);
  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = String(new FormData(event.currentTarget).get("q") ?? "").trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
    setSearch(false);
    closeMenu();
  };

  return <header className={`apple-nav ${scrolled ? "apple-nav--scrolled" : ""}`}>
    <div className="apple-nav__inner">
      <button type="button" className="apple-nav__menu" onClick={() => setMenu((value) => !value)} aria-expanded={menu} aria-controls="primary-navigation" aria-label={menu ? "Close navigation" : "Open navigation"}>{menu ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}</button>
      <Link className="apple-nav__logo" href="/" aria-label="Apple Store home"><Apple size={17} strokeWidth={1.8} aria-hidden="true" /></Link>
      <nav id="primary-navigation" className={`apple-nav__links ${menu ? "is-open" : ""}`} aria-label="Apple Store primary navigation">
        {appleNavItems.map(([label, href]) => <Link key={href} href={href} onClick={closeMenu}>{label}</Link>)}
      </nav>
      <div className="apple-nav__actions">
        <button type="button" aria-label={search ? "Close search" : "Open search"} aria-expanded={search} aria-controls="global-search" onClick={() => setSearch((value) => !value)}>{search ? <X size={16} aria-hidden="true" /> : <Search size={16} aria-hidden="true" />}</button>
        <button type="button" className="apple-nav__bag" aria-label={`Shopping bag with ${cartCount} ${cartCount === 1 ? "item" : "items"}`} onClick={() => navigate("/cart")}><ShoppingBag size={16} aria-hidden="true" />{cartCount > 0 && <span className="apple-nav__count" aria-live="polite">{cartCount}</span>}</button>
      </div>
    </div>
    {search && <form id="global-search" className="apple-nav__search" onSubmit={submitSearch}>
      <label className="sr-only" htmlFor="apple-search">Search products</label>
      <Search size={18} aria-hidden="true" />
      <input autoFocus autoComplete="off" name="q" id="apple-search" placeholder="Search Apple products and accessories" />
      <button type="submit">Search</button>
    </form>}
  </header>;
}

function AppleFooter() {
  const [open, setOpen] = useState<string | null>(null);
  return <footer className="apple-footer" id="footer">
    <p className="apple-footer__note">* Demo storefront. Prices and availability are illustrative. No real transactions are processed.</p>
    <div className="apple-footer__crumb"><Link href="/">Apple Store</Link><ChevronRight size={14} aria-hidden="true" /><span>Shop online</span></div>
    <div className="apple-footer__groups">
      {footerGroups.map((group) => { const panelId = `footer-${group.title.toLowerCase().replaceAll(" ", "-")}`; return <section className={`apple-footer__group ${open === group.title ? "is-open" : ""}`} key={group.title}>
        <button type="button" onClick={() => setOpen(open === group.title ? null : group.title)} aria-expanded={open === group.title} aria-controls={panelId}>{group.title}<span aria-hidden="true">{open === group.title ? <X size={14} /> : <span className="footer-plus">+</span>}</span></button>
        <ul id={panelId}>{group.links.map(([label, href]) => <li key={`${href}-${label}`}><Link href={href} onClick={() => setOpen(null)}>{label}</Link></li>)}</ul>
      </section>; })}
    </div>
    <div className="apple-footer__bottom"><span>Copyright © 2026 Apple Store Demo. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Support</Link><a href={assetUrl("/sitemap.xml")}>Site Map</a></div><span>Demo storefront</span></div>
  </footer>;
}

export function StorefrontLayout({ children }: { children: ReactNode }) {
  return <div className="apple-shell"><a className="skip-link" href="#main-content">Skip to content</a><AppleNav /><main id="main-content">{children}</main><AppleFooter /></div>;
}

export const PageIntro = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{body && <p>{body}</p>}</section>;
