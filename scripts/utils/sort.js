const searchBar = document.getElementById("search__bar");
let searchedString;
let titleString;
let ingredientString = [];
let utensilString;

console.log(searchBar);

searchBar.addEventListener("input", (e) => {
  /*  const recipeTitles = document.querySelectorAll(".recipe__title"); */
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  searchedString = e.target.value;

  recipeInfosContainer.forEach((container) => {
    titleString = container.children[0].textContent;
    if (
      !makeStringCaseAndAccentInsensitive(titleString).includes(
        makeStringCaseAndAccentInsensitive(searchedString)
      ) &&
      e.target.value.length >= 3
    ) {
      console.log("test");
      container.closest(".recipe__wrapper").style.display = "none";
    } else {
      container.closest(".recipe__wrapper").style.display = "block";
    }
  });
});

function makeStringCaseAndAccentInsensitive(prop) {
  return prop
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
