CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "episode" (
	"video_id" text PRIMARY KEY,
	"title" text NOT NULL,
	"published_at" timestamp NOT NULL,
	"thumbnail_url" text NOT NULL,
	"topic" text DEFAULT 'Sustainability' NOT NULL,
	"summary" text,
	"duration" text DEFAULT '—' NOT NULL,
	"position" integer NOT NULL,
	"is_hidden" boolean DEFAULT false NOT NULL,
	"top_featured_position" integer,
	"synced_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "featured_episode" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"video_id" text NOT NULL,
	"eyebrow" text NOT NULL,
	"heading_line" text NOT NULL,
	"heading_accent" text NOT NULL,
	"intro" text NOT NULL,
	"title" text NOT NULL,
	"description" text[] NOT NULL,
	"moderator" text,
	"panelists" text[],
	"quote" text,
	"start_seconds" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "rate_limit" (
	"id" text PRIMARY KEY,
	"key" text NOT NULL UNIQUE,
	"count" integer NOT NULL,
	"last_request" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"hero_title_line1" text NOT NULL,
	"hero_title_accent" text NOT NULL,
	"hero_title_line3" text NOT NULL,
	"hero_subheading" text NOT NULL,
	"hero_description" text NOT NULL,
	"hero_tagline" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"updated_by" text
);
--> statement-breakpoint
CREATE TABLE "sync_state" (
	"id" text PRIMARY KEY DEFAULT 'default',
	"last_synced_at" timestamp,
	"last_error" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"role" text DEFAULT 'admin' NOT NULL,
	"banned" boolean DEFAULT false NOT NULL,
	"ban_reason" text,
	"ban_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "episode_position_idx" ON "episode" ("position");--> statement-breakpoint
CREATE INDEX "episode_top_featured_idx" ON "episode" ("top_featured_position");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "featured_episode" ADD CONSTRAINT "featured_episode_video_id_episode_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "episode"("video_id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "featured_episode" ADD CONSTRAINT "featured_episode_updated_by_user_id_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "site_content" ADD CONSTRAINT "site_content_updated_by_user_id_fkey" FOREIGN KEY ("updated_by") REFERENCES "user"("id") ON DELETE SET NULL;