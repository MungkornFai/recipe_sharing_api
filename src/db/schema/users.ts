import { pgTable, text, varchar, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { timestamps } from "../lib/colums.helpers";
import { relations } from "drizzle-orm";
import { recipes } from "./recipes";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  isVerify: boolean("verify").default(false).notNull(),
  confirmToken: text("confirm_token").notNull(),
  ...timestamps,
});

const userRelations = relations(users, ({ many }) => ({
  recipes: many(recipes)
}))