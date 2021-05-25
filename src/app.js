function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = formatDay(timestamp);
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let apiKey = "4fc145a29e5e0b7f8bb3055a335e63cc";
let apiExtension = "https://api.openweathermap.org/data/2.5/";
let unit = "metric";

function search(city) {
  let apiUrl = `${apiExtension}weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let apiUrl = `${apiExtension}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let listElement = document.querySelector(".list");

  let lists = "";
  lists += `
            <li>Precipitation:${response.data.clouds.all}%</li>
            <li>Humidity:${response.data.main.humidity}%</li>
            <li>Wind:${Math.round(response.data.wind.speed)}m/s</li>
 
  `;
  listElement.innerHTML = lists;
  let descriptionElement = document.querySelector(".description");
  let description = "";
  description += `
                  <li>${formatDate(response.data.dt * 1000)}</li>
                  <li>${response.data.weather[0].description}</li>
    `;
  descriptionElement.innerHTML = description;
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  let icon = "";
  icon = `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="${response.data.weather[0].description}"`;
  icon += `/>`;
  iconElement.innerHTML = icon;
  getForecast(response.data.coord);
}

let celciusTemperature = null;

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  // console.log(response.data.daily);
  let forecastHTML = "";

  forecastHTML = `<div class="row">`;
  let forecastDays = response.data.daily;
  forecastDays.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
              
              <div class="col-2" id="one">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            
  
  `;
  });
  forecastHTMl = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  let apiUrl = `${apiExtension}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  // console.log("clicked");
  navigator.geolocation.getCurrentPosition(showLocation);
}

let current = document.querySelector("#current-location");
current.addEventListener("click", currentLocation);
