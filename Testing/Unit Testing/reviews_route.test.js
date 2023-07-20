const app = require("../Server/controllers/index.js");
const request = require("supertest");

describe("GET /reviews", () => {
  it("responds with 200 when successful", (done) => {
    request(app)
      .get("/reviews/?product_id=102&page=1&count=5&sort=newest")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it("responds with object containing expected properties", (done) => {
    request(app)
      .get("/reviews/?product_id=102&page=1&count=5&sort=newest")
      .then((response) => {
        expect(response.body).toHaveProperty("product");
        expect(response.body).toHaveProperty("page");
        expect(response.body).toHaveProperty("count");
        expect(response.body).toHaveProperty("results");
        done();
      })
      .catch((error) => {
        done(error);
        console.log("ERROR");
      });
  });
});

describe("POST /reviews", () => {
  it("responds with 201 when successful", (done) => {
    request(app)
      .post("/reviews/")
      .send({
        product_id: 102,
        rating: 4,
        summary: "testing this summary",
        body: "testing this body",
        name: "testing this name",
        email: "testing@xyz",
      })
      .then((response) => {
        expect(response.status).toBe(201);
        done();
      })
      .catch((error) => {
        console.log("ERROR");
        done(error);
      });
  });
});
