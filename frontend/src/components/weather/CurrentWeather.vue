<template>
    <div class="current-weather">
        <div class="weather-icon">
            <img :src="`https://openweathermap.org/img/wn/${weather.current.icon}@2x.png`"
                :alt="weather.current.description">
        </div>
        <div class="weather-info">
            <h2>{{ weather.current.temperature }}{{ t('units.temperature') }}</h2>
            <p>
                {{ t('weather.feels_like') }}: {{ weather.current.feels_like }}{{ t('units.temperature') }}
            </p>
            <p>{{ weather.current.description }}</p>
            <p>{{ t('weather.humidity') }}: {{ weather.current.humidity }}%</p>
            <p>{{ t('weather.wind') }}: {{ weather.current.wind_speed }} {{ t('units.speed') }}</p>
            <p>{{ t('weather.pressure') }}: {{ weather.current.pressure }} {{ t('units.pressure') }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["weather", "t"]);
</script>

<style scoped>
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
</style>
