// implement with searchBar
const searchBar = document.getElementById("search__bar");
let itemsToDisplay = [];
let amountOfRecipes = 0;

// Function to handle filtering based on the input value and search type (tag or input)
function handleFilter() {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );

  recipeInfosContainer.forEach((container) => {
    const data = container.getAttribute("data-stock");
    let doesStringMatches = false;
    var allElementsMatches = true;
    elementsToSortWith.forEach((element) => {
      if (allElementsMatches) {
        doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
          makeStringCaseAndAccentInsensitive(element)
        );
        allElementsMatches = doesStringMatches;
      }
    });
    searchByTag(container, allElementsMatches);
  });

  /*  elementsToSortWith.push(value);
  console.log(elementsToSortWith);
  itemsToDisplay = [];
  amountOfRecipes = 0;

  recipeInfosContainer.forEach((container) => {
    const data = container.getAttribute("data-stock");

    // Check if the input value matches the data string, case and accent insensitive
    const doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
      makeStringCaseAndAccentInsensitive(value)
    );

    // Handle search based on the search type (tag or input)
    switch (isSearchByTag) {
      case true:
        searchByTag(container, doesStringMatches);
        break;
      case false:
        searchByInput(container, doesStringMatches);
        break;
      default:
        break;
    }

    // Update the amount of recipes displayed based on the input value length
    if (container.closest(".display") && value.length >= 3) {
      amountOfRecipes++;
      amountOfRecipesDisplayed.textContent = amountOfRecipes;
    } else if (container.closest(".display") && value.length < 3) {
      amountOfRecipes++;
      amountOfRecipesDisplayed.textContent = recipeInfosContainer.length;
    }
  });

  // Update the displayed list of tags
  updateList(itemsToDisplay, false); */
}

// Add an event listener to the search bar to handle input changes
searchBar.addEventListener("input", (e) => handleFilter(e.target.value, false));

// Function to update the displayed list of tags based on the itemsToDisplay array
function updateList(itemsToDisplay, resetList) {
  const allTags = document.querySelectorAll("[data-type]");
  allTags.forEach((tag) => {
    let isMatched = false;

    // If resetList is true, display all tags
    if (resetList) {
      tag.classList.add("display");
      tag.classList.remove("hidden");
    } else {
      // Otherwise, update the tags based on the itemsToDisplay array
      for (let i = 0; i < itemsToDisplay.length; i++) {
        if (!isMatched) {
          if (
            tag.textContent.toLowerCase() === itemsToDisplay[i].toLowerCase()
          ) {
            tag.classList.add("display");
            tag.classList.remove("hidden");
            isMatched = true;
          } else if (tag.textContent !== itemsToDisplay[i]) {
            tag.classList.add("hidden");
            tag.classList.remove("display");
          }
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
