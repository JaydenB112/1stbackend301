
// setting reuqirements
const express = require('express');
const data = require('./data/weather.json');
const app = express();
const cors = require('cors')

// initializing app
app.use(cors());
const key = `pk.902568bedc8c71fb56e9015fafd54864`
app.get('/weather', (request, response) => {
    const { lat, lon, searchQuery } = request.query;
    // Had to dry that code out
    // let latitude = request.query.lat;
    // let longitude = request.query.lon;
    // let search = request.query.searchQuery

    console.log(lat);
    console.log(lon);
    console.log(searchQuery);
    // Using find method and if statement to match the city name property in weather.json to whatever the user types in, if not returns an error.
    const city = data.find((element) => element.city_name === searchQuery);

    if (city !== undefined) {
        // This is where the data wrangling happens
        const weather = city.data.map((forecast) => {
            const newDate = new Date(forecast.datetime).toDateString();
            const description = forecast.weather.description;
            return { date: newDate, description: description };
        })
        console.log(weather);
        response.json(weather);

    } else {
        response.status(500).json({ error: 'City not found' });
    }
});

const handleCitySearch = (searchQuery) => {
    fetch()

}

// let city = data.find((element)=> {
//     if (element.city_name === search){
//         return true
//     }else{
//       return false
//     }
// })



// Simple proof of life check.
app.listen(3002, () => {
    console.log("Server Running on port 3002");
});


