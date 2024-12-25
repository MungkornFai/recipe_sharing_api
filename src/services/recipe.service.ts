import { recipes } from "../db/schema/recipes";
import { Recipe } from "../types/recipe";
import { db } from "../db/index";

export async function createRecipe(recipe: Recipe, userId: number) {
  try {
    const newRecipe = await db.insert(recipes).values(recipe).returning();
    return newRecipe[0];
  } catch (error) {
    console.log("Error during recipe creation", error);
    throw error;
  }
}
