import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
    input, 
    addBtn, 
    deleteBtn, 
    resetBtn, 
    circle, 
    head, 
    index, 
    canvas, 
    defaultColor, 
    changingColor,
    tail
} from "../../src/constants/constans"

describe("Тестирование очереди", function () {

    it("Страница доступна", function () {
        cy.visit("/queue");
    });

    it("Кнопка Добавить неактивна при пустом инпуте", function () {
        cy.get(input).clear().should("have.value", "");
        cy.get(addBtn).should("have.attr", "disabled");
    });

    it("Кнопка Добавить активна при непустом инпуте", function () {
        cy.get(input).type("1").should("have.value", "1");
        cy.get(addBtn).should("not.have.attr", "disabled");
        cy.get(input).clear().should("have.value", "");
        cy.get(addBtn).should("have.attr", "disabled");
    });

    it("Элементы добавляются в очередь правильно", function () {

        // Добавление первого элемента в очередь

        cy.get(input).type("1").should("have.value", "1");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain("1");
            cy.get($letters.eq(0)).should("have.css", "border-color", changingColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain("head");
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(0)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
        });

        // Добавление второго элемента в очередь

        cy.get(input).type("2").should("have.value", "2");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(1)).to.contain("2");
            cy.get($letters.eq(1)).should("have.css", "border-color", changingColor);
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(1)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
        });

        // Добавление третьего элемента в очередь

        cy.get(input).type("3").should("have.value", "3");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(2)).to.contain("3");
            cy.get($letters.eq(2)).should("have.css", "border-color", changingColor);
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(2)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        // Добавление четвертого элемента в очередь

        cy.get(input).type("4").should("have.value", "4");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(3)).to.contain("4");
            cy.get($letters.eq(3)).should("have.css", "border-color", changingColor);
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(3)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(3)).should("have.css", "border-color", defaultColor);
        });

        // Добавление пятого элемента в очередь

        cy.get(input).type("5").should("have.value", "5");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(4)).to.contain("5");
            cy.get($letters.eq(4)).should("have.css", "border-color", changingColor);
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(4)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(4)).should("have.css", "border-color", defaultColor);
        });

        // Добавление шестого элемента в очередь

        cy.get(input).type("6").should("have.value", "6");
        cy.get(addBtn).click();

        cy.get(circle).within(($letters) => {
            expect($letters.eq(5)).to.contain("6");
            cy.get($letters.eq(5)).should("have.css", "border-color", changingColor);
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(5)).to.contain("tail");
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(5)).should("have.css", "border-color", defaultColor);
        });

    });

    it("Элементы удаляются из очереди правильно", function () {

        // Удаление первого элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(0)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(0)).to.contain("");
            cy.get($letters.eq(0)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(0)).to.contain("");
            expect($head.eq(1)).to.contain("head");
        });

        // Удаление второго элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(1)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(1)).to.contain("");
            cy.get($letters.eq(1)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(1)).to.contain("");
            expect($head.eq(2)).to.contain("head");
        });

        // Удаление третьего элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(2)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(2)).to.contain("");
            cy.get($letters.eq(2)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(2)).to.contain("");
            expect($head.eq(3)).to.contain("head");
        });

        // Удаление четвертого элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(3)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(3)).to.contain("");
            cy.get($letters.eq(3)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(3)).to.contain("");
            expect($head.eq(4)).to.contain("head");
        });

        // Удаление пятого элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(4)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(4)).to.contain("");
            cy.get($letters.eq(4)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(4)).to.contain("");
            expect($head.eq(5)).to.contain("head");
        });

        // Удаление шестого элемента из очереди

        cy.get(deleteBtn).should("not.have.attr", "disabled");
        cy.get(deleteBtn).click();

        cy.get(circle).within(($letters) => {
            cy.get($letters.eq(5)).should("have.css", "border-color", changingColor);
        });

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).within(($letters) => {
            expect($letters.eq(5)).to.contain("");
            cy.get($letters.eq(5)).should("have.css", "border-color", defaultColor);
        });

        cy.get(head).within(($head) => {
            expect($head.eq(5)).to.contain("head");
        });

        cy.get(tail).within(($tail) => {
            expect($tail.eq(5)).to.contain("");
        });

    });

    it("Очередь очищается правильно", function () {

        cy.get(resetBtn).should("not.have.attr", "disabled");
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get(resetBtn).click();
    });

});