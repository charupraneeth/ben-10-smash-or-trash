CREATE TABLE `dislike` (
	`id` text NOT NULL,
	`alien_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `like` (
	`id` text NOT NULL,
	`alien_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dislike_id_unique` ON `dislike` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `like_id_unique` ON `like` (`id`);