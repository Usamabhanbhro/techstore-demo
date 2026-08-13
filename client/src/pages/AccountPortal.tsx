import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { PageIntro } from "@/components/Storefront";
import { wishlistProducts, useCommerce } from "@/lib/commerce";
import { trpc } from "@/lib/trpc";
import { ProductGrid } from "@/components/ProductCard";

function SignInPrompt({ title, body }: { title: string; body: string }) {
  return <div className="empty-state"><p className="eyebrow">Private account area</p><h2>{title}</h2><p>{body}</p><button className="button button--dark" onClick={() => startLogin()}>Sign in securely</button></div>;
}

export function AccountPortalPage() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const orders = trpc.orders.list.useQuery(undefined, { enabled: isAuthenticated });
  const addresses = trpc.account.addresses.useQuery(undefined, { enabled: isAuthenticated });

  if (loading) return <section className="account-page"><PageIntro eyebrow="Your studio" title="Account" body="Loading your secure account session." /><div className="empty-state"><p>Checking your session…</p></div></section>;
  if (!isAuthenticated || !user) return <section className="account-page"><PageIntro eyebrow="Your studio" title="Account" body="Sign in to view addresses, saved pieces, and demo orders stored against your secure account." /><SignInPrompt title="Your studio is waiting." body="Authentication uses the managed account session; passwords are never handled by this storefront." /></section>;

  const latestOrder = orders.data?.[0];
  const primaryAddress = addresses.data?.[0];
  return <><PageIntro eyebrow="Your studio" title="Account" body="Your authenticated profile, saved addresses, and transparent demo order history." /><section className="dashboard-grid"><div className="dashboard-card dashboard-card--dark"><p className="eyebrow eyebrow--light">Profile</p><h2>{user.name ?? "Usamabhanbhro member"}</h2><p>{user.email ?? "Account email unavailable"}</p><button className="plain-link plain-link--light" onClick={() => logout()}>Sign out</button></div><div className="dashboard-card"><p className="eyebrow">Orders</p><h2>{orders.isLoading ? "…" : orders.data?.length ?? 0}</h2><p>{latestOrder ? `Latest order ${latestOrder.orderNumber}` : "No demo orders yet"}</p><Link className="plain-link" href={latestOrder ? `/order-confirmation?order=${latestOrder.id}` : "/shop"}>{latestOrder ? "View latest order" : "Start exploring"}</Link></div><div className="dashboard-card"><p className="eyebrow">Saved pieces</p><h2>↗</h2><p>Synced from this browser after sign-in.</p><Link className="plain-link" href="/wishlist">View wishlist</Link></div><div className="dashboard-card dashboard-card--wide"><p className="eyebrow">Saved address</p><h2>{primaryAddress?.label ?? "No address saved"}</h2><p>{primaryAddress ? <>{primaryAddress.recipient}<br />{primaryAddress.line1}<br />{primaryAddress.city}, Pakistan</> : "Addresses are saved only after secure sign-in and a completed demo checkout."}</p><Link className="plain-link" href="/checkout">Continue to checkout</Link></div></section></>;
}

export function HybridWishlistPage() {
  const { wishlist, toggleWishlist } = useCommerce();
  const { isAuthenticated } = useAuth();
  const list = trpc.wishlist.list.useQuery(undefined, { enabled: isAuthenticated });
  const merge = trpc.wishlist.merge.useMutation({ onSuccess: () => list.refetch() });
  const setItem = trpc.wishlist.set.useMutation({ onSuccess: () => list.refetch() });

  useEffect(() => {
    if (isAuthenticated && wishlist.length && !merge.isPending) merge.mutate({ productIds: wishlist });
  }, [isAuthenticated, wishlist, merge]);

  const serverIds = (list.data ?? []) as string[];
  const ids = useMemo(() => isAuthenticated ? Array.from(new Set([...wishlist, ...serverIds])) : wishlist, [isAuthenticated, serverIds, wishlist]);
  const items = wishlistProducts(ids);
  const clear = () => items.forEach((item) => {
    if (wishlist.includes(item.id)) toggleWishlist(item.id);
    if (isAuthenticated) setItem.mutate({ productId: item.id, saved: false });
  });

  return <><PageIntro eyebrow="Saved for later" title="Wishlist" body={isAuthenticated ? "This edit merges saved pieces from the browser into your protected demo account." : "Saved pieces remain in this browser until you choose to sign in."} />{items.length ? <><section className="listing-section"><ProductGrid items={items} /></section><div className="wishlist-note"><p>{items.length} saved {items.length === 1 ? "piece" : "pieces"} · {isAuthenticated ? "synced to your demo account" : "stored in this browser"}.</p><button className="plain-link" onClick={clear}>Clear wishlist</button></div></> : <div className="empty-state"><h2>Nothing saved yet.</h2><p>Use the heart on a product card to keep a piece close.</p><Link className="button button--dark" href="/shop">Explore the shop</Link></div>}</>;
}
