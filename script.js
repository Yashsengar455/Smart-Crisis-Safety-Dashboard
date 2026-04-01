// 🔍 DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cardsContainer = document.getElementById("cardsContainer");
const loader = document.getElementById("loader");
const error = document.getElementById("error");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

// 🔑 API KEYS
const WEATHER_API_KEY = "e8b67a087834ac4643e405d8c13670fe";
const NEWS_API_KEY = "YOUR_API_KEY"; // optional

// 🌙 Dark Mode Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// ⏳ Loader
function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}

// 🌦 UPDATED WEATHER API (FIXED + SAFE)
async function fetchWeather(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!res.ok) {
        throw new Error("City not found");
    }

    const data = await res.json();

    return {
        type: "weather",
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed
    };
}

// 🌍 Earthquake API
async function fetchEarthquake() {
    const res = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    const data = await res.json();

    return data.features.map(eq => ({
        type: "earthquake",
        magnitude: eq.properties.mag,
        place: eq.properties.place,
        time: new Date(eq.properties.time).toLocaleString()
    }));
}

// 📰 News API (SAFE)
async function fetchNews() {
    try {
        const res = await fetch(
            `https://newsapi.org/v2/everything?q=disaster&apiKey=${NEWS_API_KEY}`
        );
        const data = await res.json();

        return data.articles.slice(0, 10).map(n => ({
            type: "news",
            title: n.title,
            description: n.description
        }));
    } catch {
        return []; // prevents crash
    }
}

// 🎴 Render Cards
function renderData(weather, data) {
    cardsContainer.innerHTML = "";

    // 🌦 WEATHER CARD (UPDATED UI)
    const weatherCard = `
        <div class="card">
            <h3>🌦 Weather - ${weather.city}</h3>
            <p>🌡 Temp: ${weather.temp}°C</p>
            <p>☁️ ${weather.description}</p>
            <p>💧 Humidity: ${weather.humidity}%</p>
            <p>💨 Wind: ${weather.wind} m/s</p>
        </div>
    `;
    cardsContainer.innerHTML += weatherCard;

    // Other Cards
    data.forEach(item => {
        let card = "";

        if (item.type === "earthquake") {
            card = `
                <div class="card">
                    <h3>🌍 Earthquake</h3>
                    <p>Magnitude: ${item.magnitude}</p>
                    <p>${item.place}</p>
                    <p>${item.time}</p>
                    <button onclick='saveFavorite(${JSON.stringify(item)})'>❤️ Save</button>
                </div>
            `;
        }

        if (item.type === "news") {
            card = `
                <div class="card">
                    <h3>📰 News</h3>
                    <p>${item.title}</p>
                    <p>${item.description || ""}</p>
                    <button onclick='saveFavorite(${JSON.stringify(item)})'>❤️ Save</button>
                </div>
            `;
        }

        cardsContainer.innerHTML += card;
    });
}

// ❤️ Save to Favorites
function saveFavorite(item) {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    favs.push(item);
    localStorage.setItem("favs", JSON.stringify(favs));
    alert("Saved to favorites!");
}

// 🔍 Filter Logic
let allData = [];
let currentWeather = {};

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");

        const type = btn.dataset.type;

        if (type === "all") {
            renderData(currentWeather, allData);
        } else {
            const filtered = allData.filter(item => item.type === type);
            renderData(currentWeather, filtered);
        }
    });
});

// 🔎 Debounce
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// 🔍 Search
const handleSearch = debounce(() => {
    const query = cityInput.value.toLowerCase();

    const filtered = allData.filter(item =>
        (item.place || item.title || "")
            .toLowerCase()
            .includes(query)
    );

    renderData(currentWeather, filtered);
}, 500);

cityInput.addEventListener("input", handleSearch);

// 🚀 Main Controller
searchBtn.addEventListener("click", async () => {
    const city = cityInput.value || "Delhi";

    try {
        showLoader();
        error.classList.add("hidden");

        const weather = await fetchWeather(city);
        const earthquakes = await fetchEarthquake();
        const news = await fetchNews();

        currentWeather = weather;
        allData = [...earthquakes, ...news];

        renderData(weather, allData);

        hideLoader();
    } catch (err) {
        hideLoader();
        error.classList.remove("hidden");
    }
});

// 🧪 Default Load
window.onload = () => {
    searchBtn.click();
};