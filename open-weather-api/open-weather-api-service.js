const axios = require("axios");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 5 * 60, checkperiod: 120 });

/**
 * This class is used retrieve weather data for a given city, by calling the Open Weather API.
 * See here for the Open Weather API documentation - https://openweathermap.org/current.
 */
class OpenWeatherAPIService {
  // The API key that is needed to successfully authenticate when calling the Open Weather API.
  // if this does not work, register one yourself using the instruction here: https://openweathermap.org/appid
  static apiKey = "480bdd4226f844eff4cede53daf507c7";

  /**
   * Retrieves the weather data for the given city by calling the Open Weather API.
   */
  async getWeather(cityName) {
    const cachedWeather = myCache.get(cityName);
    if (cachedWeather) {
      return cachedWeather;
    }
    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OpenWeatherAPIService.apiKey}`
    );
    myCache.set(cityName, weather.data);
    if (myCache.stats.keys > 5) {
      myCache.del(myCache.keys()[0]);
    }
    return weather.data;
  }

  async getCachedWeather(ammount) {
    const cachedWeather = [];
    let i = 0;
    let cities = myCache.keys();
    cities.forEach((city) => {
      if (cities.length - i > ammount) {
        i++;
        return;
      }
      cachedWeather.unshift(myCache.get(city));
    });
    return cachedWeather;
  }
}

module.exports = OpenWeatherAPIService;
