import { users } from "../schema/users";
import { db } from "../index";
import { recipes } from "../schema/recipes";


async function main() {
  const recipe = await db.query.recipes.findMany({
    with: {
      user: true,
      comments: true,
    }
  })
  console.log(recipe);
}

main();