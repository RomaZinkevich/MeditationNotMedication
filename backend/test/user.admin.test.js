const request = require("supertest");
const userdb = require("../src/db/userdb");
const app = require("../src/app");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg"

describe("GET /api/users/admin endpoint", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
    });

    it("gets info about user through token", async () => {
        const user = {
            email:"ADMIN",
            password:"admin"
        };

        const creationResponse = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .send(user);
        const token = creationResponse.body.token;

        const response = await request(app)
        .get("/api/users/admin")
        .set("authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.details[0].user_id).toBeDefined();
        expect(response.body.details[0].user_name).toEqual("Roman");
        expect(response.body.details[0].email).toEqual("RomanZin@gmail.com");
        expect(response.body.details[0].image).toEqual(DEFAULT_IMAGE);
        expect(response.body.details[0].role).toEqual(0);
        expect(response.body.details[1].user_id).toBeDefined();
        expect(response.body.details[1].user_name).toEqual("ADMIN");
        expect(response.body.details[1].email).toEqual("ADMIN");
        expect(response.body.details[1].image).toEqual(DEFAULT_IMAGE);
        expect(response.body.details[1].role).toEqual(1);
    });

    it("responds with an error cause of wrong token", async () => {
        const user = {
            email:"RomanZin@gmail.com",
            password:"Pa$sw0rd"
        };

        const creationResponse = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .send(user);
        const token = creationResponse.body.token;

        const response = await request(app)
        .get("/api/users/admin")
        .set("authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("AuthenticationError");
        expect(response.body.details).toEqual("No rights to access this endpoint");
    });
});
