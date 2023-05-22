const searchBar = document.getElementById("search__bar");
 
 function handleFilter(e, stringProps) {
   const recipeInfosContainer = document.querySelectorAll(
     ".recipe__infos__container"
   );
   let searchedString = e ? e.target.value : stringProps;
   let ingredientsAvailable = [];
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

     // display container or not according to doesStringMatches and inputLength
     if (!doesStringMatches && searchedString.length >= 3) {
       container.closest(".recipe__wrapper").style.display = "none";
       container.closest(".recipe__wrapper").classList.remove("test");
     } else if (container.closest(".test") && doesStringMatches) {
       container.closest(".recipe__wrapper").style.display = "block";
       let ingredients = container.querySelectorAll(".ingredient");

       ingredients.forEach((ingredient) => {
         console.log(ingredient.textContent);

         ingredientsAvailable = [
           ...ingredientsAvailable,
           ingredient.textContent,
         ];
       });
     } else if (doesStringMatches) {
       container.closest(".recipe__wrapper").classList.add("test");
     }
   });
   /* updateList(ustensilsAvailable, "ustensils");
       updateList(appliancesAvailable, "appliances"); */
   updateList(ingredientsAvailable, "ingredients");
 }

 searchBar.addEventListener("input", handleFilter);

 function updateList(arr, type) {
   const ingredientsDisplayed = document.querySelectorAll(
     `.${type} + .display`
   );

   ingredientsDisplayed.forEach((ingredient) => {
     let isMatched = false;
     for (let i = 0; i < arr.length; i++) {
       if (!isMatched) {
         if (ingredient.textContent === arr[i]) {
           ingredient.classList.add("display");
           ingredient.classList.remove("hidden");
           isMatched = true;
         } else if (ingredient.textContent !== arr[i]) {
           ingredient.classList.add("hidden");
           ingredient.classList.remove("display");
         }
       }
     }
   });
 }