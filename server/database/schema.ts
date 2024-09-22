import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const likeTable = sqliteTable("like", {
  id: text("id").notNull().unique(),
  alien_id: text("alien_id").notNull(),
});

export const dislikeTable = sqliteTable("dislike", {
  id: text("id").notNull().unique(),
  alien_id: text("alien_id").notNull(),
});
