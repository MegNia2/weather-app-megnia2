function showCity(event) {
  event.preventDefault();
  let cityValue = document.querySelector("#city-search-bar");
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = cityValue.value;
}

let searchElement = document.querySelector("#city-search-form");
searchElement.addEventListener("submit", showCity);
