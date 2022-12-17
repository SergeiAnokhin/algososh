describe("app works correctly with routes", function () {

    before(function () {
      cy.visit('/');
    });
  
  
    it("should open string-page by link", function () {
      cy.visit('/recursion');
    });
  
  
    it("should open fibonacci-page by link", function () {
      cy.visit('/fibonacci');
    });
  
  
    it("should open sorting-page by link", function () {
      cy.visit('/sorting');
    });
  
  
    it("should open stack-page by link", function () {
      cy.visit('/stack');
    });

  
    it("should open queue-page by link", function () {
      cy.visit('/queue');
    });

  
    it("should open list-page by link", function () {
      cy.visit('/list');
    });
  
  });