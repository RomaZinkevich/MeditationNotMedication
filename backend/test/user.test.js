const request = require("supertest");
const assert = require('assert');
const userdb = require("../src/db/userdb");
const app = require("../src/app");


describe('POST /api/user', () => {
    it('clears database before testing', (done) => {
        userdb.clearUsers();
        done();
    });

    it('responds with a json message containing jwt token', (done) => {
        const newUser = {
            name:"Roman",
            email:"roman11@gmail.com",
            image:"image"
        }
        request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            assert.strictEqual(res.body.status, 'success', 'Expected status to be "success"');
            assert.ok(res.body.token, 'Expected JWT token in the response');
            done();
        });
    });
  
    it('responds with an error message due to same email', (done) => {
        const newUser = {
            name:"Roman",
            email:"roman11@gmail.com",
            image:"image"
        }
        request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect(400, {
            "type": "Email not unique",
            "details": "error: duplicate key value violates unique constraint \"email\""
        });
        done();
    });

    it('responds with an error message due to no name', (done) => {
        const newUser = {
            email:"roman11@gmail.com",
            image:"image"
        }
        request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send(newUser)
        .expect(400, {
            "type": "ValidationError",
            "details": [
                {
                    "message": "\"name\" is required",
                    "path": [
                        "name"
                    ],
                    "type": "any.required",
                    "context": {
                        "label": "name",
                        "key": "name"
                    }
                }
            ]
        });
        done();
    });
  });

