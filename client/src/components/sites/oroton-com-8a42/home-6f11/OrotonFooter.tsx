/* Oroton reference clone: charcoal newsletter and footer system with underlined form, social links, and mobile disclosures. */
import { FormEvent, useState } from "react";

const groups = [
  { title: "CUSTOMER CARE", items: ["Contact Us", "Shipping & Returns", "FAQ", "Store Locator"] },
  { title: "ABOUT OROTON", items: ["Our Story", "The Journal", "Careers", "Sustainability"] },
  { title: "FOLLOW US", items: ["Instagram", "Facebook", "Pinterest", "YouTube"] },
];

export default function OrotonFooter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const submit = (event: FormEvent) => { event.preventDefault(); setMessage(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Thank you — you’re on the list." : "Please enter a valid email address."); };

  return (
    <footer className="site-footer" id="footer">
      <section className="newsletter" id="newsletter"><div><p className="eyebrow eyebrow--light">OROTON NEWSLETTER</p><h2>BE THE FIRST<br />TO KNOW.</h2></div><div className="newsletter__form-wrap"><p>Receive first access to new arrivals and updates on all the latest trends.</p><form onSubmit={submit}><label className="sr-only" htmlFor="email">Email address</label><input id="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" type="email" /><button type="submit" aria-label="Subscribe">↗</button></form><span className="form-message" role="status">{message}</span></div></section>
      <section className="footer-main"><a className="footer-wordmark" href="#top"><img src="https://cdn11.bigcommerce.com/s-hyjjuz0fve/images/stencil/original/content/homepage/logo.png" alt="Oroton" /></a><div className="footer-groups">{groups.map((group) => <div className={`footer-group ${open === group.title ? "footer-group--open" : ""}`} key={group.title}><button type="button" onClick={() => setOpen(open === group.title ? null : group.title)} aria-expanded={open === group.title}><span>{group.title}</span><span className="footer-group__toggle">+</span></button><ul>{group.items.map((item) => <li key={item}><a href="#footer">{item}</a></li>)}</ul></div>)}</div></section>
      <div className="footer-bottom"><span>© OROTON 2025</span><span>AUSTRALIA / AUD</span><div><a href="#footer">PRIVACY</a><a href="#footer">TERMS</a></div></div>
    </footer>
  );
}
