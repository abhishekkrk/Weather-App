const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "9c1e3e8e909daec8c7785659dd5ec5f7"; // Corrected variable name

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city); // Corrected function name
            displayWeatherData(weatherData); // Corrected function name
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city"); // Corrected error message
    }
});

async function getWeatherData(city) { // Corrected function name
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // Corrected variable name
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data"); // Corrected error message
    }
    return await response.json();
}

function displayWeatherData(data) { // Corrected function name
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    card.innerHTML = ""; // Used innerHTML instead of textContent to clear the card
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1)}°F`; // Converted temperature to Fahrenheit
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) { // Corrected function name
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.innerHTML = ""; // Used innerHTML instead of textContent to clear the card
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
