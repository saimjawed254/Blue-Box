CREATE TABLE "anonymous_visitors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ip" varchar(45) NOT NULL,
	"user_agent" varchar(255),
	"first_seen" timestamp DEFAULT now(),
	"last_seen" timestamp DEFAULT now(),
	"visit_count" integer DEFAULT 1 NOT NULL,
	"country" varchar(100),
	"path" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"cart_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"total_items" integer DEFAULT 0,
	"total_price" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"item_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cart_id" uuid NOT NULL,
	"product_id" varchar(32) NOT NULL,
	"color" varchar(32) NOT NULL,
	"size" varchar(16) NOT NULL,
	"quantity" integer NOT NULL,
	"price_per_unit" integer NOT NULL,
	"subtotal" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_item_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" varchar(32) NOT NULL,
	"color" varchar(32) NOT NULL,
	"size" varchar(16) NOT NULL,
	"quantity" integer NOT NULL,
	"price_per_unit" integer NOT NULL,
	"subtotal" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"cart_id" uuid NOT NULL,
	"total_amount" integer NOT NULL,
	"payment_status" varchar NOT NULL,
	"order_status" varchar DEFAULT 'processing',
	"placed_at" timestamp DEFAULT now(),
	"shipping_address" text NOT NULL,
	"billing_address" text NOT NULL,
	"shipping_method" varchar(100),
	"tracking_id" varchar(100),
	"estimated_delivery" timestamp,
	CONSTRAINT "orders_tracking_id_unique" UNIQUE("tracking_id")
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"color" varchar(64) NOT NULL,
	"images" varchar(512)[] NOT NULL,
	"qty" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_code" varchar(32),
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(64) NOT NULL,
	"brand" varchar(128) NOT NULL,
	"color" varchar(64) NOT NULL,
	"size" varchar(16) NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"mrp" integer NOT NULL,
	"discount" integer NOT NULL,
	"order_count" integer DEFAULT 0 NOT NULL,
	"image_urls" varchar(512)[] NOT NULL,
	"tags" varchar(64)[] NOT NULL,
	"material" varchar(128),
	"dimensions" varchar(128),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"product_id" varchar(32) NOT NULL,
	"order_id" uuid,
	"rating" integer NOT NULL,
	"title" varchar(255),
	"comment" text,
	"created_at" timestamp DEFAULT now(),
	"verified_purchase" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "try_ons" (
	"tryon_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255),
	"product_id" varchar(32) NOT NULL,
	"color" varchar(32),
	"size" varchar(16),
	"image_url" text,
	"device_type" varchar(100),
	"tryon_time" timestamp DEFAULT now(),
	"result_saved" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" varchar(64) NOT NULL,
	"email" varchar(255),
	"phone" varchar(20),
	"name" varchar(100) NOT NULL,
	"avatar_url" text,
	"gender" varchar(10),
	"coordinate_X" numeric,
	"coordinate_Y" numeric,
	"address" text,
	"tryons_used" integer DEFAULT 0 NOT NULL,
	"total_logins" integer DEFAULT 1 NOT NULL,
	"last_login_ip" varchar(45),
	"last_login_at" timestamp DEFAULT now(),
	"ip_addresses" varchar(45)[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "try_ons" ADD CONSTRAINT "try_ons_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "try_ons" ADD CONSTRAINT "try_ons_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;