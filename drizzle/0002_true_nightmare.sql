ALTER TABLE "orders" DROP CONSTRAINT "orders_cart_id_cart_cart_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "price_per_unit";--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN "subtotal";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "cart_id";