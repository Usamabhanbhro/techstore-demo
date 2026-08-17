import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useCommerce } from "@/lib/commerce";
import { money, type Product } from "@/lib/catalog";
import { assetUrl } from "@/lib/assetUrl";

function availabilityLabel(product: Product) {
  if (product.availability === "out-of-stock") return "Currently unavailable";
  if (product.availability === "low-stock") return "Low stock";
  return "Available now";
}

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useCommerce();
  const saved = wishlist.includes(product.id);
  return <article className="catalog-card">
    <div className="catalog-card__media">
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <img className="material-image" src={assetUrl(product.images[0])} alt={`${product.name} — ${product.subtitle}`} width={800} height={800} loading="lazy" decoding="async" sizes="(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 25vw" />
        <img className="catalog-card__hover material-image" src={assetUrl(product.images[1] ?? product.images[0])} alt="" aria-hidden="true" width={800} height={800} loading="lazy" decoding="async" sizes="(max-width: 720px) 50vw, (max-width: 1100px) 33vw, 25vw" />
      </Link>
      <span className="material-mark" aria-hidden="true">Mehronex Store</span>
      <button type="button" className={`wishlist-button ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}><Heart size={18} aria-hidden="true" fill={saved ? "currentColor" : "none"} strokeWidth={1.7} /></button>
      <Link className="catalog-card__quick" href={`/products/${product.slug}`}>View details <ArrowUpRight size={13} aria-hidden="true" /></Link>
    </div>
    <div className="catalog-card__meta">
      <div>
        <p className="eyebrow eyebrow--rust">{product.category} · {product.collection}</p>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.subtitle}</p>
        <span className={`availability availability--${product.availability}`}>{availabilityLabel(product)}</span>
      </div>
      <strong>{money(product.price)}</strong>
    </div>
  </article>;
}

export function ProductGrid({ items, className }: { items: Product[]; className?: string }) {
  return <div className={`catalog-grid ${className ?? ""}`.trim()}>{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
