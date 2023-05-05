let ingredientsTags = [];
function recipeFactory(recipe, index, length) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = recipe;

  const cardInfos = document.createElement("section");
  cardInfos.classList.add("recipe__wrapper");
  const cardImgContainer = document.createElement("div");
  cardImgContainer.classList.add("recipe__image__container");
  const cardInfosContainer = document.createElement("div");
  cardInfosContainer.classList.add("recipe__infos__container");

  const cardInfosTitle = document.createElement("h3");
  cardInfosTitle.classList.add("recipe__title");
  cardInfosTitle.textContent = name;

  const cardInfosTimeIcon = document.createElement("img");
  cardInfosTimeIcon.classList.add("recipe__time__icon");
  cardInfosTimeIcon.setAttribute("src", "./../images/time.svg");

  const cardInfosTime = document.createElement("p");
  cardInfosTime.classList.add("recipe__time");
  cardInfosTime.textContent = time + " min";

  const cardInfosTimeContainer = document.createElement("span");
  cardInfosTimeContainer.classList.add("recipe__time__container");
  cardInfosTimeContainer.appendChild(cardInfosTimeIcon);
  cardInfosTimeContainer.appendChild(cardInfosTime);

  const cardInfosRecipe = document.createElement("ul");
  cardInfosRecipe.classList.add("recipe__ingredients");

  let cardInfosingredient;
  ingredients.forEach((recipe) => {
    const { ingredient, quantity, unit } = recipe;
    cardInfosingredient = document.createElement("li");
    cardInfosingredient.classList.add("recipe__ingredient");
    cardInfosingredient.innerHTML = `<span><strong class="ingredient">${ingredient}</strong>${
      quantity ? ": " + quantity : ""
    }${unit ? unit : ""}</span>`;
    cardInfosRecipe.appendChild(cardInfosingredient);
  });
  const cardInfosDescription = document.createElement("p");
  cardInfosDescription.classList.add("recipe__description");
  cardInfosDescription.textContent = description;

  ingredients.forEach((ingredient) => {
    ingredientsTags = [...ingredientsTags, ingredient.ingredient];
  });

  function getRecipeCardDOM() {
    cardInfos.appendChild(cardImgContainer);
    cardInfos.appendChild(cardInfosContainer);
    cardInfosContainer.appendChild(cardInfosTitle);
    cardInfosContainer.appendChild(cardInfosTimeContainer);
    cardInfosContainer.appendChild(cardInfosRecipe);
    cardInfosContainer.appendChild(cardInfosDescription);
    return cardInfos;
  }
  const tagsWrapper = document.getElementsByClassName("tags__wrapper");
  function getIngredientsDOM() {
    if (index === length - 1) {
      let ingredientItem;
      const uniqueIngredients = sortStrings(ingredientsTags);
      uniqueIngredients.forEach((ingredient) => {
        ingredientItem = document.createElement("li");
        ingredientItem.classList.add("ingredients__tag");
        ingredientItem.textContent = ingredient;
        tagsWrapper[0].appendChild(ingredientItem);
      });
    }
    return tagsWrapper[0];
  }

  return {
    getRecipeCardDOM,
    getIngredientsDOM,
  };
}
