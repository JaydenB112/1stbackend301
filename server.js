
// setting reuqirements
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')
const axios = require('axios')
const getWeather = require('./Weather')
const searchMovies = require('./Movies')
const NodeCache = require('node-cache')
const myCache = new NodeCache();
// initializing app
app.use(cors());
app.get('/weather', async (request, response) => {
    const { lat, lon } = request.query;

    try {
        const weeklyForecast = await getWeather(lat, lon)
        response.json(weeklyForecast)
    }
    catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Failed to fetch weather data' });
    }
});



app.get('/movies', async (request, response) => {
    const movie = request.query.movie
    const city = request.query.city

    try {
        const movieResponse = await searchMovies(movie, city) 
            response.json(movieResponse)
    }
    
    catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});


// Simple proof of life check.
app.listen(3002, () => {
    console.log("Server Running on port 3002");
});   