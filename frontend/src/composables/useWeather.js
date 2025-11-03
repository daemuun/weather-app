import { ref } from "vue";

export function useWeather(city, lang) {
    const weather = ref(null);
    const loading = ref(false);
    const error = ref(null);


    async function fetchWeather() {
        loading.value = true;
        if (!city.value.trim()) {
            loading.value = false;
            weather.value = null;
            return;
        }

        try {
            const baseUrl = window.location.hostname === 'localhost'
                ? 'http://localhost:3000/api'
                : 'https://weather-app-0ulo.onrender.com/api';

            const url = `${baseUrl}/weather/${city.value}?lang=${lang.value}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            weather.value = data;
            localStorage.setItem("last-input", city.value);
        } catch (err) {
            console.error('Failed to fetch weather:', error);
            error.value = err;
            weather.value = null;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return { weather, loading, error, fetchWeather };
}
