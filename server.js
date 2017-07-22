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
        else {
            weatherJson = JSON.parse(body).query.results.channel.item.forecast[0];
            var messages = [
                    {
                      "type": 0,
                      "speech": "Hi Welcome to the Weather App"
                    }
                  ]
            
            weatherJson.messages = messages;
            res.json(weatherJson);
        }
})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})