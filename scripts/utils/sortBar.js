// tout mettre dans un tableau (dataset ou autre) et effectuer le tri dessus ainsi que l'affichage

const searchBar = document.getElementById("search__bar");
let itemsToDisplay = [];

function handleFilter(e, stringProps) {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  const selectedTags = document.querySelector(".selected__tags");
  console.log(!!selectedTags);
  let isSearchByTag = false;
  if (e) {
    var searchedString = e.target.value;
  } else {
    var searchedString = stringProps;
    isSearchByTag = true;
  }

  itemsToDisplay = [];
  recipeInfosContainer.forEach((container) => {
    // variables
    const data = container.getAttribute(`data-stock`);

    // toggle doesStringMatches

    const doesStringMatches = makeStringCaseAndAccentInsensitive(data).includes(
      makeStringCaseAndAccentInsensitive(searchedString)
    );

    switch (isSearchByTag) {
      case true:
        searchByTag(searchedString, container, doesStringMatches);
        break;
      case false:
        searchByInput(searchedString, container, doesStringMatches);
        break;

      default:
        break;
    }
  });
  updateList(itemsToDisplay, false);
}

searchBar.addEventListener("input", handleFilter);

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

function returnItemsAvailable(container) {
  const items = container.getAttribute(`data-stock`).split(",");
  items.forEach((el) => {
    itemsToDisplay = [...itemsToDisplay, el];
  });
}
