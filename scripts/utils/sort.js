const searcBar = document.getElementById("search__bar");

console.log(searcBar);

searcBar.addEventListener("input", (e) => {
  const recipeTitles = document.querySelectorAll(".recipe__title");
  console.log(recipeTitles);
  console.log(e.target.value.toLowerCase());
  recipeTitles.forEach((title) => {
    if (!title.textContent.toLowerCase().includes(e.target.value)) {
      title.closest("section").style.display = "none";
    } else {
      title.closest("section").style.display = "block";
    }
  });
});
