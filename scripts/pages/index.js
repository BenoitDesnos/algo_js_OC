fetch("../../mockData.json")
  .then((response) => response.json())
  .then((data) => dsiplayRecipes(data));

function dsiplayRecipes(recipes) {
  const recipesSection = document.getElementById("recipes__wrapper");
  const ingredientsSection = document.getElementById(
    "search__tag__ingredients"
  );
  const appliancesSection = document.getElementById("search__tag__appliances");
  const ustensilsSection = document.getElementById("search__tag__ustensils");
  recipes.forEach((recipe, index) => {
    const recipeModel = recipeFactory(recipe, index, recipes.length);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    recipesSection.appendChild(recipeCardDOM);

    const recipeIngredientsDOM = recipeModel.getIngredientsDOM();
    ingredientsSection.appendChild(recipeIngredientsDOM);

    const recipeAppliancesDOM = recipeModel.getAppliancesDOM();
    appliancesSection.appendChild(recipeAppliancesDOM);

    const recipeUstensilsDOM = recipeModel.getUstensilsDOM();
    ustensilsSection.appendChild(recipeUstensilsDOM);
  });
}
