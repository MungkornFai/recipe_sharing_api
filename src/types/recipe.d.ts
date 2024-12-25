


type Recipe = {
  title: string;
  description: string;
  ingredients: [string, ...string[]];
  steps: [string, ...string[]];
  instructions: string;
  photos?: string[] | undefined;
};

export { Recipe };