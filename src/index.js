function showTemperature(response) {
  let temperatureHeading = document.querySelector("#temp-current");
  let temperature = Math.round(response.data.temperature.current);
  let cityHeading = document.querySelector("#city-heading");
  let description = document.querySelector("#current-desc");
  let humidity = document.querySelector("#current-humidity");
  let wind = document.querySelector("#current-wind");

  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  cityHeading.innerHTML = response.data.city;
  temperatureHeading.innerHTML = temperature;
}

function searchCity(city) {
  let apiKey = "5c1e6tf43ab85904be437e4o09b80b7b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function cityForm(event) {
  event.preventDefault();

  let cityValue = document.querySelector("#city-search-bar");

  searchCity(cityValue.value);
}

let searchElement = document.querySelector("#city-search-form");
searchElement.addEventListener("submit", cityForm);

searchCity("Paris");
