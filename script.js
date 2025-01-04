const apiKey = "69UaSUehZdiG09uRM7vjFS:01gc4i7KKTLY4HZauWH4ka";
const citySelect = document.getElementById("city");
const districtSelect = document.getElementById("district");
const getWeatherBtn = document.getElementById("getWeather");
const weatherInfo = document.getElementById("weather-info");

// Tüm şehirleri getir
fetch("https://api.collectapi.com/weather/cityList", {
  method: "GET",
  headers: {
    "content-type": "application/json",
    "authorization": `apikey ${apiKey}`
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.result.forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  })
  .catch((error) => console.error("Şehir verileri alınamadı:", error));

// Şehir seçildiğinde ilçe verilerini al
citySelect.addEventListener("change", () => {
  const selectedCity = citySelect.value;

  if (selectedCity) {
    districtSelect.disabled = false;
    districtSelect.innerHTML = `<option value="">İlçe Seçin</option>`;

    fetch(`https://api.collectapi.com/weather/cityDistricts?city=${selectedCity}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `apikey ${apiKey}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        data.result.forEach((district) => {
          const option = document.createElement("option");
          option.value = district;
          option.textContent = district;
          districtSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("İlçe verileri alınamadı:", error));
  } else {
    districtSelect.disabled = true;
    districtSelect.innerHTML = `<option value="">Önce Şehir Seçin</option>`;
  }
});

// Hava durumu bilgilerini al
getWeatherBtn.addEventListener("click", () => {
  const city = citySelect.value;
  const district = districtSelect.value;

  if (city && district) {
    fetch(`https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=${district}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": `apikey ${apiKey}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const weather = data.result[0];
        weatherInfo.innerHTML = `
          <h3>${city} - ${district}</h3>
          <p>Tarih: ${weather.date} (${weather.day})</p>
          <img id="icon" src="${weather.icon}" alt="Weather Icon" />
          <p>Durum: ${weather.description}</p>
          <p>Sıcaklık: ${weather.degree}°C (Min: ${weather.min}°C / Max: ${weather.max}°C)</p>
          <p>Nem: %${weather.humidity}</p>
        `;
      })
      .catch((error) => console.error("Hava durumu bilgisi alınamadı:", error));
  }
});

// İlçe seçimi yapılmadan butonu pasif tut
districtSelect.addEventListener("change", () => {
  getWeatherBtn.disabled = !districtSelect.value;
});
