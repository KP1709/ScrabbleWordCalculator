/// <reference types="cypress" />

import { successfulResponseWiki_zarf } from "../responses/successfulResponseWiki-zarf";
import { unsuccessfulResponseWiki } from "../responses/unsuccessfulResponseWiki";

describe('Extended check tests', () => {
    it('Check if obscure word is valid', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=zarf&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki_zarf
                });
            }).as('WordInWikictionary');

        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('zarf');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@WordInWikictionary').then((interception2) => {
            expect(interception2?.response?.statusCode).to.eq(200);
        });
        cy.get("[data-test='valid-word-screen']").should('be.visible');
    });

    it('Check if word is unknown', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=zeel&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: unsuccessfulResponseWiki
                });
            }).as('WordNotInWikictionary');

        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('zeel');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@WordNotInWikictionary').then((interception2) => {
            expect(interception2?.response?.statusCode).to.eq(200);
        });
        cy.get("[data-test='unknown-word-screen']").should('be.visible');
    });

    it('Check if word shows when word checking is completely off', () => {
        cy.visit('/');
        cy.window().then((win) => {
            win.sessionStorage.setItem('isWordToBeChecked', 'false');
        });
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('asdasdasd');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='valid-word-screen']").should('be.visible');

    });
});