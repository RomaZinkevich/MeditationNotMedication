const request = require("supertest");

const app = require("../src/app");

describe("GET /api/section", () => {
    it("responds with a json message", async () => {
        const response = await request(app).get('/api/section');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
            "section_id": 1,
            "content_id": 2,
            "content_name": "content_2",
            "author": "author 1",
            "section_name": "Section 1",
            "image": "image_url_2"
          },
          {
            "section_id": 1,
            "content_id": 1,
            "content_name": "content_1",
            "author": "author 1",
            "section_name": "Section 1",
            "image": "image_url_1"
          },
          {
            "section_id": 2,
            "content_id": 4,
            "content_name": "content_4",
            "author": "author 3",
            "section_name": "Section 2",
            "image": "image_url_4"
          },
          {
            "section_id": 2,
            "content_id": 5,
            "content_name": "content_5",
            "author": "author 2",
            "section_name": "Section 2",
            "image": "image_url_5"
          },
          {
            "section_id": 2,
            "content_id": 3,
            "content_name": "content_3",
            "author": "author 2",
            "section_name": "Section 2",
            "image": "image_url_3"
          }
          ]);
    });
  });

  describe("GET /api/section/:id", () => {
    it("responds with a json message", async () => {
        const response = await request(app).get('/api/section/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
          {
              "content_id": 1,
              "content_name": "content_1",
              "author": "author 1",
              "section_name": "Section 1",
              "image": "image_url_1",
              "description": "This is the description for content_id 1"
          },
          {
              "content_id": 2,
              "content_name": "content_2",
              "author": "author 1",
              "section_name": "Section 1",
              "image": "image_url_2",
              "description": "This is the description for content_id 2"
          }
      ]);
    });

    it("responds with error due to non-existing id", async () => {
      const response = await request(app).get('/api/section/11');

      expect(response.statusCode).toBe(400);
      expect(response.body.type).toEqual("SectionDatabaseError");
      expect(response.body.details).toEqual("Section ID Not Found");
    });
  });