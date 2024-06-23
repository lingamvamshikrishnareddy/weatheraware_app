// Assuming you're using OpenWeatherMap API
const apiKey = 'c9c6a49e16b8c02f7b9dae800c208e4a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const airQualityApiUrl = 'https://api.openweathermap.org/data/2.5/air_pollution';

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        document.getElementById('weather-display').innerHTML = ''; // Clear the display if no city is entered
    }
});

// Automatically detect user's location when the page loads
window.onload = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
};

function getWeatherByCity(city) {
    fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                getAirQuality(data.coord.lat, data.coord.lon);
                displayWeather(data);
            } else {
                document.getElementById('weather-display').innerHTML = '<p class="warning">City not found. Please try again.</p>';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getWeatherByCoords(lat, lon) {
    fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('city-input').value = data.name; // Set city input to detected location
                getAirQuality(lat, lon);
                displayWeather(data);
            } else {
                document.getElementById('weather-display').innerHTML = '<p class="warning">Location not found. Please try again.</p>';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getAirQuality(lat, lon) {
    fetch(`${airQualityApiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayAirQuality(data))
        .catch(error => console.error('Error fetching air quality data:', error));
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const temp = data.main.temp;
    const weatherDesc = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    let weatherIcon = '';

    // Determine the appropriate icon
    if (temp > 35 && weatherDesc.includes('clear')) {
        weatherIcon = '☀️';
    } else if (temp >= 25 && temp <= 30) {
        weatherIcon = '🌤️';
    } else if (weatherDesc.includes('rain') && weatherDesc.includes('heavy')) {
        weatherIcon = '🌧️';
    } else if (weatherDesc.includes('rain')) {
        weatherIcon = '🌦️';
    } else if (weatherDesc.includes('clouds') && temp < 20) {
        weatherIcon = '❄️';
    } else if (weatherDesc.includes('clouds')) {
        weatherIcon = '⛅';
    } else if (windSpeed > 10) {
        weatherIcon = '💨';
    } else if (humidity > 80) {
        weatherIcon = '🥵';
    }

    weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}, ${data.sys.country} ${weatherIcon}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Weather:</strong> ${weatherDesc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <p><strong>Wind Direction:</strong> ${data.wind.deg}°</p>
        <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
        <p><strong>Visibility:</strong> ${data.visibility} m</p>
        <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
    weatherDisplay.classList.remove('hidden'); // Show the weather display
}

function displayAirQuality(data) {
    const aqi = data.list[0].main.aqi;
    const aqiLevel = getAqiLevel(aqi);
    const airQualityDisplay = document.createElement('p');
    airQualityDisplay.innerHTML = `<strong>Air Quality Index (AQI):</strong> ${aqi} (${aqiLevel.description})`;
    airQualityDisplay.style.color = aqiLevel.color;
    document.getElementById('weather-display').appendChild(airQualityDisplay);
}

function getAqiLevel(aqi) {
    if (aqi <= 50) {
        return { description: 'Good', color: 'green' };
    } else if (aqi <= 100) {
        return { description: 'Moderate', color: 'yellow' };
    } else if (aqi <= 150) {
        return { description: 'Unhealthy for Sensitive Groups', color: 'orange' };
    } else if (aqi <= 200) {
        return { description: 'Unhealthy', color: 'red' };
    } else if (aqi <= 300) {
        return { description: 'Very Unhealthy', color: 'purple' };
    } else {
        return { description: 'Hazardous', color: 'maroon' };
    }
}
