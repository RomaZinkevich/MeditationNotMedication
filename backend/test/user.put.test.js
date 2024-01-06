const request = require("supertest");
const jwt = require("jsonwebtoken");
const userdb = require("../src/db/userdb");
const app = require("../src/app");

const DEFAULT_IMAGE = "https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg"
  
describe("PUT /api/users endpoint", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
    });

    it("changes user data through token", async () => {
        const user = {
            name:"Roman",
            email:"roman@gmail.com",
            password:"Pas$w0rd"
        };
        const updatedUser = {
            image:"image.png"
        }

        const creationResponse = await request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .send(user);
        const token = creationResponse.body.token;

        const response = await request(app)
        .put("/api/users")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(200);
        
        expect(response.body.status).toEqual("success");
        expect(response.body.details.role).toEqual(0);
        expect(response.body.details.name).toEqual("Roman");
        expect(response.body.details.email).toEqual("roman@gmail.com");
        expect(response.body.details.image).toEqual("image.png");
        expect(response.body.details.id).toBeDefined();
    });

    it("responds with an error due to non-existing id in token", async () => {
        const user = {
            id: 101,
            name: "Zhiyuan",
            image: DEFAULT_IMAGE
        }

        const updatedUser = {
            image:"image.png"
        }

        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });

        const response = await request(app)
        .put("/api/users")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(400);
        
        expect(response.body.type).toEqual("UserDatabaseError");
        expect(response.body.details).toEqual("User doesn't exist");
    });

    it("responds with an error due to no data to change", async () => {
        const user = {
            name:"Roman",
            email:"roman11@gmail.com",
            password:"Pas$w0rd"
        };

        const updatedUser = {
            password: "Something"
        }

        const creationResponse = await request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .send(user);
        const token = creationResponse.body.token;

        const response = await request(app)
        .put("/api/users")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("UserDatabaseError");
        expect(response.body.details).toEqual("No new data provided for update");
    });
  });

  
describe("PUT /api/users/password endpoint", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
    });

    it("changes user password", async () => {
        const user = {
            name:"Roman",
            email:"roman@gmail.com",
            password:"Pas$w0rd"
        };
        const updatedUser = {
            password:"Pass@w0rD"
        }

        const creationResponse = await request(app)
        .post("/api/users")
        .set("Accept", "application/json")
        .send(user);
        const token = await creationResponse.body.token;
        user.password = updatedUser.password;

        const response = await request(app)
        .put("/api/users/password")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.details.name).toEqual("Roman");
        expect(response.body.details.email).toEqual("roman@gmail.com");
        expect(response.body.details.image).toEqual(DEFAULT_IMAGE);
        expect(response.body.details.id).toBeDefined();

        const loginResponse = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .send(user);

        expect(loginResponse.statusCode).toBe(200);

    });

    it("responds with an error due to non-existing id in token", async () => {
        const user = {
            id: 101,
            name: "Zhiyuan",
            image: DEFAULT_IMAGE
        }

        const updatedUser = {
            password:"Pa$sw0rd"
        }

        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });

        const response = await request(app)
        .put("/api/users/password")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(400);

        expect(response.body.type).toEqual("UserDatabaseError");
        expect(response.body.details).toEqual("User doesn't exist");
    });

    it("responds with an error due to no password", async () => {
        const user = {
            id: 101,
            name: "Zhiyuan",
            image: DEFAULT_IMAGE
        }

        const updatedUser = {
            image: "image.png"
        }

        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
            expiresIn: "10m",
        });

        const response = await request(app)
        .put("/api/users/password")
        .set("authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(updatedUser);

        expect(response.statusCode).toBe(400);

        expect(response.body.type).toEqual("ValidationError");
        expect(response.body.details[0].message).toEqual("\"password\" is required");
    });
  });