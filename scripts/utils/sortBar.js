// implement with searchBar
const searchBar = document.getElementById("search__bar");
let itemsToDisplay = [];
let amountOfRecipes = 0;
let oldString = null;


function handleFilter(string) {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );

  itemsToDisplay = [];
  amountOfRecipes = 0;

  if (string) {
    if (oldString) {
      deleteFirstStringFromArray(elementsToSortWith, oldString);
    }
    if (string.length > 2) {
      elementsToSortWith.push(string);
      oldString = string;
    }
  }

  let i = 0;
  while (i < recipeInfosContainer.length) {
    const container = recipeInfosContainer[i];
    const data = container.getAttribute("data-stock");
    let doesStringMatches = false;
    let allElementsMatches = true;

    let j = 0;
    while (j < elementsToSortWith.length) {
      const element = elementsToSortWith[j];
      if (allElementsMatches) {
        doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
          makeStringCaseAndAccentInsensitive(element)
        );
        allElementsMatches = doesStringMatches;
      }
      j++;
    }

    displayFunction(container, allElementsMatches);
    displayAmountOfRecipes(amountOfRecipes);
    i++;
  }

  displayNoMatchMessage(amountOfRecipes, string);
  updateList();
}

// Add an event listener to the search bar to handle input changes
searchBar.addEventListener("input", (e) => handleFilter(e.target.value));
searchBar.addEventListener("input", (e) => handleFilter(e.target.value));

