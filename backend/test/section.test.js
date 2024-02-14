const request = require("supertest");
const userdb = require("../src/db/userdb");
const contentdb = require("../src/db/contentdb");
const app = require("../src/app");

describe("GET /api/sections", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
        await contentdb.clearContents();
        await contentdb.seedDb();
    });

    it("responds with a json message", async () => {
        const response = await request(app).get('/api/sections');

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toEqual(
          {
            "section_id": 1,
            "content_id": 1,
            "content_name": "content_1",
            "author": "author 1",
            "section_name": "Section 1",
            "image": "image_url_1"
          });
          expect(response.body[1]).toEqual(
          {
            "section_id": 1,
            "content_id": 2,
            "content_name": "content_2",
            "author": "author 1",
            "section_name": "Section 1",
            "image": "image_url_2"
          });
          expect(response.body[2]).toEqual(
          {
            "section_id": 2,
            "content_id": 3,
            "content_name": "content_3",
            "author": "author 2",
            "section_name": "Section 2",
            "image": "image_url_3"
          });
          expect(response.body[3]).toEqual(
          {
            "section_id": 2,
            "content_id": 4,
            "content_name": "content_4",
            "author": "author 3",
            "section_name": "Section 2",
            "image": "image_url_4"
          });
          expect(response.body[4]).toEqual(
          {
            "section_id": 2,
            "content_id": 5,
            "content_name": "content_5",
            "author": "author 2",
            "section_name": "Section 2",
            "image": "image_url_5"
          });
    });

    it("responds with a json message (sorting DESC)", async () => {
        const response = await request(app).get('/api/sections?order=desc');

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toEqual(
        {
          "section_id": 2,
          "content_id": 3,
          "content_name": "content_3",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_3"
        });
        expect(response.body[1]).toEqual(
        {
          "section_id": 2,
          "content_id": 4,
          "content_name": "content_4",
          "author": "author 3",
          "section_name": "Section 2",
          "image": "image_url_4"
        });
        expect(response.body[2]).toEqual(
        {
          "section_id": 2,
          "content_id": 5,
          "content_name": "content_5",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_5"
        });
        expect(response.body[3]).toEqual(
        {
          "section_id": 1,
          "content_id": 1,
          "content_name": "content_1",
          "author": "author 1",
          "section_name": "Section 1",
          "image": "image_url_1"
        });
        expect(response.body[4]).toEqual(
        {
          "section_id": 1,
          "content_id": 2,
          "content_name": "content_2",
          "author": "author 1",
          "section_name": "Section 1",
          "image": "image_url_2"
        });
    });

    it("responds with a json message (sorting by content_id DESC)", async () => {
        const response = await request(app).get('/api/sections?sort=content_id&order=desc');

        expect(response.statusCode).toBe(200);
        expect(response.body[4]).toEqual(
        {
          "section_id": 1,
          "content_id": 1,
          "content_name": "content_1",
          "author": "author 1",
          "section_name": "Section 1",
          "image": "image_url_1"
        });
        expect(response.body[3]).toEqual(
        {
          "section_id": 1,
          "content_id": 2,
          "content_name": "content_2",
          "author": "author 1",
          "section_name": "Section 1",
          "image": "image_url_2"
        });
        expect(response.body[2]).toEqual(
        {
          "section_id": 2,
          "content_id": 3,
          "content_name": "content_3",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_3"
        });
        expect(response.body[1]).toEqual(
        {
          "section_id": 2,
          "content_id": 4,
          "content_name": "content_4",
          "author": "author 3",
          "section_name": "Section 2",
          "image": "image_url_4"
        });
        expect(response.body[0]).toEqual(
        {
          "section_id": 2,
          "content_id": 5,
          "content_name": "content_5",
          "author": "author 2",
          "section_name": "Section 2",
          "image": "image_url_5"
        });
    });

  });

  describe("GET /api/sections/:id", () => {
    it("responds with a json message", async () => {
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

    it("responds with error due to non-existing id", async () => {
      const response = await request(app).get('/api/sections/11');

      expect(response.statusCode).toBe(400);
      expect(response.body.type).toEqual("SectionDatabaseError");
      expect(response.body.details).toEqual("Section ID Not Found");
    });
  });