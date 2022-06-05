process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const pool = require("../db/db");
const server = require("../server");

const should = chai.should();

chai.use(chaiHttp);

describe("Cards", () => {
  describe("/GET cards", () => {
    it("should GET all the cards", (done) => {
      chai.request(server)
        .get("/cards")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST cards", () => {
    it("should post a card", (done) => {
      chai.request(server)
        .post("/cards")
        .send({
          cardName: "myCard",
          cardDates: ["2012-03-09", "2012-03-10", "2012-03-12", "2012-03-15"],
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should not post a card", (done) => {
      chai.request(server)
        .post("/cards")
        .send({
          cardName: 123,
          cardDates: ["2012-03-09", "2012-03-10", "2012-03-12", "2012-03-15"],
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should not post a card", (done) => {
      chai.request(server)
        .post("/cards")
        .send({
          cardName: "",
          cardDates: ["2012-03-09", "2012-03-10", "2012-03-12", "2012-03-15"],
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should not post a card", (done) => {
      chai.request(server)
        .post("/cards")
        .send({
          cardName: "my card",
          cardDates: [],
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should not post a card", (done) => {
      chai.request(server)
        .post("/cards")
        .send({
          cardName: "my card",
          cardDates: 123,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("/GET cards/:cardId", () => {
    it("should not GET the card with id 1321(non existent)", (done) => {
      chai.request(server)
        .get("/cards/1321")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should GET the card with id 1", (done) => {
      chai.request(server)
        .get("/cards/1")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should not GET the card with id asd2", (done) => {
      chai.request(server)
        .get("/cards/asd2")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should not GET the card with id 9 (unautorised)", (done) => {
      chai.request(server)
        .get("/cards/9")
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});
