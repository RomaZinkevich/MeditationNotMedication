const request = require("supertest");
const assert = require('assert');
const userdb = require("../src/db/userdb");
const app = require("../src/app");


describe('Sign up endpoint', () => {
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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
        .post('/api/users')
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

  describe('Log in endpoint', () => {
    it('clears database before testing', (done) => {
        userdb.clearUsers();
        done();
    });

    it('creates new user in db', async () => {
        const newUser = {
            name:"Roman",
            password: "Pas$w0rd",
            email:"roman@gmail.com"
        }
        const response = await request(app)
        .post('/api/users')
        .set('Accept', 'application/json')
        .send(newUser)

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.token).toBeDefined();
    });

    it('responds with a json message containing jwt token', async () => {
        const user = {
            email:"roman@gmail.com",
            password: "Pas$w0rd"
        }
        const response = await request(app)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .send(user)

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toEqual("success");
        expect(response.body.token).toBeDefined();
        expect(response.body.details.name).toEqual("Roman");
        expect(response.body.details.image).toEqual("https://ih1.redbubble.net/image.1046392292.3346/st,medium,507x507-pad,600x600,f8f8f8.jpg");
    });

    it("responds with an error due to non-existing email", async () => {
        const user = {
            password: "Pas$w0rd"
        }
        const response = await request(app)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .send(user)

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("AuthenticationError");
        expect(response.body.details).toEqual("Email doesn't exist");
    })

    it("responds with an error due to wrong password", async () => {
        const user = {
            email: "roman@gmail.com"
        }
        const response = await request(app)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .send(user)

        expect(response.statusCode).toBe(400);
        expect(response.body.type).toEqual("AuthenticationError");
        expect(response.body.details).toEqual("Wrong or no password");
    })

    it('clears database after testing', (done) => {
        userdb.clearUsers();
        done();
    });
  });