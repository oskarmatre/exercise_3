import express from 'express'
import OpenWeatherAPIService from "../../open-weather-api/open-weather-api-service.js";
const router = express.Router();

router.get("/:city", function (req, res) {
  //TODO Implement
  const openWeatherAPIServiceInstance = new OpenWeatherAPIService();
  openWeatherAPIServiceInstance
    .getWeather(req.params.city)
    .then((weather) => {
      const weather2 = {
        weatherDescription: weather.weather[0].description,
        temperature: Math.round(weather.main.temp_min - 273.15),
        cityName: weather.name,
      };

      res.send(weather2);
    })
    .catch((err) => {
      res.status(404).send("404 Not found");
    });
});

router.get("/", function (req, res) {
  //TODO Implement
  try {
  } catch (error) {}
});


export default router;
