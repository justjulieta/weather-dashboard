const searchButton = document.querySelector(".btn");
const inputCity = document.querySelector("#inputCity");
const cityNameDate = document.querySelector("h4");
const currentWeatherCard = document.querySelector("#currentWeather .card-body");
const fiveDayForecast = document.querySelector("#fiveDayForecast");

searchButton.addEventListener("click", () => {
    fetchWeatherData(inputCity.value);
});

function fetchWeatherData(city) {
    const apiKey = "d593c9003673ebe0a9942c204c0ce980";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error("Error fetching weather data: ", error));
}

function displayWeatherData(data) {
    cityNameDate.textContent = `${data.city.name} and ${dayjs().format("MM/DD/YYYY")}`;

    const currentWeatherData = data.list[0];
    currentWeatherCard.querySelector(".temp").textContent = `Temp: ${currentWeatherData.main.temp} °F`;
    currentWeatherCard.querySelector(".wind").textContent = `Wind: ${currentWeatherData.wind.speed} mph`;
    currentWeatherCard.querySelector(".humidity").textContent = `Humidity: ${currentWeatherData.main.humidity}%`;

    for (let i = 0; i < 5; i++) {
        const forecastData = data.list[(i + 1) * 8];
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Date: ${dayjs(forecastData.dt_txt).format("MM/DD/YYYY")}</h5>
                    <p class="temp">Temp: ${forecastData.main.temp} °F</p>
                    <p class="wind">Wind: ${forecastData.wind.speed} mph</p>
                    <p class="humidity">Humidity: ${forecastData.main.humidity}%</p>
                   
                </div>
            </div>
            </div>
        `;
        fiveDayForecast.appendChild(card);
    }
}