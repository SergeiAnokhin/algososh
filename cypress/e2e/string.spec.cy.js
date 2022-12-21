import { DELAY_IN_MS } from "./../../src/constants/delays";
import {circle, input, button} from "../../src/constants/constans"

describe("Тестирование разворота строки", function () {

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

  it("Страница доступна", function () {
    cy.visit("/recursion");
  });

  it("Кнопка Развернуть неактивна при пустом инпуте", function () {
    cy.get(input).clear().should("have.value", "");
    cy.get(button).should("have.attr", "disabled");
  });

  it("Кнопка Развернуть активна при непустом инпуте", function () {
    cy.get(input)
      .type("Test")
      .should("have.value", "Test");
    cy.get(button).should("not.have.attr", "disabled");
    cy.get(input).clear().should("have.value", "");
  });

  it("Строка разворачивается корректно", function () {
    cy.get(input)
      .type(initialString)
      .should("have.value", initialString);
    cy.get(button).should("not.have.attr", "disabled");

    cy.get(button).click();

    cy.get(circle).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(initialString[index]);
      cy.get($el).should("have.css", "border-color", initialColorArr[index]);
     });

     cy.wait(DELAY_IN_MS);

     cy.get(circle).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(stringInProcess[index]);
      cy.get($el).should("have.css", "border-color", changingColorArr[index]);
     });

     cy.wait(DELAY_IN_MS);

     cy.get(circle).each(($el, index, $list) => {
      cy.get($list).should("have.length", stringLength);
      cy.get($el).contains(stringFinal[index]);
      cy.get($el).should("have.css", "border-color", finalColorArr[index]);
     });

  });
});