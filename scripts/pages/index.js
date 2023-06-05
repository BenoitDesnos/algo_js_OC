// Fetch JSON data from the given URL and process it
fetch("../../mockData.json")
  .then((response) => response.json())
  .then((data) => displayRecipes(data));

// Function to display recipes
function displayRecipes(recipes) {
  // Get DOM elements for sections
  const recipesSection = document.getElementById("recipes__wrapper");
  const ingredientsSection = document.getElementById(
    "search__tag__ingredients"
  );
  const appliancesSection = document.getElementById("search__tag__appliances");
  const ustensilsSection = document.getElementById("search__tag__ustensils");

  // Iterate through the recipes array
  recipes.forEach((recipe, index) => {
    // Create a recipe model and generate the recipe card DOM
    const recipeModel = recipeFactory(recipe, index, recipes.length);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();

    // Create a recipe model and generate the ingredients DOM
    const recipeIngredientsDOM = recipeModel.getIngredientsDOM();

    // Create a recipe model and generate the appliances DOM
    const recipeAppliancesDOM = recipeModel.getAppliancesDOM();

    // Create a recipe model and generate the utensils DOM
    const recipeUstensilsDOM = recipeModel.getUstensilsDOM();

    // Append the generated DOM elements to their respective sections
    recipesSection.appendChild(recipeCardDOM);
    ingredientsSection.appendChild(recipeIngredientsDOM);
    appliancesSection.appendChild(recipeAppliancesDOM);
    ustensilsSection.appendChild(recipeUstensilsDOM);
  });
}
