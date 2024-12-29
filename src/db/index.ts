import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { comments, recipes } from "./schema/recipes";
import { users } from "./schema/users";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    recipes,
    users,
    comments
  },
});

