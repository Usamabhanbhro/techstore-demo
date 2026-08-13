import { index, int, json, mysqlEnum, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  phone: varchar("phone", { length: 32 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const customerAddresses = mysqlTable("customer_addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  label: varchar("label", { length: 64 }).notNull(),
  recipient: varchar("recipient", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  line1: varchar("line1", { length: 240 }).notNull(),
  line2: varchar("line2", { length: 240 }),
  city: varchar("city", { length: 96 }).notNull(),
  postalCode: varchar("postalCode", { length: 24 }),
  country: varchar("country", { length: 64 }).default("Pakistan").notNull(),
  isDefault: int("isDefault").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [index("address_user_idx").on(table.userId)]);

export const catalogProducts = mysqlTable("catalog_products", {
  id: int("id").autoincrement().primaryKey(),
  productKey: varchar("productKey", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 160 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 96 }).notNull(),
  collectionSlug: varchar("collectionSlug", { length: 96 }).notNull(),
  pricePkr: int("pricePkr").notNull(),
  stock: int("stock").notNull().default(0),
  status: mysqlEnum("status", ["active", "draft", "archived"]).default("active").notNull(),
  payload: json("payload").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("catalog_product_key_unique").on(table.productKey), uniqueIndex("catalog_product_slug_unique").on(table.slug), index("catalog_product_collection_idx").on(table.collectionSlug)]);

export const catalogCollections = mysqlTable("catalog_collections", {
  id: int("id").autoincrement().primaryKey(),
  collectionKey: varchar("collectionKey", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 96 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  status: mysqlEnum("status", ["active", "draft", "archived"]).default("active").notNull(),
  payload: json("payload").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("catalog_collection_key_unique").on(table.collectionKey), uniqueIndex("catalog_collection_slug_unique").on(table.slug)]);

export const wishlistItems = mysqlTable("wishlist_items", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productKey: varchar("productKey", { length: 80 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [uniqueIndex("wishlist_user_product_unique").on(table.userId, table.productKey), index("wishlist_user_idx").on(table.userId)]);

export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 48 }).notNull(),
  userId: int("userId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  currency: varchar("currency", { length: 8 }).default("PKR").notNull(),
  subtotalPkr: int("subtotalPkr").notNull(),
  shippingPkr: int("shippingPkr").notNull(),
  discountPkr: int("discountPkr").default(0).notNull(),
  totalPkr: int("totalPkr").notNull(),
  fulfillmentStatus: mysqlEnum("fulfillmentStatus", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "initiated", "successful", "failed", "cancelled"]).default("pending").notNull(),
  demoMode: int("demoMode").default(1).notNull(),
  shippingAddress: json("shippingAddress").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("order_number_unique").on(table.orderNumber), index("order_user_idx").on(table.userId)]);

export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productKey: varchar("productKey", { length: 80 }).notNull(),
  productName: varchar("productName", { length: 200 }).notNull(),
  variant: varchar("variant", { length: 96 }),
  quantity: int("quantity").notNull(),
  unitPricePkr: int("unitPricePkr").notNull(),
  imageUrl: varchar("imageUrl", { length: 520 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [index("order_item_order_idx").on(table.orderId)]);

export const paymentAttempts = mysqlTable("payment_attempts", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  provider: mysqlEnum("provider", ["jazzcash", "easypaisa", "sadapay", "nayapay", "bank-transfer", "cod"]).notNull(),
  amountPkr: int("amountPkr").notNull(),
  status: mysqlEnum("status", ["pending", "initiated", "successful", "failed", "cancelled"]).default("pending").notNull(),
  referenceId: varchar("referenceId", { length: 96 }).notNull(),
  providerMetadata: json("providerMetadata").notNull(),
  idempotencyKey: varchar("idempotencyKey", { length: 96 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => [uniqueIndex("payment_idempotency_unique").on(table.idempotencyKey), uniqueIndex("payment_reference_unique").on(table.referenceId), index("payment_order_idx").on(table.orderId)]);

export const paymentWebhookEvents = mysqlTable("payment_webhook_events", {
  id: int("id").autoincrement().primaryKey(),
  provider: varchar("provider", { length: 48 }).notNull(),
  eventKey: varchar("eventKey", { length: 128 }).notNull(),
  status: mysqlEnum("status", ["received", "processed", "ignored", "failed"]).default("received").notNull(),
  payload: json("payload").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [uniqueIndex("payment_webhook_event_unique").on(table.provider, table.eventKey)]);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
