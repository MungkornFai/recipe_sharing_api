import { Router, Request, Response } from "express";
import {
  userHandleGet,
  userHandlerPost,
  userHandleGetUserProfile,
  userHandlerUserUpdate,
  userHandlerUserSignIn,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, UserModificationSchema, UserSignInSchema } from "../schemas/user.schema";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();

router.get("/", userHandleGet);
router.get("/profile",authenticatToken, userHandleGetUserProfile);
router.patch("/:id", validate(UserModificationSchema, "body"), userHandlerUserUpdate);
router.post("/signup", validate(CreateUserSchema, "body"), userHandlerPost);
router.post("/signin", validate(UserSignInSchema, "body"), userHandlerUserSignIn);

export default router;
