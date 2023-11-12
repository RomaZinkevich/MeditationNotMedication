const request = require("supertest");

const app = require("../src/app");

describe("GET /api/sections", () => {
    it("responds with a json message", async () => {
        const response = await request(app).get('/api/sections');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 2,
              "content_name": "content_2",
              "author": "author 1",
              "section_name": "Section 1",
              "image": "image_url_2"
            },
            {
              "content_id": 1,
              "content_name": "content_1",
              "author": "author 1",
              "section_name": "Section 1",
              "image": "image_url_1"
            },
            {
              "content_id": 4,
              "content_name": "content_4",
              "author": "author 3",
              "section_name": "Section 2",
              "image": "image_url_4"
            },
            {
              "content_id": 5,
              "content_name": "content_5",
              "author": "author 2",
              "section_name": "Section 2",
              "image": "image_url_5"
            },
            {
              "content_id": 3,
              "content_name": "content_3",
              "author": "author 2",
              "section_name": "Section 2",
              "image": "image_url_3"
            }
          ]);
    });
  });