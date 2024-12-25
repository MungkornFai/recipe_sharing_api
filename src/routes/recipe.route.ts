import { Router } from "express";
import { handlerRecipeCreate } from "../controllers/recipe.controller";
import { CreateRecipeSchema } from "../schemas/recipe.schema";
import { validate } from "../middlewares/validate";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();

router.post("/",authenticatToken,validate(CreateRecipeSchema,"body"), handlerRecipeCreate);

export default router;