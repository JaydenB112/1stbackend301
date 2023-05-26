const axios = require('axios');

class WeatherForecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
async function getWeather(lat, lon) {
    console.log("WEATHER_API_KEY", WEATHER_API_KEY)
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

    return weeklyForecast;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = getWeather;