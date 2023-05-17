
// setting reuqirements
const express = require('express');
const data = require('./data/weather.json');
const app = express();
const cors = require('cors')

// initializing app
app.use(cors());

app.get('/weather',(request, response) => {
    //http://localhost:3000/?lat=${lat}?lon=${lon}
    let latitude = request.query.lat;
    let longitude = request.query.lon;
    let search = request.query.searchQuery

    console.log(latitude);
    console.log(longitude);
    console.log(search);
    // Using find method and if statement to match the city name property in weather.json to whatever the user types in, if not returns an error.
    let city = data.find((element)=> {
        if (element.city_name === search){
            return true
        }else{
          return false
        }
    })
    console.log(city)
    response.status(400).send('You Suck')
})
// Simple proof of life check.
app.listen(3002,() => {
    console.log("Server Running on port 3002");
});


