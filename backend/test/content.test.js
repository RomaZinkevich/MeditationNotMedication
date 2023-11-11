const request = require("supertest");

const app = require("../src/app");

describe("GET /api/content/:id", () => {
    it("response for id=1", async () => {
        const response = await request(app).get('/api/content/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 1,
              "content_name": "content_1",
              "description": "This is the description for content_id 1",
              "author": "author 1",
              "section_name": "Section 1",
              "audio": "audio_url_1",
              "image": "image_url_1"
            }
          ]);
    });

    it("response for id=2", async () => {
        const response = await request(app).get('/api/content/2');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 2,
              "content_name": "content_2",
              "description": "This is the description for content_id 2",
              "author": "author 1",
              "section_name": "Section 1",
              "audio": "audio_url_2",
              "image": "image_url_2"
            }
          ]);
    });

    it("response for id=3", async () => {
        const response = await request(app).get('/api/content/3');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 3,
              "content_name": "content_3",
              "description": "This is the description for content_id 3",
              "author": "author 2",
              "section_name": "Section 2",
              "audio": "audio_url_3",
              "image": "image_url_3"
            }
          ]);
    });

    it("response for id=4", async () => {
        const response = await request(app).get('/api/content/4');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 4,
              "content_name": "content_4",
              "description": "This is the description for content_id 4",
              "author": "author 3",
              "section_name": "Section 2",
              "audio": "audio_url_4",
              "image": "image_url_4"
            }
          ]);
    });

    it("response for id=5", async () => {
        const response = await request(app).get('/api/content/5');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            {
              "content_id": 5,
              "content_name": "content_5",
              "description": "This is the description for content_id 5",
              "author": "author 2",
              "section_name": "Section 2",
              "audio": "audio_url_5",
              "image": "image_url_5"
            }
          ]);
    });

    it("response for id that does not exist", async () => {
        const response = await request(app).get('/api/content/6');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual(`ID not found`);
    });
  });