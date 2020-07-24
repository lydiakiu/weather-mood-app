function formatDate(timestamp) {
  let date = new Date(timestamp);

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
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let minTempElement = document.querySelector("#mintemp");
  let maxTempElement = document.querySelector("#maxtemp");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celciusTemperature = response.data.main.temp;
  minCelciusTemperature = response.data.main.temp_min;
  maxCelciusTemperature = response.data.main.temp_max;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  minTempElement.innerHTML = Math.round(minCelciusTemperature) + "°C";
  maxTempElement.innerHTML = Math.round(maxCelciusTemperature) + "°C";
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
    <p>${formatHours(forecast.dt * 1000)}</p>
    <img 
    src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    alt="${forecast.weather[0].description}"
    width=90px/>
    <p>${forecast.weather[0].description}</p>
    </div>`;
  }
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);

  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiForecastUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

function displayFahTemp(event) {
  event.preventDefault();
  let fahrenheit = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  let maxFahrenheit = (maxCelciusTemperature * 9) / 5 + 32;
  let maxTempElement = document.querySelector("#maxtemp");
  let minFahrenheit = (minCelciusTemperature * 9) / 5 + 32;
  let minTempElement = document.querySelector("#mintemp");

  celciusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");

  temperatureElement.innerHTML = Math.round(fahrenheit);
  maxTempElement.innerHTML = Math.round(maxFahrenheit) + "°F";
  minTempElement.innerHTML = Math.round(minFahrenheit) + "°F";
}

function displayCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let maxTempElement = document.querySelector("#maxtemp");
  let minTempElement = document.querySelector("#mintemp");

  celciusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  maxTempElement.innerHTML = Math.round(maxCelciusTemperature) + "°C";
  minTempElement.innerHTML = Math.round(minCelciusTemperature) + "°C";
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(locationUrl).then(displayTemp);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let apiKey = "57a751478ef508961135e0d25d48186e";

let celciusTemperature = null;
let maxCelciusTemperature = null;
let minCelciusTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

search("San Francisco");

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", displayCelTemp);

let myLocation = document.querySelector("#location");
myLocation.addEventListener("click", getLocation);
