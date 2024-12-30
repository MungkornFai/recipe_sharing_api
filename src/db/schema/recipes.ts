import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { timestamps } from "../lib/colums.helpers";
import { users } from "./users";
import { relations } from "drizzle-orm";


export const recipes = pgTable("recipes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  ingredients: jsonb("ingredients").notNull(), // Store ingredients as JSON array
  steps: jsonb("steps").notNull(), // Store steps as JSON array
  instructions: text("instructions").notNull(),
  photos: jsonb("photos"),
  userId: integer("user_id").references(() => users.id, {onDelete: "cascade"}), // Delete recipes when user is deleted
  ...timestamps,
});

export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  comment: text("comment").notNull(),
  recipeId: integer("recipe_id").references(() => recipes.id, { onDelete: "cascade" }), // Delete comments when recipe is deleted
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }), // Delete comments when user is deleted
  ...timestamps,
});

export const commentRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.recipeId],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));


export const ratings = pgTable("ratings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  rating: integer("rating").notNull(),
  recipeId: integer("recipe_id").references(() => recipes.id),
  userId: integer("user_id").references(() => users.id),
  ...timestamps,
})

export const favorites = pgTable("favorites", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  recipeId: integer("recipe_id").references(() => recipes.id, { onDelete: "cascade" }), // Delete favorites when recipe is deleted
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }), // Delete favorites when user is deleted
  ...timestamps,
})

export const follows = pgTable("follows", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  followerId: integer("follower_id").references(() => users.id, { onDelete: "cascade" }), // Delete follows when user is deleted
  followeeId: integer("following_id").references(() => users.id, { onDelete: "cascade" }), // Delete follows when user is deleted
  ...timestamps,
})