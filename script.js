// ====== THEME TOGGLE ======
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme")
  || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "☀️" : "🌙";
});

// ====== FOOTER YEAR ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== TABS ======
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("tab--active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("panel--active"));
    tab.classList.add("tab--active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("panel--active");
  });
});

// ====== WEATHER (Open-Meteo, no API key) ======
const weatherBtn = document.getElementById("weatherBtn");
const weatherCity = document.getElementById("weatherCity");
const weatherResult = document.getElementById("weatherResult");

async function getWeather() {
  const city = weatherCity.value.trim();
  if (!city) return;
  weatherResult.innerHTML = "Loading...";
  try {
    // 1. Geocode
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geo = await geoRes.json();
    if (!geo.results?.length) {
      weatherResult.innerHTML = `<p>City not found.</p>`;
      return;
    }
    const { latitude, longitude, name, country } = geo.results[0];

    // 2. Weather
    const wRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
    );
    const w = await wRes.json();
    const c = w.current;
    weatherResult.innerHTML = `
      <h4>${name}, ${country}</h4>
      <p>🌡️ Temperature: <b>${c.temperature_2m}°C</b></p>
      <p>💧 Humidity: <b>${c.relative_humidity_2m}%</b></p>
      <p>💨 Wind: <b>${c.wind_speed_10m} km/h</b></p>
    `;
  } catch (e) {
    weatherResult.innerHTML = `<p>Error fetching weather. Try again.</p>`;
  }
}
weatherBtn.addEventListener("click", getWeather);
weatherCity.addEventListener("keydown", e => { if (e.key === "Enter") getWeather(); });

// ====== GITHUB PROFILE ======
const ghBtn = document.getElementById("ghBtn");
const ghUser = document.getElementById("ghUser");
const ghResult = document.getElementById("ghResult");

async function getGithub() {
  const user = ghUser.value.trim();
  if (!user) return;
  ghResult.innerHTML = "Loading...";
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}`);
    if (!res.ok) {
      ghResult.innerHTML = `<p>User not found.</p>`;
      return;
    }
    const u = await res.json();
    ghResult.innerHTML = `
      <div class="result__profile">
        <img src="${u.avatar_url}" alt="${u.login}" />
        <div>
          <h4>${u.name || u.login}</h4>
          <p>${u.bio || ""}</p>
          <p>👥 ${u.followers} followers · 📦 ${u.public_repos} repos</p>
          <a href="${u.html_url}" target="_blank" rel="noopener">View Profile →</a>
        </div>
      </div>
    `;
  } catch (e) {
    ghResult.innerHTML = `<p>Error. Try again.</p>`;
  }
}
ghBtn.addEventListener("click", getGithub);
ghUser.addEventListener("keydown", e => { if (e.key === "Enter") getGithub(); });

// ====== PASSWORD GENERATOR ======
const pwBtn = document.getElementById("pwBtn");
const pwResult = document.getElementById("pwResult");

pwBtn.addEventListener("click", () => {
  const len = parseInt(document.getElementById("pwLen").value) || 16;
  const useUpper = document.getElementById("pwUpper").checked;
  const useLower = document.getElementById("pwLower").checked;
  const useNum = document.getElementById("pwNum").checked;
  const useSym = document.getElementById("pwSym").checked;

  let chars = "";
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useNum)   chars += "0123456789";
  if (useSym)   chars += "!@#$%^&*()-_=+[]{};:,.<>?";

  if (!chars) {
    pwResult.innerHTML = "<p>Pick at least one character set.</p>";
    return;
  }

  const arr = new Uint32Array(len);
  crypto.getRandomValues(arr);
  let out = "";
  for (let i = 0; i < len; i++) out += chars[arr[i] % chars.length];

  pwResult.innerHTML = `
    <div class="result__pw">${out}</div>
    <button class="btn btn--ghost" style="margin-top:.75rem" onclick="navigator.clipboard.writeText('${out}')">📋 Copy</button>
  `;
});
