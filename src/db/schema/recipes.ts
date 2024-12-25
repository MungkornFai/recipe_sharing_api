import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { timestamps } from "../lib/colums.helpers";
import { users } from "./users";

export const recipes = pgTable("recipes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  ingredients: jsonb("ingredients").notNull(), // Store ingredients as JSON array
  steps: jsonb("steps").notNull(), // Store steps as JSON array
  instructions: text("instructions").notNull(),
  photos: jsonb("photos"),
  userId: integer("user_id").references(() => users.id), // Store photos as JSON array
  ...timestamps,
});
