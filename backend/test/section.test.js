const request = require("supertest");

const app = require("../src/app");

describe("GET /api/sections", () => {
    it("gets all content", async () => {
        const response = await request(app).get('/api/sections');

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

    it("responds with content from section 2", async () => {
      const response = await request(app).get('/api/sections/2');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        {
          "content_id": 3,
          "content_name": "content_3",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_3",
          "description": "This is the description for content_id 3"
        },
        {
          "content_id": 5,
          "content_name": "content_5",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_5",
          "description": "This is the description for content_id 5"
        },
        {
          "content_id": 4,
          "content_name": "content_4",
          "author": "author 3",
          "section_name": "Section 2",
          "image": "image_url_4",
          "description": "This is the description for content_id 4"
        }
      ]);
    });

      it("responds with content from section 1", async () => {
        const response = await request(app).get('/api/sections/1');
  
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

  it("responds with content from section that doesn't exist", async () => {
    const response = await request(app).get('/api/sections/3');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(
      {
        "message":"ID Not Found"
      }
    );
});
});
