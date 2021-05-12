let apiKey = "4fc145a29e5e0b7f8bb3055a335e63cc";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = response.data.clouds.all;
}

axios.get(apiUrl).then(displayTemperature);
