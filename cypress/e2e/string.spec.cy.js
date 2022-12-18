import { DELAY_IN_MS } from "./../../src/constants/delays";

describe("Recursion page health check", function () {

  const stringLength = 5;
  const initialString = 'hello';
  const stringInProcess = 'oellh';
  const stringFinal = 'olleh';
  const initialColorArr = [
    "rgb(210, 82, 225)",
    "rgb(0, 50, 255)",
    "rgb(0, 50, 255)",
    "rgb(0, 50, 255)",
    "rgb(210, 82, 225)",
  ];
  const changingColorArr = [
    "rgb(127, 224, 81)",
    "rgb(210, 82, 225)",
    "rgb(0, 50, 255)",
    "rgb(210, 82, 225)",
    "rgb(127, 224, 81)",
  ];
  const finalColorArr = [
    "rgb(127, 224, 81)",
    "rgb(127, 224, 81)",
    "rgb(127, 224, 81)",
    "rgb(127, 224, 81)",
    "rgb(127, 224, 81)",
  ];

  it("Recursion page must be available", function () {
    cy.visit("/recursion");
  });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get('[data="input"]').clear().should("have.value", "");
    cy.get('[data="button"]').should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get('[data="input"]')
      .type("Test")
      .should("have.value", "Test");
    cy.get('[data="button"]').should("not.have.attr", "disabled");
    cy.get('[data="input"]').clear().should("have.value", "");
  });

  it("Checking if the string is reversed correctly", function () {
    cy.get('[data="input"]')
      .type(initialString)
      .should("have.value", initialString);
    cy.get('[data="button"]').as("btn");
    cy.get("@btn").should("not.have.attr", "disabled");

    cy.get("@btn").click();

    cy.get("[class^=circle_circle]").as("circles");

    cy.get("@circles").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(initialString[index]);
      cy.get($el).should("have.css", "border-color", initialColorArr[index]);
     });

     cy.wait(DELAY_IN_MS);

     cy.get("@circles").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(stringInProcess[index]);
      cy.get($el).should("have.css", "border-color", changingColorArr[index]);
     });

     cy.wait(DELAY_IN_MS);

     cy.get("@circles").each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(stringFinal[index]);
      cy.get($el).should("have.css", "border-color", finalColorArr[index]);
     });

  });
});