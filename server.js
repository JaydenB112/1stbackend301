
// setting reuqirements
const express = require('express');
const data = require('./data/weather.json');
const app = express();
const cors = require('cors')
const axios = require('axios')
// const pickMovie = require ('./movie');
require('dotenv').config();

// initializing app
app.use(cors());
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get('/weather', async (request, response) => {
    const { lat, lon } = request.query;

    try {
        const weatherResponse = await axios.get(` http://api.weatherbit.io/v2.0/forecast/daily`, {
            params: {
                lat,
                lon,
                key: WEATHER_API_KEY,
            }
        });
        const weatherData = weatherResponse.data;

        // Shaping the weather data with this right here



        // Had to dry that code out
        // let latitude = request.query.lat;
        // let longitude = request.query.lon;
        // let search = request.query.searchQuery


        console.log(lat);
        console.log(lon);


        // Using find method and if statement to match the city name property in weather.json to whatever the user types in, if not returns an error.
        // const city = weatherData.city_name.toLowerCase();
        // made a small quality of life change with the city name property, making it non case sensitive.
        class WeatherForecast {
            constructor(date, description) {
                this.date = date;
                this.description = description;
            }
        }




        // This is where the data wrangling happens
        const weeklyForecast = weatherData.data.map((forecast) => {
            const date = new Date(forecast.datetime).toDateString();
            const description = forecast.weather.description;
            return new WeatherForecast(date, description);
        });
        response.json(weeklyForecast)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

class MovieResult {
    constructor(title, overview, releaseDate) {
        this.title = title;
        this.overview = overview;
        this.releaseDate = releaseDate;
    }
}

app.get('/movies', async (request, response) => {
    const movie = request.query.movie
    const city = request.query.city

    try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: process.env.MOVIE_API_KEY,
                query: movie
            }
        });

        const movies = movieResponse.data.results


        if (movies.length === 0) {
            response.status(400).send('No movies found');
        } else {
            const movieResults = movies.map((movie) => {
                const title = movie.title;
                const overview = movie.overview;
                const releaseDate = movie.release_date;
                return new MovieResult(title, overview, releaseDate);
            });
            response.json(movieResults);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// Simple proof of life check.
app.listen(3002, () => {
    console.log("Server Running on port 3002");
});   