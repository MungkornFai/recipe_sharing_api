import { NextFunction, Request, Response } from "express";
import { UserSignUp } from "../types/user";
import { signUp } from "../services/user.service";

async function userHanlderPost(
  req: Request<{}, {}, UserSignUp>,
  res: Response
) {
res.send("user route")
}

export { userHanlderPost };                                                                                             
