
describe("string page display correctly", function () {

  before(function () {
    cy.visit('/recursion');
  });

  it("1", function () {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  })

  it("2", function () {
    cy.get("input").type("fff");
    cy.get("button").contains("Развернуть").click();
  })

  it("srting should reverse correctly", function () {
    cy.get("input").should("have.value", "fff");
})
});