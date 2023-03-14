import request from 'supertest';
import app from '../server/app';

describe("Test other requirements", () => {
    // 1. If the data is not available from the Open Weather API for the given city, throw a `404` Not Found error.
    it("Test If the data is not available for the given city, throw a `404` Not Found error", async () => {
        const response = await request(app).get("/weather/Oooslo");
        expect(response.statusCode).toBe(404);
    });

    it("Test If the data is not available for the given city, throw a `404` Not Found error", async () => {
        const response = await request(app).get("/weather/Trooondheim");
        expect(response.statusCode).toBe(404);
    });

    it("Test If the data is available for the given city, throw a `200` OK", async () => {
        const response = await request(app).get("/weather/Oslo");
        expect(response.statusCode).toBe(200);
    });

    // 2. If max is < 1, throw a `400` Bad Request error.
    it("Test if max is < 1, throw a `400` Bad Request error", async () => {
        const response = await request(app).get("/weather/?max=0");
        expect(response.statusCode).toBe(400);
    });

    it("Test if max is > 1, throw a `200` OK", async () => {
        const response = await request(app).get("/weather/?max=2");
        expect(response.statusCode).toBe(200);
    });

    // 3. If max is greater than the number of entries currently in the cache, return all entries.    
    it("Test get city `Oslo`", async () => {
        const response = await request(app).get("/weather/Oslo");
        expect(response.statusCode).toBe(200);
        expect(response.body.cityName).toBe('Oslo');
    });

    it("Test get city `Trondheim`", async () => {
        const response = await request(app).get("/weather/Trondheim");
        expect(response.statusCode).toBe(200);
        expect(response.body.cityName).toBe('Trondheim');
    });

    it("Test get city `Bergen`", async () => {
        const response = await request(app).get("/weather/Bergen");
        expect(response.statusCode).toBe(200);
        expect(response.body.cityName).toBe('Bergen');
    });

    it("Test if max is greater than the number of entries currently in the cache, return all entries", async () => {
        const response = await request(app).get("/weather/?max=4");
        const cityList = response.body
        expect(response.statusCode).toBe(200);
        expect(cityList.length).toBe(3);
        expect(cityList[0].cityName).toBe('Bergen');
        expect(cityList[1].cityName).toBe('Trondheim');
        expect(cityList[2].cityName).toBe('Oslo');
    });

});
