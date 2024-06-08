async function getWeather() {
    const apiKey = '4da6cf0c5a7cace8916bfc6d529afe24';
    let city = document.getElementById('city').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('error').classList.add('hidden');
    document.getElementById('weather-info').innerHTML = '';

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('loading').classList.add('hidden');

        if (response.ok) {
            const weatherInfo = `
                <h2 class="infohead">${data.name}</h2>
                <p class="info">Temperature: <span class="infospan"> ${data.main.temp}°C </span></p>
                <p class="info">Weather: <span class="infospan"> ${data.weather[0].description} </span></p>
                <p class="info">Humidity: <span class="infospan"> ${data.main.humidity}% </span></p>
                <p class="info">Wind Speed: <span class="infospan"> ${data.wind.speed} m/s </span></p>
                <p class="info">Pressure: <span class="infospan"> ${data.main.pressure} hPa </span></p>
                <p class="info">Visibility: <span class="infospan"> ${data.visibility / 1000} km </span></p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
            console.error('Error fetching weather data:', data);
            document.getElementById('error').innerText = `Error: ${data.message}`;
            document.getElementById('error').classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').innerText = 'Error fetching weather data!';
        document.getElementById('error').classList.remove('hidden');
    }
}
