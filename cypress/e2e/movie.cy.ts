//import { should } from "chai";

beforeEach(() => {
  cy.visit("/");
});

describe('test for function of search', () => {
  it('shoud test to open the webpage', () => {
  });

  it('shoud test when the user fill in a form', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
  });

  it('shoud test when the user fill in a form and press submit', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
  });
  
  it('shoud get mockdata', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"example"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("Dödens grotta").should("have.value", "Dödens grotta");
    cy.get("button#search").click();
    cy.get(".movie").should("exist");
  });

  it('shoud get mockdata without searchword', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleEmptyInput"}).as("movieCall");
    cy.get("input").should("exist"); 
    //cy.get("input").type("").should("have.value", "");
    cy.get("button#search").click();
    cy.get("p").should("exist");
  });

  it('shoud get mockdata with numbers', () => {
    cy.intercept("GET", "http://omdbapi.com/?apikey=416ed51a&s=*", {fixture:"exampleLongnumberinput"}).as("movieCall");
    cy.get("input").should("exist"); 
    cy.get("input").type("123").should("have.value", "123");
    cy.get("button#search").click();
    cy.get("p").should("exist");
  });

});
     //   cy.wait("@movieCall").its("request.url").should("contain","/1");
    /*
    cy.get("#movie-container").should("exist");
    cy.get("h3").contains("Dödens grotta");
    */
