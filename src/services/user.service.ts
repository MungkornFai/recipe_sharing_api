import { UserSignUp } from "../types/user";
import { db } from "../db/index";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { User, UserModification, UserSignIn } from "../types/user";
import jwt from "jsonwebtoken";
import { AppError, AuthenticationError, ConflictError } from "../lib/error.handlers";

// use sign in with password and email
const JWT_SECRET = process.env.JWT_SECRET!;

export async function signIn(user: UserSignIn) {
  try {
    const findUser = await db.select().from(users).where(eq(users.email, user.email));
    if (findUser.length === 0) {
      //console.log("No users found")
      throw new AuthenticationError("No users found", 404);
    }
    const { password, id } = findUser[0];
    const isPasswordMatch = await bcryptjs.compare(user.password, password);
    if (!isPasswordMatch) {
      throw new Error("password Not match");
    }

    const payload = {
      userId: id,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// create a new user and add it to the database
export async function signUp(user: UserSignUp) {
  const { username, email, password } = user;
  try {
    const passwordHashed = await bcryptjs.hash(password, 10);
    const findUser = await db.select().from(users).where(eq(users.email, email));
    if (findUser.length > 0) {
      throw new Error("User already exists");
    }
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: passwordHashed,
      })
      .returning();
    const { password: _, ...user } = newUser[0]; // remove the password from showing
    return {
      message: "Created user successfully",
      data: user,
    };
  } catch (error) {
    console.log("Error during signup", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to create user");
    }
  }
}

// retrieve all users from the database
export async function getUsers(filter?: string, values?: string): Promise<User[] | undefined> {
  try {
    const res = await db.select().from(users);
    if (filter && values) {
      const filteredUsers = res.filter((user: any) =>
        user[filter].toLowerCase().includes(values.toLowerCase())
      );
      return filteredUsers;
    }
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// get user with id from database

export async function getUserById(id: number): Promise<User | null> {
  try {
    const findUser = await db.select().from(users).where(eq(users.id, id));
    if (findUser.length === 0) {
      return null;
    }
    return findUser[0];
  } catch (error) {
    console.log(`Error fetching user by id ${id}`, error);
    throw new Error(`Error fetching user by id ${id}`);
  }
}

// update user with id in the database

export async function updateUser(id: number, user: UserModification) {
  try {
    const updatedUser = await db
      .update(users)
      .set({
        username: user.username,
        email: user.email,
        password: user.password,
        updated_at: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return updatedUser[0];
  } catch (error) {
    console.log(`can not update user with id ${id}`, error);
  }
}
