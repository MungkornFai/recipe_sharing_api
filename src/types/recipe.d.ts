type Recipe = {
  title: string;
  description: string;
  ingredients: [string, ...string[]];
  steps: [string, ...string[]];
  instructions: string;
  photos?: string[] | undefined;
};

type TQuery = {
  title?: string;
  ingredients?: string;
};

type TComment = {
  comment: string;
  recipeId: number;
  userId: number;
};

type TRating = {
  rating: number;
  recipeId: number;
  userId: number;
};
type TRecipeParams = {
  id: string;
};

type TUserParams = {
  followeeId: string;
}

type TFollower = {
  followerId: number;
  followeeId: number;
}

export { Recipe, TQuery, TComment, TRecipeParams,TRating,TUserParams,TFollower };
