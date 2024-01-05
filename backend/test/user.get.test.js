const request = require("supertest");
const userdb = require("../src/db/userdb");
const app = require("../src/app");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg"

describe("GET /api/users endpoint", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
    });

    it("gets info about user through token", async () => {
        const user = {
            name:"Roman",
            email:"roman@gmail.com",
            password:"Pas$w0rd"
        };

        const creationResponse = await request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .send(user);
        const token = creationResponse.body.token;

        const response = await request(app)
        .get("/api/users")
        .set("authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.details.name).toEqual("Roman");
        expect(response.body.details.email).toEqual("roman@gmail.com");
        expect(response.body.details.image).toEqual(DEFAULT_IMAGE);
        expect(response.body.details.id).toBeDefined();
    });

    it("responds with an error cause of no token", async () => {
        const response = await request(app)
        .get("/api/users");

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("AuthorizationError");
        expect(response.body.details).toEqual("Missing token");
    });

    it("responds with an error cause of wrong token", async () => {
        const response = await request(app)
        .get("/api/users")
        .set("authorization", `Bearer SLKDJLIASJFLK`);

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("AuthorizationError");
        expect(response.body.details).toEqual("Unauthorized token");
    });
});
