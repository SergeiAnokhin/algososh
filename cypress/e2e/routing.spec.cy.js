describe("Тестирование доступности страниц приложения", function () {

    before(function () {
      cy.visit('/');
    });
  
  
    it("Страница Строка доступна по ссылке", function () {
      cy.visit('/recursion');
    });
  
  
    it("Страница Последовательность Фибоначчи доступна по ссылке", function () {
      cy.visit('/fibonacci');
    });
  
  
    it("Страница Сортировка массива доступна по ссылке", function () {
      cy.visit('/sorting');
    });
  
  
    it("Страница Стек доступна по ссылке", function () {
      cy.visit('/stack');
    });

  
    it("Страница Очередь доступна по ссылке", function () {
      cy.visit('/queue');
    });

  
    it("Страница Связный спиок доступна по ссылке", function () {
      cy.visit('/list');
    });
  
  });