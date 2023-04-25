const searchButton = document.querySelector(".btn");
const inputCity = document.querySelector("#inputCity");
const cityNameDate = document.querySelector("h4");
const currentWeatherCard = document.querySelector("#currentWeather .card-body");
const fiveDayForecast = document.querySelector("#fiveDayForecast");

searchButton.addEventListener("click", () => {
    fetchWeatherData(inputCity.value);
});

function fetchWeatherData(city) {
    const apiKey = "6cfcd046bcdbf5f166a9d037293881fc";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error("Error fetching weather data: ", error));
}