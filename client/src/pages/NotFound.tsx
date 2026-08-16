import { ArrowLeft, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return <main className="empty-state" style={{ minHeight: "60vh", borderRadius: 0, margin: 0, background: "var(--color-background)" }}>
    <p className="eyebrow">TechStore</p>
    <h1>That page isn’t here.</h1>
    <p>We couldn’t find the page you requested. Return to the storefront or go back and try another destination.</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
      <button type="button" className="button button--dark" onClick={() => setLocation("/")}><Home size={16} aria-hidden="true" /> Go to storefront</button>
      <button type="button" className="button button--outline" onClick={() => window.history.back()}><ArrowLeft size={16} aria-hidden="true" /> Go back</button>
    </div>
  </main>;
}
