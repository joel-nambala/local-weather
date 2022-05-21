'use strict';

// Select DOM elements
const curLocation = document.querySelector('.weather__location');
const curTime = document.querySelector('.weather__time');
const weatherContent = document.querySelector('.weather__content');
const cardTitle = document.querySelector('.card__title');

// State variables
const TIMEOUT = 1000;
const api = 'https://fcc-weather-api.glitch.me/api/current?';

/////////////////////////////////////////////////////////
// Init function
const init = function () {
  cardTitle.textContent = 'local weather';
};

init();

///////////////////////////////////////////////////////
// Function to display he current time
const displayTime = function () {
  // 1. Get the date object
  const today = new Date();

  // 2. Use the new internationalization API to get the current time
  const time = new Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: 'numeric',
  }).format(today);

  // 3. Display the current time to the UI
  curTime.textContent = time;
};

setInterval(displayTime, TIMEOUT);

////////////////////////////////////////////////////////////
// Function to fetch weather data
const getWeather = async function (lat, long) {
  try {
    // 1. Fetch the data from an external API
    const response = await fetch(`${api}lat=${lat}&lon=${long}`);

    if (!response.ok) throw new Error('Something went wrong');

    // 2. Convert the response into JSON
    const data = await response.json();

    // 3. Display the data to the UI
    curLocation.textContent = `${data.name}, ${data.sys.country}`;

    const html = `
    <figure class="weather__photo">
      <img
        class="weather__img"
        src="${data.weather[0].icon}"
        alt="Weather icon"
      />
      <figcaption class="weather__name">${data.weather[0].description}</figcaption>
    </figure>
    <div class="weather__description">
      <h3 class="weather__temp">
        Temp: <span class="weather__temp-value">${data.main.temp} &deg;C</span>
      </h3>
      <h3 class="weather__temp">
        Feels like: <span class="weather__feels-like">${data.main.feels_like} &deg;C</span>
      </h3>
      </div>
        <h2 class="weather__pressure">
          Pressure: <span class="weather__pressure-value">${data.main.pressure}</span>
        </h2>
        <h2 class="weather__humidity">
          Humidity: <span class="weather__humidity-value">${data.main.humidity}%</span>
      </h2>
    `;
    console.log(data);

    weatherContent.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    console.log(`${err.message}`);
  }
};

/////////////////////////////////////////////////////////////
// Get the current location
navigator.geolocation.getCurrentPosition(
  function (position) {
    // 1. Get the current lat and long
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    // 2. Call the weather function with the real coordinates
    getWeather(lat, long);
  },
  function () {
    console.log('Please turn on your location');
  }
);
