import { NextFunction, Request, Response } from "express";
import { UserSignUp, Query, UserModification, UserSignIn, IdParam } from "../types/user";
import { deleteUserById, signUp } from "../services/user.service";
import { getUserById, getUsers, signIn, updateUser } from "../services/user.service";
import { decodeToken } from "../lib/session.token";
import { sendError, sendSuccess } from "../lib/response";

// route handlers for creating user
export async function createUserHandler(
  req: Request<{}, {}, UserSignUp>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const user = await signUp(body);
    res.status(201).json({ message: "User registered successfully", user });
    return;
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }
    res.status(500).json({
      message: "Server error",
    });
  }
}

// route handlers for retrieving users
export async function userHandleGet(req: Request<{}, {}, {}, Query>, res: Response) {
  const { filter, values } = req.query;
  try {
    if (filter && values) {
      const users = await getUsers(filter, values);
      res.status(200).json({ message: "Users fetched successfully", data: users });
      return;
    }
    const users = await getUsers();
    sendSuccess(res, "Users fetched successfully", users, 200);
  } catch (error) {
    sendError(res, "Error fetching users", 500, error);
  }
}

// route handlers for retrieving users by id

export async function userHandleGetUserProfile(req: Request, res: Response) {
  const token = req.cookies.token;
  const payload = decodeToken(token);
  const { userId } = payload;
  try {
    const user = await getUserById(userId);
    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }
    sendSuccess(res, "User fetched successfully", user, 200);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

// route handlers for updating user by id

export async function userHandlerUserUpdate(
  req: Request<IdParam, {}, UserModification>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const userId = req.params.id;
  try {
    if (isNaN(userId)) {
      sendError(res, "Invalid user id", 400);
      return;
    }

    const updatedUser = await updateUser(userId, body);
    if (!updatedUser) {
      sendError(res, "User not found", 404);
      return;
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
}

// route handlers for user sign in

export async function userHandlerUserSignIn(
  req: Request<{}, {}, UserSignIn>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const user = await signIn(body);
    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 360000,
    });
    sendSuccess(res, "User signed in successfully", user, 201);
  } catch (error: any) {
    if (error instanceof Error) {
      next(error);
    }
    next(error);
  }
}

export async function userHandlerDeleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const parsedId = parseInt(id);
  try {
    const user = await deleteUserById(parsedId);
    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }
    sendSuccess(res, "User deleted successfully", user, 200);
  } catch (error) {
    next(error);
  }
}
