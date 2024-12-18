import { Router, Request, Response } from "express";
import {
  userHandleGet,
  userHandlerPost,
  userHandleGetUserById,
  userHandlerUserUpdate
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema,UserModificationSchema, Query } from "../schemas/user.schema";

const router = Router();

router.get("/", userHandleGet);
router.get("/:id", userHandleGetUserById);
router.patch("/:id", validate(UserModificationSchema, "body"), userHandlerUserUpdate);
router.post("/signup", validate(CreateUserSchema, "body"), userHandlerPost);

export default router;
