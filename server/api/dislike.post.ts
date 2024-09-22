import { dislikeTable } from "../database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = useDrizzle();
  await db
    .insert(dislikeTable)
    .values({ id: crypto.randomUUID(), alien_id: body?.id })
    .execute();

  setResponseStatus(event, 202);
});
