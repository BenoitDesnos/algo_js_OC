const elementsToSortWith = [];

function removeElementToSortWith(element) {
  const index = elementsToSortWith.indexOf(element);
  elementsToSortWith.splice(index, 1);
  console.log(elementsToSortWith);
}

// Function to return ingredients of a container
function returnIngredientsByContainer(container) {
  let ingredientString = "";
  let result = "";
  ingredients = container.querySelectorAll(".ingredient");
  ingredients.forEach((ingredient) => {
    result += ingredientString.concat(ingredient.textContent, " ");
  });
  return result;
}

// Function to make a string case and accent insensitive
function makeStringCaseAndAccentInsensitive(prop) {
  return prop
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to sort strings and remove non-alphanumeric characters
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

// Function to handle searching by tag
function searchByTag(container, doesStringMatches) {
  if (!doesStringMatches) {
    hidContainer(container);
  } else if (doesStringMatches) {
    displayContainer(container);
  }
}

// Function to handle searching by input
function searchByInput(container, doesStringMatches) {
  if (!doesStringMatches && container.closest(".display")) {
    hidContainer(container);
  } else if (container.closest(".hidden") && doesStringMatches) {
    displayContainer(container);
    const selectedTags = document.querySelectorAll(".selected__tags");
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag) => {
        handleFilter(tag.textContent, true);
      });
    } else {
      updateList(null, true);
    }
  }
}

// Function to display a container
function displayContainer(container) {
  updateItemsAvailable(container);
  container.closest(".recipe__wrapper").classList.remove("hidden");
  container.closest(".recipe__wrapper").classList.add("display");
}

// Function to hide a container
function hidContainer(container) {
  container.closest(".recipe__wrapper").classList.remove("display");
  container.closest(".recipe__wrapper").classList.add("hidden");
}
function sortWithTagsChosen() {
  const selectedTags = document.querySelectorAll(".selected__tags");
  console.log("test");
  resetFilters();
  if (selectedTags.length > 0) {
    selectedTags.forEach((tag) => {
      handleFilter(tag.textContent, true);
    });
  } else {
    updateList(null, true);
  }
}
