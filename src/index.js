function showTemperature(response) {
  let temperatureHeading = document.querySelector("#temp-current");
  let temperature = Math.round(response.data.temperature.current);
  let cityHeading = document.querySelector("#city-heading");
  let description = document.querySelector("#current-desc");
  let humidity = document.querySelector("#current-humidity");
  let wind = document.querySelector("#current-wind");
  let date = new Date(response.data.time * 1000);
  let currentDate = document.querySelector("#current-date");
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji" />`;
  currentDate.innerHTML = formattedDate(date);
  description.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  cityHeading.innerHTML = response.data.city;
  temperatureHeading.innerHTML = temperature;
}

function formattedDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let background = document.querySelector("#background-gradient");

  if (hours < 12) {
    background.classList.add("morning");
  } else if (hours < 18) {
    background.classList.add("afternoon");
  } else if (hours < 21) {
    background.classList.add("evening");
  } else {
    background.classList.add("night");
  }

  return `${day} ${hours}:${minutes}`;
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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;

    let currentForecast = document.querySelector("#forecast");
    currentForecast.innerHTML = forecastHtml;
  });
}

searchCity("Paris");
displayForecast();
