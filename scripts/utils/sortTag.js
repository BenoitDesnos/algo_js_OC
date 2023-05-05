const searchTagsWrapper = document.getElementById("search__tags__wrapper");
const searchTag = document.querySelectorAll(".search__tag");
console.log(searchTagsWrapper);

searchTagsWrapper.addEventListener("click", (e) => {
  targetId = e.target.id;
  targetClass = e.target.class;

  searchTag.forEach((search) => {
    if (targetId === search.id || e.target.closest(`#${search.id}`)) {
      if (search.className.includes("isOpen")) {
        search.classList.add("isClosed");
        search.classList.remove("isOpen");
      } else {
        search.classList.remove("isClosed");
        search.classList.add("isOpen");
      }
    }
  });
});
