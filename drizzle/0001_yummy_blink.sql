CREATE TABLE `saved_cart_lines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productKey` varchar(80) NOT NULL,
	`variantKey` varchar(96) NOT NULL DEFAULT '',
	`quantity` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `saved_cart_lines_id` PRIMARY KEY(`id`),
	CONSTRAINT `saved_cart_user_product_variant_unique` UNIQUE(`userId`,`productKey`,`variantKey`)
);
--> statement-breakpoint
CREATE INDEX `saved_cart_user_idx` ON `saved_cart_lines` (`userId`);