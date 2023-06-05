function returnIngredientsByContainer(container) {
  let ingredientString = "";
  let result = "";
  ingredients = container.querySelectorAll(".ingredient");
  ingredients.forEach((ingredient) => {
    result += ingredientString.concat(ingredient.textContent, " ");
  });
  return result;
}

// change strings format to case and accent insensitive
function makeStringCaseAndAccentInsensitive(prop) {
  return prop
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const sortStrings = (arr) => {
  const transformedArr = arr.map((str) =>
    str.toLowerCase().replace(/[^a-z0-9]/gi, "")
  );

  const uniqueArr = transformedArr.filter(
    (str, index) => transformedArr.indexOf(str) === index
  );
  const sortedArr = uniqueArr.sort();
  const originalArr = sortedArr.map(
    (str, index) => arr[transformedArr.indexOf(str)]
  );
  const originalArrayCapitalized = originalArr.map((string) => {
    return capitalizeFirstLetter(string);
  });

  return originalArrayCapitalized;
};

function searchByTag(searchedString, container, doesStringMatches) {
  if (!doesStringMatches && container.closest(".display")) {
    hidContainer(container);
  } else if (container.closest(".display") && doesStringMatches) {
    updateItemsAvailable(container);
    displayContainer(container);
  }
}

function searchByInput(searchedString, container, doesStringMatches) {
  const selectedTags = document.querySelector(".selected__tags");
  const isOneTagSelected = !!selectedTags;

  if (
    container.closest(".display") &&
    !doesStringMatches &&
    searchedString.length >= 3
  ) {
    hidContainer(container);
  } else if (isOneTagSelected) {
    if (
      container.closest(".hidden") &&
      doesStringMatches &&
      searchedString.length >= 3
    ) {
      hidContainer(container);
    }
  } else if (container.closest(".hidden") && doesStringMatches) {
    updateItemsAvailable(container);
    displayContainer(container);
  }
}

function displayContainer(container) {
  container.closest(".recipe__wrapper").classList.remove("hidden");
  container.closest(".recipe__wrapper").classList.add("display");
}

function hidContainer(container) {
  container.closest(".recipe__wrapper").classList.remove("display");
  container.closest(".recipe__wrapper").classList.add("hidden");
}