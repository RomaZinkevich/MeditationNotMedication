const request = require("supertest");
const userdb = require("../src/db/userdb");
const contentdb = require("../src/db/contentdb");
const app = require("../src/app");


describe("PUT /api/contents/admin/:id endpoint", () => {
    beforeEach(async () => {
        await userdb.clearUsers();
        await userdb.seedDb();
        await contentdb.clearContents();
        await contentdb.seedDb();
    });

    it("changes content through ADMIN profile", async () => {
        const user = {
            email:"ADMIN",
            password:"admin"
        };

        const changedContent = {
            "section_id": 2,
            "content_name": "content_1_updated",
            "description": "This is the description for new content_id 1",
            "author": "author 2",
            "section_name": "Section 2",
            "audio": "audio_url_10",
            "image": "image_url_10"
          }

        const loginResponse = await request(app)
        .post("/api/users/login")
        .set("Accept", "application/json")
        .send(user);
        const token = loginResponse.body.token;

        const putResponse = await request(app)
        .put(`/api/contents/admin/1`)
        .set("authorization", `Bearer ${token}`)
        .send(changedContent);

        const response =  await request(app)
        .get("/api/contents/1");

        console.log(response.body)
        expect(putResponse.statusCode).toBe(200);
        expect(response.body).toEqual(
            {
              "content_id": 1,
              "section_id": 2,
              "content_name": "content_1_updated",
              "description": "This is the description for new content_id 1",
              "author": "author 2",
              "section_name": "Section 2",
              "audio": "audio_url_10",
              "image": "image_url_10"
            }
          );
    });

    it("changes content through ADMIN profile", async () => {
      const user = {
          email:"ADMIN",
          password:"admin"
      };

      const loginResponse = await request(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .send(user);
      const token = loginResponse.body.token;

      const putResponse = await request(app)
      .put(`/api/contents/admin/11`)
      .set("authorization", `Bearer ${token}`)
      .send({"content_name":"content 10"});

      expect(putResponse.statusCode).toBe(400);
      expect(putResponse.body.type).toEqual("ContentDatabaseError");
      expect(putResponse.body.details).toEqual("Content ID Not Found");
  });
});