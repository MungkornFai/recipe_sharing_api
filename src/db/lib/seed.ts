import { users } from "../schema/users";
import { db } from "../index";

async function main() {
  const data = {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
  };
  try {
    const res = await db.insert(users).values(data);
    console.log("User created successfully:", res);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

main();