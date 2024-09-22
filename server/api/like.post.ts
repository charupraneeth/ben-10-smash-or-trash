import { likeTable } from "../database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDrizzle();
  await db
    .insert(likeTable)
    .values({ id: crypto.randomUUID(), alien_id: body?.id })
    .execute();

  setResponseStatus(event, 202);
});
