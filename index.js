const inputvalue = document.querySelector('#cityinput');
const btn = document.querySelector('#add');
const city = document.querySelector('#cityoutput');
const description = document.querySelector('#description span');
const temp = document.querySelector('#temp span');
const wind = document.querySelector('#wind span');

// Replace with your own OpenWeatherMap API key
const API_KEY = "63a90ae96d390ec37d6c1252f5a86e1a";

// Convert temperature from Kelvin to Celsius
function convertToCelsius(val) {
    return (val - 273.15).toFixed(2);
}

// Add event listener to the button
btn.addEventListener('click', function () {
    const cityName = inputvalue.value.trim();

    if (!cityName) {
        alert('Please enter a city or village name.');
        return;
    }

    // Display loading state
    city.innerHTML = `Fetching weather for <span>${cityName}</span>...`;
    description.textContent = '--';
    temp.textContent = '--';
    wind.textContent = '--';

    // Fetch weather data with country code IN (India)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            const nameval = data.name;
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            description.textContent = weatherDescription;
            temp.textContent = `${convertToCelsius(temperature)} °C`;
            wind.textContent = `${windSpeed} km/h`;
        })
        .catch(err => {
            city.innerHTML = 'Error';
            alert('Location not found. Please enter a valid city or village name in India.');
        });
});
