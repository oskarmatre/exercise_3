const axios = require("axios");
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
    //TODO: Implement...
    const weather = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OpenWeatherAPIService.apiKey}`
    );
    return weather.data;
  }
}

module.exports = OpenWeatherAPIService;
