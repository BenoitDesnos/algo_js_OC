fetch("../mockData.json")
  .then((response) => response.json())
  .then((data) => dsiplayRecipes(data));

function dsiplayRecipes(recipes) {
  // display data about phototgrapher

  const recipesSection = document.getElementById("recipes__wrapper");
  recipes.forEach((recipe) => {
    const recipeModel = recipeFactory(recipe);
    console.log(recipeModel);
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

  const cardInfosTime = document.createElement("span");
  cardInfosTime.textContent = name;

  const cardInfosRecipe = document.createElement("ul");

  const cardInfosDescription = document.createElement("p");

  function getRecipeCardDOM() {
    cardInfos.appendChild(cardInfosTime);
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
