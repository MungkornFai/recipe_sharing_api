import z from "zod";

export const CreateUserSchema = z.object({
  username: z
    .string()
    .nonempty("username is require")
    .min(3, "Name must be at least 3 characters long"),
  email: z.string().nonempty("email is require").email("Invalid email address"),
  password: z
    .string()
    .nonempty("password is require")
    .min(6, "Password must be at least 6 characters long"),
});
