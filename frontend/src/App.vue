<template>
    <AppLayout v-if="weather" :weather="weather" :t="t" :currentLang="currentLang" :city="city"
        @update:city="handleCityUpdate" @update:lang="handleLangUpdate" />
    <LoadingLayout v-else-if="loading" :t="t" />
    <ErrorLayout v-else-if="error" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLocalization } from '@/composables/useLocalization'
import { useWeather } from '@/composables/useWeather';

import AppLayout from '@/components/layout/AppLayout.vue';
import LoadingLayout from '@/components/layout/LoadingLayout.vue';
import ErrorLayout from '@/components/layout/ErrorLayout.vue';

let city = ref(localStorage.getItem("last-input") || "Москва");

const { t, currentLang, setLanguage } = useLocalization();
const { weather, loading, error, fetchWeather } = useWeather(city, currentLang);

const handleCityUpdate = (newCity) => {
    city.value = newCity;
    fetchWeather();
};

const handleLangUpdate = (newLang) => {
    setLanguage(newLang);
};

watch(currentLang, fetchWeather);

onMounted(() => {
    fetchWeather();
});
</script>

<style>
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
    line-height: 1.5;
    color: #333;
    background-color: #f5f5f5;
}

#app {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 768px) {
    #app {
        padding: 16px;
    }
}
</style>
