import { should } from "chai";

beforeEach(() => {
  cy.visit("/");
});

describe('test for function of search', () => {
  it('shoud get mockdata', () => {
    cy.intercept("get", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixtures:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.get("#movie-container").should("exist");
  })
  /*
  it('shoud test tests that it works when the user does a search', () => {
    cy.get("input").should("exist"); 
    cy.get("input").type("Musse Pigg").should("have.value", "Musse Pigg");
    cy.get("button#search").click();
    cy.get("#movie-container").should("exist");
  })*/
  /*
  it('passes', () => {

  })*/
})