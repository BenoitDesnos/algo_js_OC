const searchTagsWrapper = document.getElementById("search__tags__wrapper");
const selectedTagsWrapper = document.getElementById("selected__tags__wrapper");
const regex = /^(?!.*\btag\b.*\btag\b).*\btag\b.*$/gm; // match tag only once

searchTagsWrapper.addEventListener("click", (e) => {
  const target = e.target;
  const searchTag = target.closest(".search__tag");
  if (searchTag) {
    let title = searchTag.querySelector(".search__tag__title");
    let input = searchTag.querySelector("input");
    if (!input) {
      input = document.createElement("input");
      input.classList.add("tag__input");
      input.setAttribute("placeholder", `Rechercher`);
    }
    if (searchTag.className.includes("isOpen")) {
      searchTag.classList.add("isClosed");
      searchTag.classList.remove("isOpen");
      title.style.display = "block";
      input.remove();
    } else {
      searchTag.classList.remove("isClosed");
      searchTag.classList.add("isOpen");
      title.style.display = "none";
      searchTag.insertBefore(input, searchTag.firstChild);
      input.focus();
    }
  }
  if (target.className.match(regex)) {
    const typeOfTag = target.classList[1];
    const selectedTagsWrapperType = document.getElementById(
      `selected__tags__wrapper__${typeOfTag}`
    );
    console.log(selectedTagsWrapperType);
    let tag = document.createElement("li");
    tag.textContent = target.textContent;
    tag.classList.add("selected__tags", typeOfTag);
    handleFilter(null, target.textContent);
    selectedTagsWrapperType.appendChild(tag);
  }
});

selectedTagsWrapper.addEventListener("click", (e) => {
  const target = e.target;
  const selectedTag = target.closest(".selected__tags");
  if (selectedTag) {
    selectedTag.remove();
  }
});


