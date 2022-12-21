describe("Приложение доступно", function () {
    it("Приложение достпуно на localhost:3000", function () {
        cy.visit("/");
      });
});