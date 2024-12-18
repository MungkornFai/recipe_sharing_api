import { Router, Request, Response } from "express";
import {
  userHandleGet,
  userHandlerPost,
  userHandleGetUserById,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, Query } from "../schemas/user.schema";

const router = Router();

router.get("/", userHandleGet);
router.get("/:id", userHandleGetUserById);
router.post("/signup", validate(CreateUserSchema, "body"), userHandlerPost);

export default router;
