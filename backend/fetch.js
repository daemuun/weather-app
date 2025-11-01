const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;

async function fetchWeatherFromAPI(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; // units=metric для °C

        const response = await fetch(url);
        const data = await response.json();

        const weather = {
            city: data.city.name,
            country: data.city.country,
            current: {
                temperature: Math.round(data.list[0].main.temp),
                feels_like: Math.round(data.list[0].main.feels_like),
                description: data.list[0].weather[0].description,
                icon: data.list[0].weather[0].icon,
                humidity: data.list[0].main.humidity,
                wind_speed: data.list[0].wind.speed,
                pressure: data.list[0].main.pressure
            },
            forecast: data.list.slice(0, 5).map(item => ({
                datetime: item.dt_txt,
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity
            })),
            daily: getDailyForecast(data.list)
        };

        return weather;
    } catch (e) {
        throw e;
    }
}

function getDailyForecast(list) {
    const daily = {};
    list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!daily[date]) {
            daily[date] = {
                date: date,
                min_temp: Math.round(item.main.temp_min),
                max_temp: Math.round(item.main.temp_max),
                icon: item.weather[0].icon,
                description: item.weather[0].description
            };
        } else {
            daily[date].min_temp = Math.min(daily[date].min_temp, Math.round(item.main.temp_min));
            daily[date].max_temp = Math.max(daily[date].max_temp, Math.round(item.main.temp_max));
        }
    });
    return Object.values(daily).slice(0, 5);
}

async function getCoordinates(city) {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            lat: data[0].lat,
            lon: data[0].lon
        }
    } catch (e) {
        throw e
    }
}

exports.fetchWeatherFromAPI = fetchWeatherFromAPI;
exports.getCoordinates = getCoordinates; 
