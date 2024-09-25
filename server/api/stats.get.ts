import { likeTable } from "../database/schema";
import aliens from "../../assets/aliens.json";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const response = await db
    .select({
      alienId: likeTable.alien_id,
      likeCount: sql`COUNT(${likeTable.alien_id})`.as("likeCount"),
    })
    .from(likeTable)
    .groupBy(likeTable.alien_id)
    .orderBy(sql`likeCount DESC`)
    .limit(10);

  return response.map(({ likeCount, alienId }) => {
    const alien = aliens.find((alien) => alien.id === alienId);
    return { alien, likeCount };
  });
});
