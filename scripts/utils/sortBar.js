const searchBar = document.getElementById("search__bar");

function handleFilter(e) {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  let searchedString = e.target.value;

  recipeInfosContainer.forEach((container) => {
    // variables
    let isInputMatchingTrue = false;
    let titleString = container.querySelector(".recipe__title").textContent;
    let descriptionString = container.querySelector(
      ".recipe__description"
    ).textContent;
    let ingredientsString = returnIngredientsByContainer(container);

    // toggle isInputMatchingTrue
    makeStringCaseAndAccentInsensitive(
      titleString,
      descriptionString,
      ingredientsString
    ).forEach((string) => {
      if (!isInputMatchingTrue) {
        string.includes(makeStringCaseAndAccentInsensitive(searchedString)) ===
        false
          ? (isInputMatchingTrue = false)
          : (isInputMatchingTrue = true);
      }
    });

    // display container or not according to isInputMatchingTrue and inputLength
    if (!isInputMatchingTrue && e.target.value.length >= 3) {
      container.closest(".recipe__wrapper").style.display = "none";
    } else {
      container.closest(".recipe__wrapper").style.display = "block";
    }
  });
}

function returnIngredientsByContainer(container) {
  let ingredientString = "";
  let result = "";
  ingredients = container.querySelectorAll(".ingredient");
  ingredients.forEach((ingredient) => {
    result += ingredientString.concat(ingredient.textContent, " ");
  });
  return result;
}

searchBar.addEventListener("input", handleFilter);