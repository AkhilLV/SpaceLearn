process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

const should = chai.should();

chai.use(chaiHttp);

describe("Auth", () => {
  describe("/POST login", () => {
    it("should log in", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "test_user",
          password: "123", // create new user
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should not log in", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          password: "123232124212",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should not log in", (done) => {
      chai
        .request(server)
        .post("/auth/login")
        .send({
          username: "my_non_existent_user",
          password: "123",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
