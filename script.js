window.addEventListener('DOMContentLoaded', () => {
  const weatherDiv = document.getElementById('weather');
  if (!weatherDiv) return;

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const apiKey = '4b404728ee614eeca31163050251606'; // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const city = data.name;
        const icon = data.weather[0].icon;
        weatherDiv.innerHTML = `
          <span style="display:flex;align-items:center;gap:4px;">
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather" style="height:24px;">
            ${city}: ${temp}°C
          </span>
        `;
      } catch (e) {
        weatherDiv.textContent = "Weather unavailable";
      }
    }, () => {
      weatherDiv.textContent = "Location denied";
    });
  } else {
    weatherDiv.textContent = "Geolocation not supported";
  }
});