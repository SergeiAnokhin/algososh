describe("Тестирование последовательности Фибоначчи", function () {
  
    it("Страница доступна", function () {
      cy.visit("/fibonacci");
    });
  
    it("Кнопка Рассчитать неактивна при пустом инпуте", function () {
      cy.get('[data="input"]').clear().should("have.value", "");
      cy.get('[data="button"]').should("have.attr", "disabled");
    });
  
    it("Кнопка Рассчитать активна при непустом инпуте", function () {
      cy.get('[data="input"]').type("5").should("have.value", "5");
      cy.get('[data="button"]').should("not.have.attr", "disabled");
      cy.get('[data="input"]').clear().should("have.value", "");
    });
  
    it("Последовательность Фибоначчи генерируется корректно", function () {
      cy.get('[data="button"]').as("btn");
      cy.get('[data="input"]').type("5").should("have.value", "5");
      cy.get("@btn").should("not.have.attr", "disabled");
      cy.get("@btn").click();
  
      cy.get("[class^=circle_circle]").as("circles");
      cy.get("@circles")
        .should("have.length", 6)
        .each(($circle, index) => {
          cy.get($circle).should("have.css", "border-color", "rgb(0, 50, 255)");
        });
    });
  });