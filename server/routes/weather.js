import express from 'express'
import OpenWeatherAPIService from "../../open-weather-api/open-weather-api-service.js";
const router = express.Router();

router.get("/:city", function (req, res) {
  const openWeatherAPIServiceInstance = new OpenWeatherAPIService();
  openWeatherAPIServiceInstance
    .getWeather(req.params.city)
    .then((weather) => {
      res.send({
        cityName: weather.name,
        temperature: Math.round(weather.main.temp_min - 273.15),
        weatherDescription: weather.weather[0].description,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("404 Not found");
    });
});

router.get("/", function (req, res) {
  const openWeatherAPIServiceInstance = new OpenWeatherAPIService();
  openWeatherAPIServiceInstance
    .getCachedWeather(req.query.max ? req.query.max : 5)
    .then((weather) => {
      if (typeof weather === "string") {
        res
          .status(400)
          .send("400 Bad request " + req.query.max + " is not a valid amount");
        return;
      }
      let cityList = [];
      for (const [key, city] of Object.entries(weather)) {
        cityList.push({
          cityName: city.name,
          temperature: Math.round(city.main.temp_min - 273.15),
          weatherDescription: city.weather[0].description,
        });
      }
      res.send(cityList);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send("400 Bad request " + req.query.max + " is not a valid amount");
    });
});


export default router;
