const request = require("supertest");
const assert = require('assert');
const userdb = require("../src/db/userdb");
const app = require("../src/app");


describe('POST /api/user', () => {
    it('clears database before testing', (done) => {
        userdb.clearUsers();
        done();
    });

    it('responds with a json message containing jwt token', async () => {
        const newUser = {
            name:"Roman",
            password: "Password!11",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.token).toBeDefined();
    });
  
    it('responds with an error message due to same email', async () => {
        const newUser = {
            name:"Roman",
            password: "Password!11",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("EmailValidationError");
        expect(response.body.details).toEqual("Email already exists");
    });

    it('responds with an error message due to no name', async () => {
        const newUser = {
            password: "Password!11",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("ValidationError");
        expect(response.body.details[0].message).toEqual("\"name\" is required");
    });

    it('responds with an error message due to no password', async () => {
        const newUser = {
            name: "Roman",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("ValidationError");
        expect(response.body.details[0].message).toEqual("\"password\" is required");
    });

    it('responds with an error message due to short password', async () => {
        const newUser = {
            name: "Roman",
            password: "Hello",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)


        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("ValidationError");
        expect(response.body.details[0].message).toEqual(`\"password\" length must be at least 8 characters long`)
    });

    it('responds with an error message due to too simple password', async () => {
        const newUser = {
            name: "Roman",
            password: "HelloWorld",
            email:"roman11@gmail.com"
        }
        const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)


        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("ValidationError");
        expect(response.body.details[0].message).toEqual(`\"password\" with value \"${newUser.password}\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$/`)
    });

    it('clears database after testing', (done) => {
        userdb.clearUsers();
        done();
    });
  });

