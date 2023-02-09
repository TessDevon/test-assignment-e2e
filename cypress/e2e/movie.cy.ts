//import { should } from "chai";

beforeEach(() => {
  cy.visit("/");
});

describe('test for function of search', () => {

  it('should test to open the webpage', () => {
  });
/*
  it('should test to open the webpage and do a search at the real API', () => {
    cy.get("input").should("exist"); 
    cy.get("input").type("Disney").should("have.value", "Disney");
    cy.get("button#search").click();
    cy.get(".movie").should("exist");
  });
  */

  it('should test when the user fill in a form', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
  });

  it('should test when the user fill in a form and click submit', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
  });
  
  it('should request with correct url', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.wait("@movieCall").its("request.url").should("contain", "1")
  });

  it('should get mockdata', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.wait("@movieCall").get(".movie").should("exist");
  });

  it('shoud get mockdata without searchword', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleEmptyInput"}).as("movieCallError");
    cy.get("input").should("exist"); 
    //cy.get("input").type("").should("have.value", "");
    cy.get("button#search").click();
    cy.wait("@movieCallError").get("p").should("exist");
  });
});

/*
  it('shoud get mockdata with random numbers', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleLongnumberinput"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("148945").should("have.value", "148945");
    cy.get("button#search").click();
    cy.get("p").should("exist");
  });
*/
