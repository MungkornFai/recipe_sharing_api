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

export const CommentSchema = z.object({
  comment: z
    .string()
    .nonempty("Comment is required")
    .min(3, "Comment must be at least 3 characters long"),
});

export const RatingSchema = z.object({
  rating: z.number().int().min(1).max(5, { message: "Rating must be between 1 and 5" }),
});
export const FavoriteIdParamsSchema = z.object({
 id: z.coerce.number().int().positive("Invalid recipe ID"),
});


export const FollowSchema = z.object({
  followeeId: z.coerce.number().int().positive("Invalid followee ID"),
})

export type Recipe = z.infer<typeof CreateRecipeSchema>;
