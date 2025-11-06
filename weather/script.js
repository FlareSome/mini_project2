const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "5d8c5e7367e940dea8d52518250211";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
        }
    }
    else{
        displayError("Please Enter a City");
    }

});

async function getWeatherData(city){
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not Fetch Weather Data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const {
    location: { name: city },
    current: { temp_c, humidity, condition: { text: description, code: id }}} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp_c}°C`;
    descDisplay.textContent = description;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case weatherId === 1000:
            return "☀️";
        case [1003, 1006, 1009].includes(weatherId):
            return "🌤️";
        case [1030, 1135, 1147].includes(weatherId):
            return "🌫️";
        case [1063,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201].includes(weatherId):
            return "🌧️";
        case [1066,1069,1072,1114,1117,1204,1207,1210,1213,1216,1219,1222,1225,1237].includes(weatherId):
            return "❄️";
        case [1087,1273,1276,1279,1282].includes(weatherId):
            return "⛈️";
        default:
            return "🌍";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}