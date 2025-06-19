ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "try_ons" DROP CONSTRAINT "try_ons_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("clerk_id");--> statement-breakpoint
ALTER TABLE "cart" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "try_ons" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "wishlist" ADD COLUMN "clerk_id" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_clerk_id_users_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_clerk_id_users_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_clerk_id_users_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "try_ons" ADD CONSTRAINT "try_ons_clerk_id_users_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_clerk_id_users_clerk_id_fk" FOREIGN KEY ("clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "reviews" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "try_ons" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "wishlist" DROP COLUMN "user_id";