// An empty array to store strings for sorting
const stringsToSortWith = [];
let itemsToDisplay = []; // Array to store items to display
let amountOfRecipes = 0; // Variable to store the number of recipes
let oldString = null; // Variable to store the previous search string

// Function to handle the filtering based on stringsToSortWith
function handleFilter() {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  itemsToDisplay = [];
  amountOfRecipes = 0;

  let i = 0;
  while (i < recipeInfosContainer.length) {
    const container = recipeInfosContainer[i];
    const data = container.getAttribute("data-stock");
    let doesStringMatches = false;
    let allStringsMatches = true;

    let j = 0;
    while (j < stringsToSortWith.length) {
      const string = stringsToSortWith[j];

      if (allStringsMatches) {
        doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
          makeStringCaseAndAccentInsensitive(string)
        );
        allStringsMatches = doesStringMatches;
      }
      j++;
    }
    toggleContainersDisplay(container, allStringsMatches);
    displayAmountOfRecipes(amountOfRecipes);
    i++;
  }
  deleteNoMatchMessage();
  displayNoMatchMessage(
    amountOfRecipes,
    stringsToSortWith[stringsToSortWith.length - 1]
  );
  updateList();
}

// Function to remove an element from the sorting array
function removeElementToSortWith(element) {
  const index = stringsToSortWith.indexOf(element);
  stringsToSortWith.splice(index, 1);
}

// Function to delete the last occurrence of a string from an array
function deleteLastStringFromArray(array, stringToDelete) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === stringToDelete) {
      array.splice(i, 1);
      break;
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

// Function to display a container or hide it based on a condition
function toggleContainersDisplay(container, allStringsMatches) {
  if (!allStringsMatches) {
    hidContainer(container);
  } else if (allStringsMatches) {
    amountOfRecipes++;
    displayContainer(container);
  }
}

// Function to display the amount of recipes
function displayAmountOfRecipes(amountOfRecipes) {
  amountOfRecipesDisplayed.textContent = amountOfRecipes;
}

// Function to display a message when no matches are found
function displayNoMatchMessage(amountOfRecipes, string) {
  const recipesWrapper = document.getElementById("recipes__wrapper");
  const existingErrorMessage = document.getElementById("no-match-message");
  if (amountOfRecipes === 0) {
    let div;
    existingErrorMessage
      ? (div = existingErrorMessage)
      : (div = document.createElement("div"));

    div.textContent = `Aucune recette ne contient « ${string} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
    div.id = "no-match-message";
    recipesWrapper.appendChild(div);
  } else {
    if (existingErrorMessage) {
      existingErrorMessage.remove();
    }
  }
}

// Function to delete the no match message
function deleteNoMatchMessage() {
  if (amountOfRecipes !== 0) {
    const existingErrorMessage = document.getElementById("no-match-message");
    if (existingErrorMessage) {
      existingErrorMessage.remove();
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

// Function to hide a tag
function hidTag(tag) {
  tag.classList.add("hidden");
  tag.classList.remove("display");
}

// Function to display a tag
function displayTag(tag) {
  tag.classList.add("display");
  tag.classList.remove("hidden");
}

// Function to update the displayed list of tags based on the itemsToDisplay array
function updateList(inputValue, typeOfTag) {
  const allTags = document.querySelectorAll(`[data-type]`);

  allTags.forEach((tag) => {
    let isMatched = false;
    for (let i = 0; i < itemsToDisplay.length; i++) {
      if (!isMatched) {
        if (tag.textContent.toLowerCase() === itemsToDisplay[i].toLowerCase()) {
          displayTag(tag);
          isMatched = true;
        } else if (tag.textContent !== itemsToDisplay[i]) {
          hidTag(tag);
        }
      }
    }

    if (tag.dataset.type === typeOfTag) {
      if (
        inputValue &&
        !tag.textContent.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        hidTag(tag);
      } else if (itemsToDisplay.length === 0) {
        displayTag(tag);
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
