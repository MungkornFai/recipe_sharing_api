import { Router } from "express";
import {
  handlerRecipeCreate,
  handlerRecipeGetAll,
  handlerRecipeGetById,
  handleSearchRecipe,
  handlerRecipeComment,
  handlerRecipeRating,
  handlerSaveToFavorite,
} from "../controllers/recipe.controller";
import {
  CreateRecipeSchema,
  CommentSchema,
  RatingSchema,
  FavoriteIdParamsSchema,
} from "../schemas/recipe.schema";
import { validate } from "../middlewares/validate";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();

// public routes
router.get("/recipes/search", handleSearchRecipe); // public route for searching recipes


// protected routes
router.get("/recipes", authenticatToken, handlerRecipeGetAll); // get all recipes for specific user
router.post("/recipes",authenticatToken,validate(CreateRecipeSchema, "body"),handlerRecipeCreate);
router.get("/recipes/:id", authenticatToken, handlerRecipeGetById);
router.post("/recipes/:id/comment",authenticatToken,validate(CommentSchema, "body"),handlerRecipeComment);
router.post("/recipes/:id/rating",authenticatToken,validate(RatingSchema, "body"),handlerRecipeRating);
router.post("/recipes/:id/favorite",authenticatToken,validate(FavoriteIdParamsSchema, "params"),handlerSaveToFavorite);

export default router;
