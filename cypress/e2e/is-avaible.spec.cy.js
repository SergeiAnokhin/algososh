describe("Приложение доступно", function () {
    it("Приложение доступно на localhost:3000", function () {
        cy.visit("/");
      });
});