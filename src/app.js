function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}
let current = new Date();
document.querySelector("#date").innerHTML = formatDate(current);

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let minTempElement = document.querySelector("#mintemp");
  let maxTempElement = document.querySelector("#maxtemp");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;
  minCelciusTemperature = response.data.main.temp_min;
  maxCelciusTemperature = response.data.main.temp_max;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  conditionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  minTempElement.innerHTML = Math.round(minCelciusTemperature) + "°C";
  maxTempElement.innerHTML = Math.round(maxCelciusTemperature) + "°C";
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "57a751478ef508961135e0d25d48186e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
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

let celciusTemperature = null;
let maxCelciusTemperature = null;
let minCelciusTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

search("munich");

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", displayFahTemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", displayCelTemp);
