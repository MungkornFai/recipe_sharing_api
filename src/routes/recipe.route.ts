import { Router } from "express";
import { handlerRecipeCreate, handlerRecipeGetAll,handlerRecipeGetById,handleSearchRecipe,handlerRecipeComment } from "../controllers/recipe.controller";
import { CreateRecipeSchema } from "../schemas/recipe.schema";
import { validate } from "../middlewares/validate";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();

// public routes
router.get("/recipes/search", handleSearchRecipe); // public route for searching recipes

// protected routes
router.get("/recipes",authenticatToken,  handlerRecipeGetAll); // get all recipes for specific user
router.post("/recipes", authenticatToken, validate(CreateRecipeSchema, "body"), handlerRecipeCreate);
router.get("/recipes/:id", authenticatToken, handlerRecipeGetById);
router.post("/recipes/:id/comment", authenticatToken, handlerRecipeComment);



export default router;
