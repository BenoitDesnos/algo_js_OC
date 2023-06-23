// Get the DOM elements with the specified IDs
const searchTagsWrapper = document.getElementById("search__tags__wrapper");
const selectedTagsWrapper = document.getElementById("selected__tags__wrapper");

// Add a click event listener to the search tags wrapper
searchTagsWrapper.addEventListener("click", (e) => {
  const target = e.target;
  const searchTag = target.closest(".search__tag");

  // Check if a search tag was clicked
  if (searchTag) {
    let title = searchTag.querySelector(".search__tag__title");
    let input = searchTag.querySelector("input");

    // If the input element doesn't exist, create it
    if (!input) {
      input = document.createElement("input");
      input.classList.add("tag__input");
      input.setAttribute(
        "placeholder",
        `Rechercher ${target.closest("[data-type-of-tag]").dataset.typeOfTag}`
      );
    }

    // Allow clicking on the input without triggering the toggle
    if (input !== target) {
      // Check the state of the search tag and perform the corresponding actions
      if (searchTag.className.includes("isOpen")) {
        searchTag.classList.add("isClosed");
        searchTag.classList.remove("isOpen");
        title.style.display = "block";
        input.remove();
        updateList("", target.closest("[data-type-of-tag]").dataset.typeOfTag); // Reset the list
      } else {
        searchTag.classList.remove("isClosed");
        searchTag.classList.add("isOpen");
        title.style.display = "none";
        searchTag.insertBefore(input, searchTag.firstChild);
        input.focus();

        // Add an input event listener to the input element
        input.addEventListener("input", (e) => {
          updateList(
            e.target.value,
            e.target.closest("[data-type-of-tag]").dataset.typeOfTag
          );
        });
      }
    }
  }

  // Check if a tag with a specific type was clicked
  if (target.dataset.type) {
    const typeOfTag = target.dataset.type;
    const selectedTagsWrapperType = document.getElementById(
      `selected__tags__wrapper__${typeOfTag}s`
    );

    // Create a new list item element for the selected tag
    let tag = document.createElement("li");
    tag.textContent = target.textContent;
    tag.classList.add("selected__tags", typeOfTag + "s");

    let isElementAlreadyPresent = false;

    // Check if the tag already exists in the list
    stringsToSortWith.forEach((element) => {
      if (!isElementAlreadyPresent) {
        if (tag.textContent === element) {
          isElementAlreadyPresent = true;
        }
      }
    });

    // If the tag is not already present, add it to the selected tags wrapper
    if (!isElementAlreadyPresent) {
      stringsToSortWith.push(tag.textContent);
      selectedTagsWrapperType.appendChild(tag);
    }

    // Handle the filtering based on the selected tags
    handleFilter();
  }
});

// Add a click event listener to the selected tags wrapper
selectedTagsWrapper.addEventListener("click", (e) => {
  const target = e.target;
  const selectedTag = target.closest(".selected__tags");

  // Check if a selected tag was clicked
  if (selectedTag) {
    selectedTag.remove();
    removeElementToSortWith(selectedTag.textContent);
    handleFilter();
  }
});
