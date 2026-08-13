export const PAYMENT_MODE = "mock" as const;

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";
export type ProductFlag = "featured" | "new-arrival" | "best-seller" | "editorial" | "giftable";
export type PaymentMethod = "jazzcash" | "easypaisa" | "sadapay" | "nayapay" | "bank-transfer" | "cod";
export type PaymentStatus = "pending" | "initiated" | "successful" | "failed" | "cancelled";

export type ProductVariant = {
  id: string;
  label: "Colour" | "Size" | "Finish" | "Material";
  value: string;
  available: boolean;
  stock: number;
};

export type ProductMedia = {
  id: string;
  src: string;
  alt: string;
  kind: "product" | "detail" | "editorial";
};

export type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  pricePkr: number;
  compareAtPricePkr?: number;
  currency: "PKR";
  category: string;
  collectionSlugs: string[];
  materials: string[];
  colours: string[];
  sizes: string[];
  stock: number;
  stockStatus: StockStatus;
  rating: number;
  reviewCount: number;
  details: string[];
  care: string;
  variants: ProductVariant[];
  media: ProductMedia[];
  flags: ProductFlag[];
  tags: string[];
  relatedProductIds: string[];
};

export type CollectionRecord = {
  id: string;
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  category: string;
  image: ProductMedia;
  featuredProductIds: string[];
};

export type AddressInput = {
  label: string;
  recipient: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode?: string;
  country: "Pakistan";
};

export type OrderLineInput = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type PaymentIntentInput = {
  orderId: string;
  amountPkr: number;
  method: PaymentMethod;
  idempotencyKey: string;
  demoOutcome?: "success" | "failure" | "pending" | "cancelled";
};

export type PaymentIntentResult = {
  status: PaymentStatus;
  referenceId: string;
  message: string;
  providerMetadata: Record<string, string>;
};
