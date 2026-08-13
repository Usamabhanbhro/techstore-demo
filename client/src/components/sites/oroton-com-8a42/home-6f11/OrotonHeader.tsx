/* Oroton reference clone: compact all-caps utility chrome with a centered wordmark and a calm mobile drawer. */
import { Search, ShoppingBag, UserRound, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = ["WOMEN", "MEN", "BAGS", "ACCESSORIES", "NEW", "JOURNAL"];

export default function OrotonHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="announcement-bar">
        <span>THE OROTON SALE</span>
        <span>UP TO 40% OFF SELECTED STYLES</span>
        <button type="button" aria-label="Dismiss sale announcement" onClick={(event) => event.currentTarget.parentElement?.remove()}>×</button>
      </div>
      <div className="header-main">
        <button className="mobile-menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu size={18} strokeWidth={1.5} />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link} href={link === "JOURNAL" ? "#journal" : `#${link.toLowerCase()}`}>{link}</a>)}
        </nav>
        <a className="wordmark" href="#top" aria-label="Oroton home"><img src="https://cdn11.bigcommerce.com/s-hyjjuz0fve/images/stencil/original/content/homepage/logo.png" alt="Oroton" /></a>
        <nav className="utility-nav" aria-label="Utility navigation">
          <button type="button" aria-label="Search"><Search size={17} strokeWidth={1.35} /><span>SEARCH</span></button>
          <button type="button" aria-label="Account"><UserRound size={17} strokeWidth={1.35} /><span>ACCOUNT</span></button>
          <button type="button" aria-label="Shopping bag"><ShoppingBag size={17} strokeWidth={1.35} /><span>BAG (0)</span></button>
        </nav>
        <button className="mobile-bag-button" type="button" aria-label="Shopping bag"><ShoppingBag size={18} strokeWidth={1.4} /></button>
      </div>
      <div className={`mobile-drawer ${open ? "mobile-drawer--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-drawer__top"><span className="wordmark wordmark--drawer"><img src="https://cdn11.bigcommerce.com/s-hyjjuz0fve/images/stencil/original/content/homepage/logo.png" alt="Oroton" /></span><button type="button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} strokeWidth={1.2} /></button></div>
        <nav aria-label="Mobile navigation">{links.map((link) => <a key={link} href={link === "JOURNAL" ? "#journal" : `#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}</nav>
        <div className="mobile-drawer__footer"><a href="#newsletter">NEWSLETTER</a><a href="#footer">STORE LOCATOR</a></div>
      </div>
    </header>
  );
}
