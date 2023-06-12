const elementsToSortWith = [];

function removeElementToSortWith(element) {
  const index = elementsToSortWith.indexOf(element);
  elementsToSortWith.splice(index, 1);
}

function deleteFirstStringFromArray(array, stringToDelete) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === stringToDelete) {
      array.splice(i, 1);
      break; // Exit the loop after deleting the first occurrence
    }
  }
  return array;
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
  const originalArr = sortedArr.map((str) => arr[transformedArr.indexOf(str)]);
  const originalArrayCapitalized = originalArr.map((string) => {
    return capitalizeFirstLetter(string);
  });
  return originalArrayCapitalized;
};

function displayFunction(container, allElementsMatches) {
  if (!allElementsMatches) {
    hidContainer(container);
  } else if (allElementsMatches) {
    amountOfRecipes++;
    displayContainer(container);
  }
}
function displayAmountOfRecipes(amountOfRecipes) {
  amountOfRecipesDisplayed.textContent = amountOfRecipes;
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

// Function to update the displayed list of tags based on the itemsToDisplay array
function updateList(itemsToDisplay) {
  const allTags = document.querySelectorAll("[data-type]");
  allTags.forEach((tag) => {
    let isMatched = false;
    // Otherwise, update the tags based on the itemsToDisplay array
    for (let i = 0; i < itemsToDisplay.length; i++) {
      if (!isMatched) {
        if (tag.textContent.toLowerCase() === itemsToDisplay[i].toLowerCase()) {
          tag.classList.add("display");
          tag.classList.remove("hidden");
          isMatched = true;
        } else if (tag.textContent !== itemsToDisplay[i]) {
          tag.classList.add("hidden");
          tag.classList.remove("display");
        }
      }
    }
  });
}

// Function to update the items available based on the container data attribute
function updateItemsAvailable(container) {
  const items = container.getAttribute("data-stock").split(",");
  items.forEach((el) => {
    itemsToDisplay = [...itemsToDisplay, el];
  });
}

