import { NextFunction, Request, Response } from "express";
import { UserSignUp, Query } from "../types/user";
import { signUp } from "../services";
import { getUserById, getUsers } from "../services/user.service";

// route handlers for creating user
export async function userHandlerPost(
  req: Request<{}, {}, UserSignUp>,
  res: Response
) {
  const body = req.body;
  try {
    const resData = await signUp(body);
    if (!resData.successful) {
      res.status(400).json({
        message: resData.error,
      });
    }
    res.status(200).json({ message: resData.message, data: resData.data?.[0] });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// route handlers for retrieving users
export async function userHandleGet(
  req: Request<{}, {}, {}, Query>,
  res: Response
) {
  const { filter, values } = req.query;
  try {
    if (filter && values) {
      const users = await getUsers(filter, values);
      res
        .status(200)
        .json({ message: "Users fetched successfully", data: users });
      return;
    }
    const users = await getUsers();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

// route handlers for retrieving users by id

export async function userHandleGetUserById(
  req: Request<{ id: number }, {}, {}>,
  res: Response
) {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}
