import { Router, Request, Response } from "express";
import { userHanlderPost } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema } from "../schemas/user.schema";

const router = Router();

router.post("/signup",validate(CreateUserSchema, "body"), userHanlderPost);

export default router;
