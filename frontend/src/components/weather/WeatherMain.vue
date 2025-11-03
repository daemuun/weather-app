<template>
    <main class="main">
        <div class="weather-content">
            <CurrentWeather :weather="weather" :t="t" />

            <div class="forecast">
                <h3>{{ t('weather.forecast_title') }}:</h3>
                <div class="daily-cards">
                    <DailyCard v-for="day in weather.daily" :key="day.date" :day="day" :lang="currentLang" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import CurrentWeather from '@/components/weather/CurrentWeather.vue';
import DailyCard from '@/components/weather/DailyCard.vue';

defineProps(["weather", "t", "currentLang"]);
</script>

<style scoped>
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

.forecast h3 {
    margin-bottom: 15px;
}

.daily-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
}
</style>
