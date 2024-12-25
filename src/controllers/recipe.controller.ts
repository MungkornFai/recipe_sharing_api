import type { Request, Response, NextFunction } from "express";

import { Recipe } from "../types/recipe";
import { createRecipe } from "../services/recipe.service";
import { sendSuccess } from "../lib/response";
import { db } from "../db";
import { recipes } from "../db/schema/recipes";

export async function handlerRecipeCreate(
  req: Request<{}, {}, Recipe>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const newRecipe = await db
      .insert(recipes)
      .values({
        ...body,
        userId: req.userId?.userId,
      })
      .returning();
    sendSuccess(res, "Recipe created successfully", newRecipe, 201);
  } catch (error) {
    next(error);
  }
}
