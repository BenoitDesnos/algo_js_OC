// implement with searchBar
const searchBar = document.getElementById("search__bar");
let itemsToDisplay = [];
let amountOfRecipes = 0;
let oldString = null;

// Function to handle filtering based on the input value and search type (tag or input)
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
    displayFunction(container, allElementsMatches);
    displayAmountOfRecipes(amountOfRecipes);
  });

  updateList(itemsToDisplay);
}

// Add an event listener to the search bar to handle input changes
searchBar.addEventListener("input", (e) => handleFilter(e.target.value));

