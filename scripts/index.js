fetch("../mockData.json")
  .then((response) => response.json())
  .then((data) => dsiplayRecipes(data));

function dsiplayRecipes(recipes) {
  // display data about phototgrapher

  const recipesSection = document.getElementById("recipes__wrapper");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);

    const recipeCardDOM = recipeModel.getRecipeCardDOM();

    recipesSection.appendChild(recipeCardDOM);
  });
}

function recipeFactory(recipe) {
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
    cardInfosingredient.innerHTML = `<span><strong>${ingredient}</strong>${
      quantity ? ": " + quantity : ""
    }${unit ? unit : ""}</span>`;
    cardInfosRecipe.appendChild(cardInfosingredient);
  });
  const cardInfosDescription = document.createElement("p");
  cardInfosDescription.classList.add("recipe__description");
  cardInfosDescription.textContent = description;

  function getRecipeCardDOM() {
    cardInfos.appendChild(cardImgContainer);
    cardInfos.appendChild(cardInfosContainer);
    cardInfosContainer.appendChild(cardInfosTitle);
    cardInfosContainer.appendChild(cardInfosTimeContainer);
    cardInfosContainer.appendChild(cardInfosRecipe);
    cardInfosContainer.appendChild(cardInfosDescription);
    return cardInfos;
  }

  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecipeCardDOM,
  };

  /* const { name, portrait, city, country, tagline, price, id } = data;
  
  const linkToPhotographer = document.createElement("a");
  linkToPhotographer.setAttribute("href", `/photographer.html?id=${id}`);
  linkToPhotographer.setAttribute("aria-label", `lien vers ${name} profil`);
  linkToPhotographer.classList.add("portrait__container");
 
  function getUserCardDOM() {
    article.appendChild(linkToPhotographer);
    linkToPhotographer.appendChild(portraitElement);
    linkToPhotographer.appendChild(nameElement);
    article.appendChild(locationElement);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);
    return article;
  }
  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    getUserCardDOM,
    getPhotographerDOM,
  }; */
}
