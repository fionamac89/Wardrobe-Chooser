const express = require('express')
const app = express()
const yahooweather = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22London%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
const request = require('request');

app.get('/hi', function (req, res) {
    request(yahooweather, function (error, response, body) {
        var weatherJson = {}
        if (error){
            response.status(500);
        }
        else
            weatherJson = JSON.parse(body).query.results.channel.item.forecast[0];
            weatherJson.type = 0;

            res.json(weatherJson);
        }
})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function getDressCode(weatherJson){
    var dressCode = "";
    var weather = weatherJson.text;
    switch (weather) {
        case 'Sunny':
            dressCode ="Looks like it's going to be sunny today. Make sure to pack your sun care products";
            break;
        case 'Cloudy':
            dressCode ="Looks like it's going to be cloudy today!";
            break;
        case 'Rain':
            dressCode ="Looks like it's going to be rainy today!. Dont forget your umbrella";
            break;
        case 'Scatterd Showers':
            weatherJson.speech ="Looks like it's going to be scattered showers today!. Dont forget your umbrella";
            break;

        defaultStatus:
        dressCode = '';

    }
    return dressCode;
}