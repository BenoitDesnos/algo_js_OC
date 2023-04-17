fetch("../../mockData.json")
  .then((response) => response.json())
  .then((data) => dsiplayRecipes(data));

function dsiplayRecipes(recipes) {
  // display data about phototgrapher

  const recipesSection = document.getElementById("recipes__wrapper");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);

    const recipeCardDOM = recipeModel.getRecipeCardDOM();

    recipesSection.appendChild(recipeCardDOM);
  });
}
