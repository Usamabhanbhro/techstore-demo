import { Route, Router as WouterRouter, Switch } from "wouter";
import { CommerceProvider } from "@/lib/commerce";
import { StorefrontLayout } from "@/components/Storefront";
import { SeoMeta } from "@/components/SeoMeta";
import Home from "@/pages/Home";
import AppleRoutePage from "@/pages/AppleRoutePage";
import { AboutPage, AccountPage, ArticlePage, CartPage, CheckoutPage, CollectionsPage, ComparePage, ConfirmationPage, ContactPage, JournalPage, NotFoundPage, PrivacyPage, ProductPage, SearchPage, ShopPage, TermsPage } from "@/pages/CommercePages";
import { AccountPortalPage, HybridWishlistPage } from "@/pages/AccountPortal";

function Router() { return <Switch>
  <Route path="/" component={Home} />
  <Route path="/shop" component={() => <ShopPage />} />
  <Route path="/collections" component={CollectionsPage} />
  <Route path="/collections/:slug" component={({ params }) => <ShopPage collectionSlug={params.slug} />} />
  <Route path="/products/:slug" component={ProductPage} />
  <Route path="/compare" component={ComparePage} />
  <Route path="/search" component={SearchPage} />
  <Route path="/cart" component={CartPage} />
  <Route path="/checkout" component={CheckoutPage} />
  <Route path="/order-confirmation" component={ConfirmationPage} />
  <Route path="/account" component={AccountPortalPage} />
  <Route path="/wishlist" component={HybridWishlistPage} />
  <Route path="/journal" component={JournalPage} />
  <Route path="/journal/:slug" component={ArticlePage} />
  <Route path="/about" component={AboutPage} />
  <Route path="/contact" component={ContactPage} />
  <Route path="/privacy" component={PrivacyPage} />
  <Route path="/terms" component={TermsPage} />
  <Route path="/us/shop/goto/store" component={() => <ShopPage />} />
  <Route path="/us/shop/goto/accessories" component={() => <ShopPage collectionSlug="accessories" />} />
  <Route path="/us/shop/goto/buy_accessories" component={() => <ShopPage collectionSlug="accessories" />} />
  <Route path="/us/shop/goto/bag" component={CartPage} />
  <Route path="/us/search" component={SearchPage} />
  <Route path="/*" component={AppleRoutePage} />
  <Route component={NotFoundPage} />
</Switch>; }

const routerBase = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() { return <CommerceProvider><WouterRouter base={routerBase}><SeoMeta /><StorefrontLayout><Router /></StorefrontLayout></WouterRouter></CommerceProvider>; }
