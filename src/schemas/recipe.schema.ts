import { z } from "zod";

export const CreateRecipeSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(6, "Description must be at least 6 characters long"),
  ingredients: z
    .array(z.string())
    .nonempty("Ingredients are required")
    .min(1, "At least one ingredient is required"),
  steps: z.array(z.string()).nonempty("Steps are required").min(1, "At least one step is required"),
  instructions: z
    .string()
    .nonempty("Instructions are required")
    .min(10, "Instructions must be at least 10 characters long"),
  photos: z.array(z.string().url("Invalid URL format")).optional(),

});


export type Recipe = z.infer<typeof CreateRecipeSchema>;