const apiKey = "69UaSUehZdiG09uRM7vjFS:01gc4i7KKTLY4HZauWH4ka";
const weatherInfo = document.getElementById("weather-info");
const refreshWeatherButton = document.getElementById("refreshWeather");

// Hava durumu bilgisini getir
function getWeather() {
  fetch("https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=siverek", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "authorization": `apikey ${apiKey}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const weather = data.result[0]; // İlk günün hava durumu
      weatherInfo.innerHTML = `
        <h3>Siverek, Şanlıurfa</h3>
        <p>${weather.date} (${weather.day})</p>
        <img id="icon" src="${weather.icon}" alt="Hava Durumu Simgesi" />
        <p>Durum: ${weather.description}</p>
        <p>Sıcaklık: ${weather.degree}°C (Min: ${weather.min}°C / Max: ${weather.max}°C)</p>
        <p>Nem: %${weather.humidity}</p>
      `;
    })
    .catch((error) => {
      console.error("Hava durumu bilgisi alınamadı:", error);
      weatherInfo.innerHTML = `<p>Hava durumu bilgisi getirilemedi. Lütfen daha sonra tekrar deneyin.</p>`;
    });
}

// Sayfa yüklendiğinde hava durumu getir
window.onload = getWeather;

// Yenileme butonuna tıklandığında hava durumu getir
refreshWeatherButton.addEventListener("click", getWeather);
