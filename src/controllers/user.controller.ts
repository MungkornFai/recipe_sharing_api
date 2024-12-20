import { NextFunction, Request, Response } from "express";
import { UserSignUp, Query, UserModification, UserSignIn } from "../types/user";
import { signUp } from "../services/user.service";
import { getUserById, getUsers, signIn, updateUser } from "../services/user.service";
import jwt from "jsonwebtoken";
import { decodeToken } from "../lib/session.token";

// route handlers for creating user
export async function userHandlerPost(
  req: Request<{}, {}, UserSignUp>,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  try {
    const user = await signUp(body);
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
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
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
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
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

// route handlers for updating user by id

export async function userHandlerUserUpdate(
  req: Request<{ id: number }, {}, UserModification>,
  res: Response
) {
  const body = req.body;
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const updatedUser = await updateUser(id, body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}

// route handlers for user sign in

export async function userHandlerUserSignIn(req: Request<{}, {}, UserSignIn>, res: Response) {
  const body = req.body;
  try {
    const user = await signIn(body);
    if (!user) {
      res.status(404).json({
        message: "Failed to sign in",
      });
      return;
    }
    res.cookie("token", user.token, {
      httpOnly: true,
      maxAge: 360000,
    });
    res.status(200).json({
      message: "Signed in successfully",
      user,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error signing in", error });
  }
}
