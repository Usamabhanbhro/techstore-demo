import { z } from "zod";
import { COOKIE_NAME } from "../shared/const";
import { CatalogService } from "./services/catalogService";
import { AccountService, CartService, CollectionService, OrderService, PaymentService, ProductService, WishlistService } from "./services/commerceServiceBoundaries";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

const paymentMethodSchema = z.enum(["jazzcash", "easypaisa", "sadapay", "nayapay", "bank-transfer", "cod"]);
const addressSchema = z.object({
  label: z.string().trim().min(1).max(64),
  recipient: z.string().trim().min(2).max(160),
  phone: z.string().trim().min(7).max(32),
  line1: z.string().trim().min(4).max(240),
  line2: z.string().trim().max(240).optional(),
  city: z.string().trim().min(2).max(96),
  postalCode: z.string().trim().max(24).optional(),
  country: z.literal("Pakistan"),
});

const orderLineSchema = z.object({
  productId: z.string().trim().min(1).max(80),
  variantId: z.string().trim().max(96).optional(),
  quantity: z.number().int().min(1).max(20),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    profile: protectedProcedure.query(({ ctx }) => ({
      id: ctx.user.id,
      name: ctx.user.name,
      email: ctx.user.email,
      phone: ctx.user.phone ?? null,
      role: ctx.user.role,
    })),
  }),
  catalog: router({
    products: publicProcedure.input(z.object({
      query: z.string().trim().max(120).optional(),
      collection: z.string().trim().max(96).optional(),
      category: z.string().trim().max(96).optional(),
      availability: z.enum(["in-stock", "low-stock"]).optional(),
      sort: z.enum(["featured", "newest", "price-low", "price-high"]).optional(),
    }).optional()).query(({ input }) => ProductService.list(input)),
    product: publicProcedure.input(z.object({ slug: z.string().trim().min(1).max(160) })).query(({ input }) => ProductService.getBySlug(input.slug)),
    collections: publicProcedure.query(() => CollectionService.list()),
    collection: publicProcedure.input(z.object({ slug: z.string().trim().min(1).max(96) })).query(({ input }) => CollectionService.getBySlug(input.slug)),
  }),
  account: router({
    addresses: protectedProcedure.query(({ ctx }) => AccountService.listAddresses(ctx.user.id)),
    saveAddress: protectedProcedure.input(addressSchema).mutation(({ ctx, input }) => AccountService.saveAddress(ctx.user.id, input)),
  }),
  cart: router({
    list: protectedProcedure.query(({ ctx }) => CartService.list(ctx.user.id)),
    replace: protectedProcedure.input(z.object({ lines: z.array(orderLineSchema).max(30) })).mutation(({ ctx, input }) => CartService.replace(ctx.user.id, input.lines)),
  }),
  wishlist: router({
    list: protectedProcedure.query(({ ctx }) => WishlistService.list(ctx.user.id)),
    merge: protectedProcedure.input(z.object({ productIds: z.array(z.string().trim().min(1).max(80)).max(100) })).mutation(({ ctx, input }) => WishlistService.merge(ctx.user.id, input.productIds)),
    set: protectedProcedure.input(z.object({ productId: z.string().trim().min(1).max(80), saved: z.boolean() })).mutation(({ ctx, input }) => WishlistService.setItem(ctx.user.id, input.productId, input.saved)),
  }),
  orders: router({
    list: protectedProcedure.query(({ ctx }) => OrderService.list(ctx.user.id)),
    detail: protectedProcedure.input(z.object({ orderId: z.string().trim().min(1).max(48) })).query(({ ctx, input }) => OrderService.getDetail(ctx.user.id, input.orderId)),
    create: protectedProcedure.input(z.object({ lines: z.array(orderLineSchema).min(1).max(30), address: addressSchema })).mutation(({ ctx, input }) => {
      if (!ctx.user.email) throw new Error("A verified account email is required before creating an order.");
      return OrderService.create(ctx.user.id, ctx.user.email, input.lines, input.address);
    }),
  }),
  payments: router({
    create: protectedProcedure.input(z.object({
      orderId: z.string().trim().min(1).max(48),
      method: paymentMethodSchema,
      idempotencyKey: z.string().uuid(),
      demoOutcome: z.enum(["success", "failure", "pending", "cancelled"]).optional(),
    })).mutation(({ ctx, input }) => PaymentService.create(ctx.user.id, input)),
  }),
});

export type AppRouter = typeof appRouter;
