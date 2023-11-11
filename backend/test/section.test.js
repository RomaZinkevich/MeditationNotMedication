const request = require("supertest");

const app = require("../src/app");

describe("GET /api/sections", () => {
    it("responds with a json message", async () => {
        const response = await request(app).get('/api/sections');

        expect(response.body).toEqual([
            {
              "section_name": "Section 1",
              "content_name": "content_2",
              "image": "image_url_2"
            },
            {
              "section_name": "Section 1",
              "content_name": "content_1",
              "image": "image_url_1"
            },
            {
              "section_name": "Section 2",
              "content_name": "content_5",
              "image": "image_url_5"
            },
            {
              "section_name": "Section 2",
              "content_name": "content_4",
              "image": "image_url_4"
            },
            {
              "section_name": "Section 2",
              "content_name": "content_3",
              "image": "image_url_3"
            }
          ])
    });
  });