import {circle, input, button, defaultColor} from "../../src/constants/constans"

describe("Тестирование последовательности Фибоначчи", function () {
  
    it("Страница доступна", function () {
      cy.visit("/fibonacci");
    });
  
    it("Кнопка Рассчитать неактивна при пустом инпуте", function () {
      cy.get(input).clear().should("have.value", "");
      cy.get(button).should("have.attr", "disabled");
    });
  
    it("Кнопка Рассчитать активна при непустом инпуте", function () {
      cy.get(input).type("5").should("have.value", "5");
      cy.get(button).should("not.have.attr", "disabled");
      cy.get(input).clear().should("have.value", "");
    });
  
    it("Последовательность Фибоначчи генерируется корректно", function () {
      cy.get(input).type("5").should("have.value", "5");
      cy.get(button).should("not.have.attr", "disabled");
      cy.get(button).click();
  
      cy.get(circle)
        .should("have.length", 6)
        .each(($circle, index) => {
          cy.get($circle).should("have.css", "border-color", defaultColor);
        });
    });
  });