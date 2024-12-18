import { Router, Request, Response } from "express";
import { userHandleGet, userHandlerPost } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, Query } from "../schemas/user.schema";

const router = Router();

router.get("/", validate(Query, "query"), userHandleGet);
router.post("/signup", validate(CreateUserSchema, "body"), userHandlerPost);

export default router;
