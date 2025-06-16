
  const apiKey = "b404728ee614eeca31163050251606";

  function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = "";

        data.daily.slice(0, 7).forEach(day => {
          const date = new Date(day.dt * 1000);
          const weatherHTML = `
            <div class="day">
              <p><strong>${date.toDateString()}</strong></p>
              <p>${day.weather[0].description}</p>
              <p>🌡️ High: ${day.temp.max}°C | Low: ${day.temp.min}°C</p>
            </div>
          `;
          forecastDiv.innerHTML += weatherHTML;
        });
      })
      .catch(err => console.error("Error fetching weather:", err));
  }

  function getLocationAndWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        getWeather(position.coords.latitude, position.coords.longitude);
      }, () => {
        alert("Location permission denied. Weather info unavailable.");
      });
    } else {
      alert("Geolocation not supported by this browser.");
    }
  }

  window.onload = getLocationAndWeather;