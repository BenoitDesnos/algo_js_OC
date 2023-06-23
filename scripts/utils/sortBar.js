// Get the search bar element
const searchBar = document.getElementById("search__bar");

// Function to add the search bar string to the sorting array
function addSearchBarString(searchBarString) {
  if (searchBarString) {
    oldString && deleteLastStringFromArray(stringsToSortWith, oldString);
    if (searchBarString.length > 2) {
      stringsToSortWith.push(searchBarString);
      oldString = searchBarString;
    }
    handleFilter();
  }
}
// Add an event listener to the search bar to handle input changes
searchBar.addEventListener("input", (e) => {
  addSearchBarString(e.target.value);
});
