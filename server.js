const express = require('express')
const app = express()
const request = require('request');

app.get('/hi', function (req, res) {
    var city;
    if (req.query.city){
        city = req.query.city;
    }
    else
    {
        city = "london";
    }
    var yahooweather = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    request(yahooweather, function (error, response, body) {
        var weatherJson = {}
        if (error){
            response.status(500);
        }
        else {
            weatherJson = JSON.parse(body).query.results.channel.item.forecast[0];
            weatherJson.location = JSON.parse(body).query.results.channel.location;
            weatherJson.type = 0;
            weatherJson.speech = "Yo it looks like today will be a high of " +
                weatherJson.high + " and a low of " + weatherJson.low + ". Weather is " + 
                weatherJson.text + ". Don't forget to dress for the weather!";
            res.json(weatherJson);
        }
})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})