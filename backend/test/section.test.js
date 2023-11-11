const request = require("supertest");

const app = require("../src/app");

describe("GET /api/sections", () => {
    it("responds with a json message", (done) => {
      request(app)
        .get("/api/sections")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {
          message: "Hello World",
        }, done);
    });
  });