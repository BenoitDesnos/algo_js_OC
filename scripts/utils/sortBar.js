// Stocker les tags et input value dans un tableau et rejouer la fonction dès que le tableau change

const searchBar = document.getElementById("search__bar");
let itemsToDisplay = [];
let amountOfRecipes = 0;
function handleFilter(value, isSearchByTag) {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  console.log(isSearchByTag, "searchByTag");
  const selectedTags = document.querySelector(".selected__tags");

  itemsToDisplay = [];
  amountOfRecipes = 0;
  recipeInfosContainer.forEach((container) => {
    // variables
    const data = container.getAttribute(`data-stock`);

    // toggle doesStringMatches

    const doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
      makeStringCaseAndAccentInsensitive(value)
    );

    switch (isSearchByTag) {
      case true:
        searchByTag(value, container, doesStringMatches);
        break;
      case false:
        searchByInput(value, container, doesStringMatches);
        break;

      default:
        break;
    }
    if (container.closest(".display") && value.length >= 3) {
      amountOfRecipes++;
      amountOfRecipesDisplayed.textContent = amountOfRecipes;
    } else if (value.length < 3) {
      amountOfRecipesDisplayed.textContent = recipeInfosContainer.length;
    }
  });

  updateList(itemsToDisplay, false);
}

searchBar.addEventListener("input", (e) => handleFilter(e.target.value, false));

function updateList(itemsToDisplay, resetList) {
  const allTags = document.querySelectorAll(`[data-type]`);
  allTags.forEach((tag) => {
    let isMatched = false;
    if (resetList) {
      tag.classList.add("display");
      tag.classList.remove("hidden");
    } else {
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

function updateItemsAvailable(container) {
  const items = container.getAttribute(`data-stock`).split(",");
  items.forEach((el) => {
    itemsToDisplay = [...itemsToDisplay, el];
  });
}
