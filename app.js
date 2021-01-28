const { query } = require('express');
const express = require('express');
const { STATUS_CODES } = require('http');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "9d71ec58a6fbcb973a880cd70d1d4311";
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "";

    https.get(url, function (response) {

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>")
            res.write("<p>The current weather is " + description + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })

    })
});



app.listen(3000, function () {
    console.log("3000 status = ON");
});