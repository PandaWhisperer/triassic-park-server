var app     = require("../../app");
var request = require("supertest");
var expect  = require("chai").expect;

describe("Species API", function() {

  var id;
  var testSpecies = {
    name: "Testasaurus Rex",
    description: "A testy dinosaur",
    legs: 2,
    carnivorous: true
  };

  describe("POST /species", function() {

    it("Creates a new species", function(done) {
      request(app)
        .post("/species")
        .send(testSpecies)
        .expect(201)
        .expect("Location", /^\/species/)
        .end(function(err, res) {
          // save the new id for later
          if (!err) id = res.body._id;
          done(err);
        });
    });

  });

  describe("GET /species/:id", function() {

    it("Returns a species", function(done) {
      request(app)
        .get("/species/" + id)
        .expect(200)
        .end(function(err, response) {
          expect(response.body).to.have.property("name", "Testasaurus Rex");
          done(err);
        });
    });

    it("Returns a 404 error if species does not exist", function(done) {
      request(app)
        .get("/species/1234567890deadbeef123456")
        .expect(404)
        .end(done);
    });

  });

  describe("GET /species", function() {

    it("Lists all species", function(done) {
      request(app)
        .get("/species")
        .expect(200)
        .expect(function(res) {
          expect(res.body).to.be.an.Array;
          expect(res.body).to.have.deep.property("[0].name", "Testasaurus Rex");
        })
        .end(done);
    });

  });

  describe("PUT /species/:id", function() {

    it("Updates a species", function(done) {
      request(app)
        .put("/species/" + id)
        .send({
          name: "Testasaurus Rex",
          description: "A tested dinosaur"
        })
        .expect(200)
        .end(done);
    });

    it("Species was updated", function(done) {
      request(app)
        .get("/species/" + id)
        .expect(200)
        .expect(function (res) {
          expect(res.body).to.include({
            name: "Testasaurus Rex",
            description: "A tested dinosaur"
          });
        })
        .end(done);
    });

    it("Returns a 404 when attempting to update a non-existing species", function(done) {
      request(app)
        .put("/species/1234567890deadbeef123456")
        .send({
          name: "Testasaurus Rex",
          description: "A tested dinosaur"
        })
        .expect(404)
        .end(done);
    });

  });

  describe("DELETE /species/:id", function() {

    it("Deletes a species", function(done) {
      request(app)
        .delete("/species/" + id)
        .expect(200)
        .end(done);
    });

    it("Species is deleted", function(done) {
      request(app)
        .get("/species/" + id)
        .expect(404)
        .end(done);
    });

    it("Returns a 404 when attempting to delete a non-existing species", function(done) {
      request(app)
        .delete("/species/1234567890deadbeef123456")
        .expect(404)
        .end(done);
    });

  });

});
