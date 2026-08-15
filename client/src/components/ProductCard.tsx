import { Link } from "wouter";
import { useCommerce } from "@/lib/commerce";
import { money, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useCommerce();
  const saved = wishlist.includes(product.id);
  return <article className="catalog-card">
    <div className="catalog-card__media">
      <Link href={`/products/${product.slug}`}>
        <img className="material-image" src={product.images[0]} alt={`${product.name} — ${product.subtitle}`} loading="lazy" />
        <img className="catalog-card__hover material-image" src={product.images[1] ?? product.images[0]} alt="" loading="lazy" />
      </Link>
      <span className="material-mark" aria-hidden="true">Apple Store</span>
      <button className={`wishlist-button ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-pressed={saved} aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}>{saved ? "♥" : "♡"}</button>
      <Link className="catalog-card__quick" href={`/products/${product.slug}`}>View details ↗</Link>
    </div>
    <div className="catalog-card__meta"><div><p className="eyebrow eyebrow--rust">{product.category} · {product.collection}</p><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.subtitle}</p></div><strong>{money(product.price)}</strong></div>
  </article>;
}

export function ProductGrid({ items }: { items: Product[] }) { return <div className="catalog-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>; }
