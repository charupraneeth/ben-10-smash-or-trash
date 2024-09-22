import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// You can optionally pass in the event to useRuntimeConfig
// import { H3Event } from "h3";

export const useDrizzle = () => {
  const { turso } = useRuntimeConfig(/* event */);

  const tursoClient = createClient({
    url: turso.databaseUrl,
    authToken: turso.authToken,
  });
  return drizzle(tursoClient);
};
