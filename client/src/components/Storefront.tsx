import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useCommerce } from "@/lib/commerce";

const nav = [{ label: "Shop", href: "/shop" }, { label: "Collections", href: "/collections" }, { label: "Journal", href: "/journal" }, { label: "About", href: "/about" }];
const wordmarkAsset = "/manus-storage/usamabhanbhro-wordmark-clean_c3a17930.png";

export function Header() {
  const [menu, setMenu] = useState(false); const [scrolled, setScrolled] = useState(false); const [, navigate] = useLocation(); const { cartCount, wishlist } = useCommerce();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <>
    <div className="demo-ribbon"><span>USAMABHANBHRO SHOWCASE</span><span>DEMO MODE · NO REAL TRANSACTIONS</span></div>
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="header-main">
        <button className="mobile-menu-button" aria-label="Open menu" onClick={() => setMenu(true)}>☰</button>
        <nav className="desktop-nav" aria-label="Primary">{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <Link className="wordmark wordmark--image" href="/" aria-label="Usamabhanbhro home"><img src={wordmarkAsset} alt="Usamabhanbhro" /></Link>
        <div className="utility-nav"><Link href="/search">Search</Link><Link href="/account">Account</Link><Link href="/wishlist">Wishlist ({wishlist.length})</Link><Link href="/cart">Bag ({cartCount})</Link></div>
        <button className="mobile-bag-button" aria-label="Open bag" onClick={() => navigate("/cart")}>Bag ({cartCount})</button>
      </div>
      <div className="header-subline"><span>Hand-finished objects for considered living</span><span>Karachi · Lahore · Everywhere</span></div>
    </header>
    <div className={`mobile-drawer ${menu ? "mobile-drawer--open" : ""}`} aria-hidden={!menu}>
      <div className="mobile-drawer__top"><Link className="wordmark wordmark--image wordmark--drawer" href="/" aria-label="Usamabhanbhro home" onClick={() => setMenu(false)}><img src={wordmarkAsset} alt="Usamabhanbhro" /></Link><button onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button></div>
      <nav>{[...nav, { label: "Search", href: "/search" }, { label: "Account", href: "/account" }, { label: "Bag", href: "/cart" }].map((item) => <Link key={item.href} href={item.href} onClick={() => setMenu(false)}>{item.label}</Link>)}</nav>
      <div className="mobile-drawer__footer"><span>Demo storefront</span><Link href="/contact" onClick={() => setMenu(false)}>Contact</Link></div>
    </div>
  </>;
}

export function Footer() {
  const [email, setEmail] = useState(""); const [message, setMessage] = useState(""); const [open, setOpen] = useState<string | null>(null);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) return setMessage("Enter a valid email address."); setMessage("You are on the list — demo signup recorded locally."); setEmail(""); };
  const groups = [{ title: "Explore", links: [["Shop", "/shop"], ["Collections", "/collections"], ["Journal", "/journal"]] }, { title: "Service", links: [["Contact", "/contact"], ["Account", "/account"], ["Wishlist", "/wishlist"]] }, { title: "The studio", links: [["About", "/about"], ["Shipping & returns", "/contact"], ["Demo notes", "/about"]] }];
  return <footer className="site-footer"><section className="newsletter"><div><p className="eyebrow eyebrow--light">The Usamabhanbhro letter</p><h2>BE THE FIRST<br />TO KNOW.</h2></div><div className="newsletter__form-wrap"><p>New objects, studio notes, and considered edits. This form is a local showcase interaction — no email service is connected.</p><form onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" /><button type="submit" aria-label="Subscribe">↗</button></form><span className="form-message" role="status">{message}</span></div></section>
    <div className="footer-main"><Link className="footer-wordmark wordmark--image" href="/" aria-label="Usamabhanbhro home"><img src={wordmarkAsset} alt="Usamabhanbhro" /></Link><div className="footer-groups">{groups.map((group) => <div className={`footer-group ${open === group.title ? "footer-group--open" : ""}`} key={group.title}><button onClick={() => setOpen(open === group.title ? null : group.title)}>{group.title}<span className="footer-group__toggle">+</span></button><ul>{group.links.map(([label, href]) => <li key={href + label}><Link href={href}>{label}</Link></li>)}</ul></div>)}</div></div>
    <div className="footer-bottom"><span>© Usamabhanbhro 2025 · Demo showcase</span><div><Link href="/about">Privacy</Link><Link href="/contact">Terms</Link><Link href="/contact">Support</Link></div></div>
  </footer>;
}

function AppleNav() {
  const [menu, setMenu] = useState(false); const [search, setSearch] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 8); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  const items = ["Store", "Mac", "iPad", "iPhone", "Watch", "Vision", "AirPods", "TV & Home", "Entertainment", "Accessories", "Support"];
  return <header className={`apple-nav ${scrolled ? "apple-nav--scrolled" : ""}`}>
    <div className="apple-nav__inner">
      <Link className="apple-nav__logo" href="/" aria-label="Apple home"><span aria-hidden="true">●</span></Link>
      <button className="apple-nav__menu" onClick={() => setMenu((value) => !value)} aria-expanded={menu} aria-label={menu ? "Close navigation" : "Open navigation"}>{menu ? "×" : "☰"}</button>
      <nav className={`apple-nav__links ${menu ? "is-open" : ""}`} aria-label="Apple primary navigation">{items.map((item) => <a key={item} href={`#${item.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{item}</a>)}</nav>
      <div className="apple-nav__actions"><button aria-label="Search" onClick={() => setSearch((value) => !value)}>{search ? "×" : "⌕"}</button><a href="#footer" aria-label="Shopping bag">▢</a></div>
    </div>
    {search && <form className="apple-nav__search" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="apple-search">Search apple.com</label><input autoFocus id="apple-search" placeholder="Search apple.com" /></form>}
  </header>;
}

function AppleFooter() {
  const [open, setOpen] = useState<string | null>(null);
  const groups = [{ title: "Shop and Learn", links: ["Store", "Mac", "iPad", "iPhone", "Watch", "Vision", "AirPods", "TV & Home", "Accessories", "Gift Cards"] }, { title: "Services", links: ["Apple Music", "Apple TV+", "Apple Fitness+", "Apple Arcade", "iCloud", "Apple One", "Apple Pay", "Apple Books"] }, { title: "Apple Store", links: ["Find a Store", "Genius Bar", "Today at Apple", "Group Reservations", "Apple Camp", "Apple Store App", "Certified Refurbished", "Financing"] }, { title: "For Business", links: ["Apple and Business", "Shop for Business", "For Education", "For Healthcare", "For Government"] }, { title: "Apple Values", links: ["Accessibility", "Education", "Environment", "Inclusion and Diversity", "Privacy", "Racial Equity and Justice"] }];
  return <footer className="apple-footer" id="footer"><p className="apple-footer__note">* Available for Qualified Purchasers only. Offer subject to availability. While supplies last. Additional restrictions apply.</p><div className="apple-footer__crumb"><Link href="/">Apple</Link><span>›</span><span>Home</span></div><div className="apple-footer__groups">{groups.map((group) => <section className={`apple-footer__group ${open === group.title ? "is-open" : ""}`} key={group.title}><button onClick={() => setOpen(open === group.title ? null : group.title)}>{group.title}<span>+</span></button><ul>{group.links.map((link) => <li key={link}><a href="#footer">{link}</a></li>)}</ul></section>)}</div><div className="apple-footer__bottom"><span>Copyright © 2026 Apple Inc. All rights reserved.</span><div><a href="#footer">Privacy Policy</a><a href="#footer">Terms of Use</a><a href="#footer">Sales and Refunds</a><a href="#footer">Legal</a><a href="#footer">Site Map</a></div><span>United States</span></div></footer>;
}

export function StorefrontLayout({ children }: { children: React.ReactNode }) { const [location] = useLocation(); const appleHome = location === "/"; return appleHome ? <div className="apple-shell"><AppleNav /><main>{children}</main><AppleFooter /></div> : <div className="storefront"><Header /><main>{children}</main><Footer /></div>; }

export const PageIntro = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{body && <p>{body}</p>}</section>;
