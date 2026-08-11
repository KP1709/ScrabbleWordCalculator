/// <reference types="cypress" />

import { successfulResponseWiki_react } from "../responses/successfulResponseWiki-react";
import { successfulResponseWiki_reacting } from "../responses/successfulResponseWiki-reacting";
import { successfulResponseWiki_type } from "../responses/successfulResponseWiki-type";

describe('Letter Calculator', () => {
    it('Visits site', () => {
        cy.visit('/');
    });

    it('Test screens displayed', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=type&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki_type
                });
            }).as('ValidWord');

        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get("[data-test='submit-word-form-btn']").should('exist');

        cy.get('@word-input').type('gr8t');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='invalid-entry-screen']").should('be.visible');

        cy.visit('/');
        cy.get('@word-input').type('abcdef');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='unknown-word-screen']").should('be.visible');

        cy.visit('/');
        cy.get('@word-input').type('type');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@ValidWord');
        cy.get("[data-test='valid-word-screen']").should('be.visible');
    });

    it('Testing non-playable valid words', () => {

        // Word is too long
        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('counterbalancing');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='invalid-entry-screen']").should('be.visible');

        // Too many 'K' tiles to play word
        cy.visit('/');
        cy.get('@word-input').type('knickknacks');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='max-tile-limit-exceeded-screen']").should('be.visible');

        // Can recognise mix cases
        cy.visit('/');
        cy.get('@word-input').type('KnickKnaCks');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.get("[data-test='max-tile-limit-exceeded-screen']").should('be.visible');
    });

    it('Test score multipliers', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=react&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki_react
                });
            }).as('ValidWord');

        cy.visit('/');
        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('react');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@ValidWord');
        cy.get("[data-test='valid-word-screen']").should('be.visible');

        cy.get("[data-test='double-total-score-btn']").click();
        cy.get("[data-test='total-word-score']").should('contain', 14);
        cy.get("[data-test='double-total-score-btn']").click();
        cy.get("[data-test='triple-total-score-btn']").click();
        cy.get("[data-test='total-word-score']").should('contain', 21);
        cy.get("[data-test='double-total-score-btn']").click();
        cy.get("[data-test='total-word-score']").should('contain', 42);
    });

    it('Test tile tap functionality', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=react&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki_react
                });
            }).as('ValidWord');

        cy.visit('/');

        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('react');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@ValidWord');
        cy.get("[data-test='valid-word-screen']").should('be.visible');

        cy.get("[data-test='word-tile']").click({ multiple: true });
        cy.get("[data-test='word-tile']").click({ multiple: true });
        cy.get("[data-test='word-tile']").click({ multiple: true });
        cy.get("[data-test='word-tile']").click({ multiple: true });
        cy.get("[data-test='word-tile']").each((tile: any) => {
            cy.get(tile).get('div h2').should('have.css', 'background-color', 'rgb(252, 241, 225)'); // #fcf1e1ff
        });

        cy.get("[data-test='list-tile-E']").click();
        cy.get("[data-test='list-tile-E']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(144, 224, 239)'); // #90e0ef
            cy.get('h3').should('contain', 2);
        });

        cy.get("[data-test='list-tile-C']").click();
        cy.get("[data-test='list-tile-C']").click();
        cy.get("[data-test='list-tile-C']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(252, 241, 225)'); // #fcf1e1ff
            cy.get('h3').should('contain', 0);
        });
        cy.get("[data-test='total-word-score']").should('contain', 7);
    });

    it('Test word bonus and tile bonus reset', () => {
        cy.intercept('GET', 'https://en.wiktionary.org/w/api.php?action=parse&page=reacting&prop=sections&format=json&origin=*',
            (response: { reply: (arg0: { statusCode: number; body: any; }) => void; }) => {
                response.reply({
                    statusCode: 200,
                    body: successfulResponseWiki_reacting
                });
            }).as('ValidWord');

        cy.visit('/');

        cy.get("[data-test='word-form']").as('word-input');
        cy.get('@word-input').type('reacting');
        cy.get("[data-test='submit-word-form-btn']").click();
        cy.wait('@ValidWord');
        cy.get("[data-test='valid-word-screen']").should('be.visible');

        cy.get("[data-test='list-tile-R']").click();
        cy.get("[data-test='list-tile-R']").click();
        cy.get("[data-test='list-tile-R']").click();
        cy.get("[data-test='list-tile-R']").click();
        cy.get("[data-test='list-tile-E']").click();
        cy.get("[data-test='list-tile-C']").click();
        cy.get("[data-test='list-tile-T']").click();
        cy.get("[data-test='list-tile-T']").click();
        cy.get("[data-test='list-tile-I']").click();
        cy.get("[data-test='double-total-score-btn']").click();
        cy.get("[data-test='bonus-btn']").click();
        cy.get("[data-test='total-word-score']").should('contain', 86);
        cy.get("[data-test='reset-btn']").click();
        cy.get("[data-test='total-word-score']").should('contain', 11);
    });

});