//import { should } from "chai";

beforeEach(() => {
  cy.visit("/");
});

describe('test for using input and search', () => {

  it('should test to open the webpage', () => {
  });

  it('should test to open the webpage and do a search at the real API', () => {
    cy.get("input").should("exist"); 
    cy.get("input").type("Disney").should("have.value", "Disney");
    cy.get("button#search").click();
    cy.get(".movie").should("exist");
  });

  it('should test when the user fills in a form', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
  });

  it('should test when the user fills in a form and click submit', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
  });
  
  it('should test to do a request with correct url', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.wait("@movieCall").its("request.url").should("contain", "1")
  });

  it('should test to get mockdata', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.wait("@movieCall").get(".movie").should("exist");
  });

  it('should test to get mockdata without searchword', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleEmptyInput"}).as("movieCallError");
    cy.get("input").should("exist"); 
    cy.get("button#search").click();
    cy.wait("@movieCallError").get("p").should("exist");
  });

  it('should test to get mockdata with random numbers', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleNonsensInput"}).as("movieCallError");
    cy.get("input").type("54896745985156479").should("have.value", "54896745985156479"); 
    cy.get("button#search").click();
    cy.wait("@movieCallError").get("p").should("exist");
  });

  it('should test to get mockdata with random letters', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleNonsensInput"}).as("movieCallError");
    cy.get("input").type("ickg jhkl hcjk").should("have.value", "ickg jhkl hcjk"); 
    cy.get("button#search").click();
    cy.wait("@movieCallError").get("p").should("exist");
  });

  it('should test when the webpage gets wrong API- data', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleWrongApiData"}).as("wrongData");
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.wait("@wrongData").get("h3").should("contain","undefined");
  });
});
