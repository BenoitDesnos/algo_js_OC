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

  const cardInfosTitle = document.createElement("h3");
  cardInfosTitle.textContent = name;

  const icon = document.createElement("img");
  icon.setAttribute("src", "./../images/time.svg");
  const cardInfosTimeContainer = document.createElement("span");
  const cardInfosTime = document.createElement("p");
  cardInfosTime.textContent = time + " min";
  cardInfosTimeContainer.appendChild(icon);
  cardInfosTimeContainer.appendChild(cardInfosTime);
  console.log(icon);

  const cardInfosRecipe = document.createElement("ul");
  let cardInfosingredient;
  ingredients.forEach((recipe) => {
    const { ingredient, quantity, unit } = recipe;
    cardInfosingredient = document.createElement("li");
    cardInfosingredient.textContent = `${ingredient}${
      quantity ? ": " + quantity : ""
    } ${unit ? unit : ""}`;
    cardInfosRecipe.appendChild(cardInfosingredient);
  });
  const cardInfosDescription = document.createElement("p");
  cardInfosDescription.textContent = description;

  function getRecipeCardDOM() {
    cardInfos.appendChild(cardInfosTitle);

    cardInfos.appendChild(cardInfosTimeContainer);
    cardInfos.appendChild(cardInfosRecipe);
    cardInfos.appendChild(cardInfosDescription);
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
