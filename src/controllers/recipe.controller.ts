import type { Request, Response, NextFunction } from "express";

import { Recipe, TQuery, TComment, TRecipeParams, TRating, TUserParams, TFollower } from "../types/recipe";
import { sendError, sendSuccess } from "../lib/response";
import { db } from "../db";
import { recipes, comments, commentRelations, ratings, favorites, follows } from "../db/schema/recipes";
import { eq, like, and, relations } from "drizzle-orm";
import { d } from "drizzle-kit/index-Z-1TKnbX";
import { users } from "../db/schema/users";

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
        userId: req.user?.userId,
      })
      .returning();
    sendSuccess(res, "Recipe created successfully", newRecipe, 201);
  } catch (error) {
    next(error);
  }
}

export async function handlerRecipeGetAll(req: Request, res: Response, next: NextFunction) {
  try {
    const recipe = await db.select().from(recipes);
    sendSuccess(res, "Recipes fetched successfully", recipe, 200);
  } catch (error) {
    next(error);
  }
}

// function handler for getting a recipe by id
export async function handlerRecipeGetById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user || !req.user.userId) {
      sendError(res, "Unauthorized: user needs to sign in first", 403);
      return;
    }
    // Convert req.params.id to a number
    const recipeId = parseInt(req.params.id, 10);
    if (isNaN(recipeId)) {
      sendError(res, "Invalid recipe ID", 400);
      return;
    }
    const recipe = await db.select().from(recipes).where(eq(recipes.id, recipeId));
    if (!recipe) {
      sendError(res, "Recipe not found", 404);
      return;
    }

    sendSuccess(res, "Recipe fetched successfully", recipe, 200);
  } catch (error) {
    next(error);
  }
}
// function handler for searching recipes
export async function handleSearchRecipe(
  req: Request<{}, {}, {}, TQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    const { title } = req.query;
    let query = db.select().from(recipes);
    if (title) {
      query = query.where(like(recipes.title, `%${title}%`)) as any;
    }
    const recipesResult = await query;
    sendSuccess(res, "Recipes fetched successfully", recipesResult, 200);
  } catch (error) {
    next(error);
  }
}
// function handler for creating a comment
export async function handlerRecipeComment(
  req: Request<TRecipeParams, {}, TComment>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const recipeId = req.params.id;
  try {
    if (isNaN(parseInt(recipeId))) {
      sendError(res, "Invalid recipe ID", 400);
      return;
    }
    const newComment = await db
      .insert(comments)
      .values({
        comment: body.comment,
        recipeId: parseInt(recipeId),
        userId: req.user.userId,
      })
      .returning();
    sendSuccess(res, "Comment created successfully", newComment, 201);
  } catch (error) {
    next(error);
  }
}

// Add a handler for creating a rating for a recipe
export async function handlerRecipeRating(
  req: Request<TRecipeParams, {}, TRating>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const recipeId = req.params.id;
  try {
    const newRate = await db
      .insert(ratings)
      .values({
        rating: body.rating,
        recipeId: parseInt(recipeId),
        userId: req.user.userId,
      })
      .returning();

    sendSuccess(res, "Rate created successfully", newRate, 201);
  } catch (error) {
    next(error);
  }
}

// function haddler for saving a recipe as favorite

export async function handlerSaveToFavorite(
  req: Request<TRecipeParams>,
  res: Response,
  next: NextFunction
) {
  const recipeId = parseInt(req.params.id);
  try {
    if (isNaN(recipeId)) {
      sendError(res, "Invalid recipe ID", 400);
    }
    // const existingRecipe = await db.select().from(recipes).where(eq(recipes.id, recipeId));
    // if (!existingRecipe) {
    //   sendError(res, "Recipe not found", 404);
    //   return;
    // }
    // const existingFavorite = await db
    //   .select()
    //   .from(favorites)
    //   .where(eq(favorites.recipeId, recipeId));
    // if (existingFavorite) {
    //   sendError(res, "Recipe already saved to favorite", 400);
    //   return;
    // }
    const newFavorite = await db
      .insert(favorites)
      .values({
        recipeId: recipeId,
        userId: req.user.userId,
      })
      .returning();
    sendSuccess(res, "Recipe saved to favorite successfully", newFavorite, 201);
  } catch (error) {
    next(error);
  }
}


