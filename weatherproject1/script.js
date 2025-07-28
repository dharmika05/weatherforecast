function init(weatherData) {
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    switch (weatherData.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('images/clearsky.jpg')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('images/clearsky1.jpg')";
            break;
        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('images/rainy1.jpg')";
            break;
        case 'Mist':
            document.body.style.backgroundImage = "url('images/mist.jpeg')";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            break;
        default:
            document.body.style.backgroundImage = "url('images/2148933766.jpg')"; // fallback background
    }
}

async function getWeather(city) {
    const API_KEY = "4767455b1ffd7c81c6ee5ee22627c7d2"; // ✅ Your actual API key

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json();

        document.getElementById("para").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("para1").textContent = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById("para2").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("para3").textContent = `Wind Speed: ${data.wind.speed} m/s`;

        init(data);
    } catch (error) {
        alert("Error: " + error.message);
        document.getElementById("para").textContent = "Temperature:";
        document.getElementById("para1").textContent = "Pressure:";
        document.getElementById("para2").textContent = "Humidity:";
        document.getElementById("para3").textContent = "Wind Speed:";
    }
}

document.getElementById("buttonid").addEventListener("click", function () {
    const city = document.getElementById("cityname").value;
    if (city.trim() !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
