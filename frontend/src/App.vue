<template>
    <div id="main-container">
        <header class="header">
            <div class="search-group">
                <input v-model="city" :placeholder="t('header.input_placeholder')" @keyup.enter="fetchWeather">
                <button type="submit" @click="fetchWeather">
                    {{ t('header.search_button') }}
                </button>
            </div>
            <select v-model="currentLang" @change="setLanguage(currentLang)">
                <option value="ru">Русский</option>
                <option value="en">English</option>
            </select>
        </header>

        <main class="main">
            <div v-if="weather" class="weather-content">
                <div class="current-weather">
                    <div class="weather-icon">
                        <img :src="`https://openweathermap.org/img/wn/${weather.current.icon}@2x.png`" :alt="weather.current.description">
                    </div>
                    <div class="weather-info">
                        <h2>{{ weather.current.temperature }}{{ t('units.temperature') }}</h2>
                        <p>{{ t('weather.feels_like') }}: {{ weather.current.feels_like }}{{ t('units.temperature') }}</p>
                        <p>{{ weather.current.description }}</p>
                        <p>{{ t('weather.humidity') }}: {{ weather.current.humidity }}%</p>
                        <p>{{ t('weather.wind') }}: {{ weather.current.wind_speed }} {{ t('units.speed') }}</p>
                        <p>{{ t('weather.pressure') }}: {{ weather.current.pressure }} {{ t('units.pressure') }}</p>
                    </div>
                </div>
                
                <div class="forecast">
                    <h3>{{ t('weather.forecast_title') }}:</h3>
                    <div class="daily-cards">
                        <div v-for="day in weather.daily" :key="day.date" class="day-card">
                            <p><strong>{{ formatDate(day.date) }}</strong></p>
                            <img :src="`https://openweathermap.org/img/wn/${day.icon}.png`" :alt="day.description">
                            <p>{{ day.min_temp }}° / {{ day.max_temp }}°</p>
                            <p>{{ day.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="loading">
                {{ t('weather.loading') }}
            </div>
        </main>

        <footer class="footer">
            {{ weather?.city }}, {{ weather?.country }}
        </footer>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useLocalization } from '@/composables/useLocalization'

const { t, currentLang, setLanguage } = useLocalization()

const weather = ref(null)
let city = ref(localStorage.getItem("last-input") || "Москва");

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'short' 
    });
}

async function fetchWeather() {
    if (!city.value.trim()) return;
    
    try {
        const url = `http://localhost:3000/api/weather/${city.value}?lang=${currentLang.value}`;
        const response = await fetch(url);
        const data = await response.json();
        weather.value = data;
        localStorage.setItem("last-input", city.value);
    } catch (error) {
        console.error('Failed to fetch weather:', error);
    }
}

onMounted(() => {
    fetchWeather();
});
</script>

<style scoped>
#main-container {
    padding: 20px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    width: 60%;
    display: flex;
    justify-content: space-between;
    background: #e0e0e0;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
}

.search-group {
    display: flex;
    gap: 10px;
}

.search-group input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex-grow: 1;
}

.search-group button {
    padding: 8px 16px;
    background: #a730a1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.main {
    width: 60%;
    background: #e0e0e0;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    flex-grow: 1;
    border-radius: 8px;
}

.weather-content {
    width: 100%;
}

.current-weather {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.weather-info h2 {
    margin: 0 0 10px 0;
    font-size: 2em;
}

.weather-info p {
    margin: 5px 0;
}

.forecast h3 {
    margin-bottom: 15px;
}

.daily-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}

.day-card {
    background: white;
    padding: 15px;
    border-radius: 6px;
    text-align: center;
}

.day-card p {
    margin: 5px 0;
}

.footer {
    width: 60%;
    background: #e0e0e0;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 8px;
    text-align: center;
}

.loading {
    text-align: center;
    padding: 40px;
}
</style>
