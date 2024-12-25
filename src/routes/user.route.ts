import { Router, Request, Response } from "express";
import {
  userHandleGet,
  createUserHandler,
  userHandleGetUserProfile,
  userHandlerUserUpdate,
  userHandlerUserSignIn,
  userHandlerDeleteUser,
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, UserModificationSchema, UserSignInSchema } from "../schemas/user.schema";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();

router.get("/", userHandleGet);
router.get("/profile",authenticatToken, userHandleGetUserProfile);
router.put("/:id", userHandlerUserUpdate);
router.post("/signup", validate(CreateUserSchema,"body"), createUserHandler);
router.post("/signin", validate(UserSignInSchema,"body"), userHandlerUserSignIn);
router.delete("/:id", userHandlerDeleteUser);

export default router;
