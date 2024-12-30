import { Router, Request, Response } from "express";
import {
  userHandleGet,
  createUserHandler,
  userHandleGetUserProfile,
  userHandlerUserUpdate,
  userHandlerUserSignIn,
  userHandlerDeleteUser,
  handlerUserFollow
} from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, UserModificationSchema, UserSignInSchema } from "../schemas/user.schema";
import { authenticatToken } from "../middlewares/validate.user.token";

const router = Router();
// public routes
router.get("/", userHandleGet);
router.post("/signup", validate(CreateUserSchema,"body"), createUserHandler);
router.post("/signin", validate(UserSignInSchema,"body"), userHandlerUserSignIn);

// protected routes
router.get("/profile",authenticatToken, userHandleGetUserProfile);
router.put("/:id",authenticatToken, userHandlerUserUpdate);
router.delete("/:id", authenticatToken, userHandlerDeleteUser);
router.post("/:followeeId/follow", authenticatToken, handlerUserFollow);

export default router;
