const axios = require('axios');
const cache = require('./cache.js');

class WeatherForecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
async function getWeather(lat, lon) {
    console.log("WEATHER_API_KEY", WEATHER_API_KEY)
    const cacheKey = `weather-${lat}-${lon}`;
    const cachedData = cache[cacheKey];


    if(cachedData){
      console.log('Cache Hit');
      return cachedData;
    }
  try {
    const weatherResponse = await axios.get('http://api.weatherbit.io/v2.0/forecast/daily', {
      params: {
        lat,
        lon,
        key: WEATHER_API_KEY,
      },
    });
    const weatherData = weatherResponse.data;

    const weeklyForecast = weatherData.data.map((forecast) => {
      const date = new Date(forecast.datetime).toDateString();
      const description = forecast.weather.description;
      return new WeatherForecast(date, description);
    });

    cache.set(cacheKey,weeklyForecast, 3600);
    console.log('Cache Miss');
    cache[cacheKey] = weeklyForecast;
   
   
    return weeklyForecast;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = getWeather;