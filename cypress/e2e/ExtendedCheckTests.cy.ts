/// <reference types="cypress" />

import { successfulResponseWiki } from "../responses/successfulResponseWiki";
import { unsuccessfulResponseWiki } from "../responses/unsuccessfulResponseWiki";

describe('Extended check tests', () => {
    it('Check if word is valid from checking second api', () => {
        cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/zarf',
            (response: { reply: (arg0: { statusCode: number; body: { message: string; }; }) => void; }) => {
                response.reply({
                    statusCode: 404,
                    body: { message: 'Word not in API' }
                });
            })
            .as('WordNotInAPI');

        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=zarf&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki
                });
            }).as('WordInWikictionary');

        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('zarf');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@WordNotInAPI').then((interception) => {
            expect(interception?.response?.statusCode).to.eq(404);
        });
        cy.wait('@WordInWikictionary').then((interception2) => {
            expect(interception2?.response?.statusCode).to.eq(200);
        });
        cy.get("[data-test='valid-word-screen']").should('be.visible');
    });

    it('Check if word is unknown if found in neither api', () => {
        cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/zeel',
            (response: { reply: (arg0: { statusCode: number; body: { message: string; }; }) => void; }) => {
                response.reply({
                    statusCode: 404,
                    body: { message: 'Word not in API' }
                });
            })
            .as('WordNotInAPI');

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
        cy.wait('@WordNotInAPI').then((interception) => {
            expect(interception?.response?.statusCode).to.eq(404);
        });
        cy.wait('@WordNotInWikictionary').then((interception2) => {
            expect(interception2?.response?.statusCode).to.eq(200);
        });
        cy.get("[data-test='unknown-word-screen']").should('be.visible');
    });

    it('Check if valid word cannot be checked in first API when extended check is off', () => {
        cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/react',
            (response: { reply: (arg0: { statusCode: number; body: { message: string; }; }) => void; }) => {
                response.reply({
                    statusCode: 500,
                    body: { message: 'Unable to check word' }
                });
            })
            .as('WordCannotBeCheckedInAPI');

        cy.visit('/');
        cy.window().then((win) => {
            win.sessionStorage.setItem('isExtendedCheck', 'false');
        });
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('react');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@WordCannotBeCheckedInAPI').then((interception) => {
            expect(interception?.response?.statusCode).to.eq(500);
        });
        cy.get("[data-test='error-screen']").should('be.visible');
    });

    it('Check if word shows when word checking is completely off', () => {
        cy.visit('/');
        cy.window().then((win) => {
            win.sessionStorage.setItem('isWordToBeChecked', 'false');
            win.sessionStorage.setItem('isExtendedCheck', 'false');
        });
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('asdasdasd');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='valid-word-screen']").should('be.visible');

    });

    it('Testing when words do not go through an extended check', () => {
        cy.visit('/');
        cy.window().then((win) => {
            win.sessionStorage.setItem('isExtendedCheck', 'false');
        });
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('zarf');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='unknown-word-screen']").should('be.visible');
    });
});