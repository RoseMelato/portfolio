/*const weatherIcons = {
    0: "☀️ Clear",
    1: "🌤️ Mainly Clear",
    2: "⛅ Partly Cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    48: "🌫️ Fog",
    51: "🌦️ Light Drizzle",
    53: "🌦️ Drizzle",
    55: "🌧️ Dense Drizzle",
    61: "🌦️ Slight Rain",
    63: "🌧️ Moderate Rain",
    65: "🌧️ Heavy Rain",
    66: "🌨️ Freezing Rain",
    67: "🌨️ Heavy Freezing Rain",
    71: "🌨️ Snowfall",
    73: "🌨️ Moderate Snow",
    75: "❄️ Heavy Snow",
    80: "🌦️ Rain Showers",
    81: "🌧️ Heavy Showers",
    82: "🌧️ Violent Showers",
    95: "⛈️ Thunderstorm",
    96: "⛈️ Storm with Hail",
    99: "🌩️ Severe Thunderstorm"
};*/

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = "";

  // Current weather
  const current = document.createElement("div");
  current.className = "weather-current";
  current.innerHTML = `<h3>Current Weather</h3>
    <p>${data.current_weather.temperature}°C</p>`;
  weatherDiv.appendChild(current);

  // Weekly forecast
  const forecast = document.createElement("div");
  forecast.className = "weather-forecast";
  forecast.innerHTML = "<h3>7-Day Forecast</h3>";
  
  for (let i = 0; i < data.daily.time.length; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "forecast-day";
    dayDiv.innerHTML = `
      <p><strong>${data.daily.time[i]}</strong></p>
      <p>High: ${data.daily.temperature_2m_max[i]}°C</p>
      <p>Low: ${data.daily.temperature_2m_min[i]}°C</p>
    `;
    forecast.appendChild(dayDiv);
  }

  weatherDiv.appendChild(forecast);
}

navigator.geolocation.getCurrentPosition(pos => {
  const { latitude, longitude } = pos.coords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => {
      document.getElementById("weather").textContent = "Failed to load weather.";
      console.error("Weather fetch error:", err);
    });
});

/* Set the width of the side navigation to 250px */
function openNav() {
document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}