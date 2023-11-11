const request = require("supertest");

const app = require("../src/app");

describe("app", () => {
    it("responds with a json message", (done) => {
    request(app)
        .get("/api")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {
        message: "Hello API",
        }, done);
      });
  });