CREATE TABLE `catalog_collections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`collectionKey` varchar(80) NOT NULL,
	`slug` varchar(96) NOT NULL,
	`name` varchar(160) NOT NULL,
	`status` enum('active','draft','archived') NOT NULL DEFAULT 'active',
	`payload` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_collections_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalog_collection_key_unique` UNIQUE(`collectionKey`),
	CONSTRAINT `catalog_collection_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `catalog_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productKey` varchar(80) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`name` varchar(200) NOT NULL,
	`category` varchar(96) NOT NULL,
	`collectionSlug` varchar(96) NOT NULL,
	`pricePkr` int NOT NULL,
	`stock` int NOT NULL DEFAULT 0,
	`status` enum('active','draft','archived') NOT NULL DEFAULT 'active',
	`payload` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalog_product_key_unique` UNIQUE(`productKey`),
	CONSTRAINT `catalog_product_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `customer_addresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(64) NOT NULL,
	`recipient` varchar(160) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`line1` varchar(240) NOT NULL,
	`line2` varchar(240),
	`city` varchar(96) NOT NULL,
	`postalCode` varchar(24),
	`country` varchar(64) NOT NULL DEFAULT 'Pakistan',
	`isDefault` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `customer_addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`productKey` varchar(80) NOT NULL,
	`productName` varchar(200) NOT NULL,
	`variant` varchar(96),
	`quantity` int NOT NULL,
	`unitPricePkr` int NOT NULL,
	`imageUrl` varchar(520),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `order_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderNumber` varchar(48) NOT NULL,
	`userId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`currency` varchar(8) NOT NULL DEFAULT 'PKR',
	`subtotalPkr` int NOT NULL,
	`shippingPkr` int NOT NULL,
	`discountPkr` int NOT NULL DEFAULT 0,
	`totalPkr` int NOT NULL,
	`fulfillmentStatus` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
	`paymentStatus` enum('pending','initiated','successful','failed','cancelled') NOT NULL DEFAULT 'pending',
	`demoMode` int NOT NULL DEFAULT 1,
	`shippingAddress` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `order_number_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `payment_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`provider` enum('jazzcash','easypaisa','sadapay','nayapay','bank-transfer','cod') NOT NULL,
	`amountPkr` int NOT NULL,
	`status` enum('pending','initiated','successful','failed','cancelled') NOT NULL DEFAULT 'pending',
	`referenceId` varchar(96) NOT NULL,
	`providerMetadata` json NOT NULL,
	`idempotencyKey` varchar(96) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `payment_attempts_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_idempotency_unique` UNIQUE(`idempotencyKey`),
	CONSTRAINT `payment_reference_unique` UNIQUE(`referenceId`)
);
--> statement-breakpoint
CREATE TABLE `payment_webhook_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provider` varchar(48) NOT NULL,
	`eventKey` varchar(128) NOT NULL,
	`status` enum('received','processed','ignored','failed') NOT NULL DEFAULT 'received',
	`payload` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `payment_webhook_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_webhook_event_unique` UNIQUE(`provider`,`eventKey`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`phone` varchar(32),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `wishlist_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productKey` varchar(80) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wishlist_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `wishlist_user_product_unique` UNIQUE(`userId`,`productKey`)
);
--> statement-breakpoint
CREATE INDEX `catalog_product_collection_idx` ON `catalog_products` (`collectionSlug`);--> statement-breakpoint
CREATE INDEX `address_user_idx` ON `customer_addresses` (`userId`);--> statement-breakpoint
CREATE INDEX `order_item_order_idx` ON `order_items` (`orderId`);--> statement-breakpoint
CREATE INDEX `order_user_idx` ON `orders` (`userId`);--> statement-breakpoint
CREATE INDEX `payment_order_idx` ON `payment_attempts` (`orderId`);--> statement-breakpoint
CREATE INDEX `wishlist_user_idx` ON `wishlist_items` (`userId`);