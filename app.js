const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var query = req.body.cityName;
  const apiKey = "ed11a5f25316d5afb1ad60b0b185a67c";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
  https.get(url, function(responce) {
    console.log(responce.statusCode);

    responce.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description
      console.log(temp);
      res.write("<h1>The weather in " + query + " is " + description + " with a temprature of " + temp + " celcius</h1>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("server running on 3000")
});
