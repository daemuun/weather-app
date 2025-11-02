const express = require("express");
const { fetchWeatherFromAPI, getCoordinates } = require("./fetch");

const PORT = process.env.PORT || 3000;

const app = express();

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const weatherCache = {};
const CACHE_LIFE_TIME = 10 * 60 * 1000;

app.get('/api/weather/:city', async (req, res) => {
    try {
        const { city } = req.params;
        const { lang = 'en' } = req.query;

        const cacheKey = `${city.toLowerCase()}_${lang}`;
        const now = Date.now();

        if (weatherCache[cacheKey] && (now - weatherCache[cacheKey].timestamp < CACHE_LIFE_TIME)) {
            console.log("Get city weather by cache");
            return res.json(weatherCache[cacheKey].data);
        }

        const { lat, lon } = await getCoordinates(city);
        const weatherData = await fetchWeatherFromAPI(lat, lon, lang);

        weatherCache[cacheKey] = {
            data: weatherData,
            timestamp: now
        }

        res.json(weatherData);
    } catch (e) {
        console.log("Failed to get weather by city: ", e.message);
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
});

app.get('/api/weather/coordinates', async (req, res) => {
    try {
        const { lat, lon, lang='en' } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Lat and lon parameters are required' });
        }

        const weatherData = await fetchWeatherFromAPI(parseFloat(lat), parseFloat(lon), lang);

        res.json(weatherData);
    } catch (e) {
        console.log("Failed to get weather by coordinats", e.message);
        res.status(500).json({ error: 'Failed to fetch weather' });
    }
});

app.get('/api/health', (_, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        cacheSize: Object.keys(weatherCache).length
    });
});

setInterval(() => { 
    const now = Date.now();
    Object.keys(weatherCache).forEach( key => {
        if (now - weatherCache[key].timestamp > CACHE_LIFE_TIME * 2) {
            delete weatherCache[key]
        }
    });
}, 60 * 60 * 3600);

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});
