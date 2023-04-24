const searchBar = document.getElementById("search__bar");

searchBar.addEventListener("input", (e) => {
  /*  const recipeTitles = document.querySelectorAll(".recipe__title"); */
  const recipeInfosContainer = document.querySelectorAll(
    ".recipe__infos__container"
  );
  let searchedString = e.target.value;

  recipeInfosContainer.forEach((container) => {       
    let titleString = container.querySelector('.recipe__title').textContent;    
    let descriptionString = container.querySelector('.recipe__description').textContent;    
    let ingredientsString = returnIngredientsByContainer(container)   
    if (
      !makeStringCaseAndAccentInsensitive(titleString).includes(
        makeStringCaseAndAccentInsensitive(searchedString)
      ) && !makeStringCaseAndAccentInsensitive(ingredientsString).includes(
        makeStringCaseAndAccentInsensitive(searchedString)
      ) &&
       !makeStringCaseAndAccentInsensitive(descriptionString).includes(
        makeStringCaseAndAccentInsensitive(searchedString)
      ) &&
      e.target.value.length >= 3
    ) {      
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

function returnIngredientsByContainer(container) {
  let ingredientString = "";
  let result = "" 
  console.log('--------------');
  ingredients = container.querySelectorAll('.ingredient');
  console.log(ingredients);
    ingredients.forEach((ingredient) => {
      result += ingredientString.concat(ingredient.textContent, " ")
     
    })
    
    return result
}