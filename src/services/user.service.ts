import { UserSignUp } from "../types/user";
import { db } from "../db/index";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";

export async function signUp(user: UserSignUp) {
  const { username, email, password } = user;
  try {
    const passwordHashed = await bcryptjs.hash(password, 10);
    const findUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (findUser.length > 0) {
      throw new Error("Email already exists");
    }
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: passwordHashed,
      })
      .returning();
    return {
      error: null,
      successful: true,
      message: "Created user successfully",
      data: newUser,
    };
  } catch (error) {
    return {
      error: error,
      successful: false,
      message: "Failed to create user",
      data: null,
    };
  }
}

export async function getUsers(filter?: string, values?: string) {
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
