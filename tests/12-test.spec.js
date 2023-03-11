import request from 'supertest';
import app from '../server/app';
/**
 * 
 * Step 3 - Create own tests
 * Create your own test file (tests/mygroupnumber-test.spec.js) to validate all other requirements that are not mentioned 
 * in [tests/weather-buddy-api.spec.js]. Use Jest as the testing framework. All the tests you created in 
 * [tests/mygroupnumber-test.spec.js] should pass.
 * 
 * The data for any city should only live in the cache for a maximum time of 5 minutes.
 * If the data is not available from the Open Weather API for the given city, throw a `404` Not Found error.
 * 
 * Gets the data for all cities currently in the cache.
 * If the max query parameter is specified, return the latest entries, otherwise, return the 5 latest entries. 
 * The cache should have a maximum of 5 entries.
 * 
 * For example, if there are 4 entries in the cache, and max is 2, then return the data for 2 latest entries. 
 * If max is not specified, then return the data for all entries.
 * 
 * If max is < 1, throw a `400` Bad Request error.
 * If max is greater than the number of entries currently in the cache, return all entries.
 * 
 * --------- OTHER REQUIREMENTS NOT TESTED -------------
 * 
 * 1. The data for any city should only live in the cache for a maximum time of 5 minutes.
 * 
 * 2. If the data is not available from the Open Weather API for the given city, throw a `404` Not Found error. DONE?
 * 
 * 3. If max is < 1, throw a `400` Bad Request error.
 * 
 * 
 * 
 */

describe("Test other requirements", () => {

    // Adding 3 cities to cache
    it("Test Get City London", async () => {
        const response = await request(app).get("/weather/London");
        const body = response.body
        expect(response.statusCode).toBe(200);
        expect(body.cityName).toBe('London');
        expect(body.temperature).toBeDefined();
        expect(body.weatherDescription).toBeDefined();
    });

    it("Test Get City Paris", async () => {
        const response = await request(app).get("/weather/Paris");
        expect(response.statusCode).toBe(200);
        expect(response.body.cityName).toBe('Paris');
    });

    it("Test Get City Tokyo", async () => {
        const response = await request(app).get("/weather/Tokyo");
        const cityList = response.body
        expect(response.statusCode).toBe(200);
        expect(response.body.cityName).toBe('Tokyo');
    });

    // Now our tests:

    it("Test Get City Tronddheim, Should throw 404", async () => {
        const response = await request(app).get("/weather/Tronddheim");
        expect(response.statusCode).toBe(404);
    });

    it("Test Get First 2 Cities in Cache", async () => {
        const response = await request(app).get("/weather/?max=0");
        expect(response.statusCode).toBe(400);
    });

    it("Test Get City London", async () => {
        const response = await request(app).get("/weather/London");
        const body = response.body
        expect(response.statusCode).toBe(200);
        expect(body.cityName).toBe('London');
        expect(body.temperature).toBeDefined();
        expect(body.weatherDescription).toBeDefined();
    });

    
});
