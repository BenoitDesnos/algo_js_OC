// tout mettre dans un tableau (dataset ou autre) et effectuer le tri dessus ainsi que l'affichage

const searchBar = document.getElementById("search__bar");
let itemsAvailable = [];

function handleFilter(e, stringProps) {
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  let isSearchByTag = false;
  if (e) {
    var searchedString = e.target.value;
  } else {
    var searchedString = stringProps;
    isSearchByTag = true;
  }
  console.log(searchedString);
  itemsAvailable = [];
  recipeInfosContainer.forEach((container) => {
    // variables
    let doesStringMatches = false;
    let titleString = container.querySelector(".recipe__title").textContent;
    let descriptionString = container.querySelector(
      ".recipe__description"
    ).textContent;
    let ingredientsString = returnIngredientsByContainer(container);

    // toggle doesStringMatches

    makeStringCaseAndAccentInsensitive(
      titleString,
      ingredientsString,
      descriptionString
    ).forEach((string) => {
      if (!doesStringMatches) {
        string.includes(makeStringCaseAndAccentInsensitive(searchedString)) ===
        false
          ? (doesStringMatches = false)
          : (doesStringMatches = true);
      }
    });

    switch (isSearchByTag) {
      case true:
        if (searchedString.length >= 3) {
          if (!doesStringMatches && container.closest(".display")) {
            console.log(container.closest(".hidden"));
            container.closest(".recipe__wrapper").classList.add("hidden");
            container.closest(".recipe__wrapper").classList.remove("display");
          } else if (container.closest(".display") && doesStringMatches) {
            returnItemsAvailable(container);
            container.closest(".recipe__wrapper").classList.remove("hidden");
            container.closest(".recipe__wrapper").classList.add("display");
          }
          if (
            container.closest(".hidden") &&
            container.closest(".hidden").style.display === "block"
          ) {
            container.closest(".hidden").style.display = "none";
          }
        }
        break;
      case false:
        if (
          container.closest(".display") &&
          !doesStringMatches &&
          searchedString.length >= 3
        ) {
          container.closest(".recipe__wrapper").style.display = "none";
        } else if (container.closest(".display")) {
          container.closest(".recipe__wrapper").style.display = "block";
        }

        break;

      default:
        break;
    }

    // display container or not according to doesStringMatches and inputLength
  });

  updateList(itemsAvailable);
}

searchBar.addEventListener("input", handleFilter);

function updateList(arr) {
  const itemListDisplayed = document.querySelectorAll(`[data-type]`);

  itemListDisplayed.forEach((item) => {
    let isMatched = false;
    for (let i = 0; i < arr.length; i++) {
      if (!isMatched) {
        if (item.textContent.toLowerCase() === arr[i].toLowerCase()) {
          item.classList.add("display");
          item.classList.remove("hidden");
          isMatched = true;
        } else if (item.textContent !== arr[i]) {
          item.classList.add("hidden");
          item.classList.remove("display");
        }
      }
    }
  });
}

function returnItemsAvailable(container) {
  const items = container.getAttribute(`data-stock`).split(",");
  items.forEach((el) => {
    itemsAvailable = [...itemsAvailable, el];
  });
}
