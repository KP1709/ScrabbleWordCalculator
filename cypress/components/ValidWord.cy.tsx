import { mount } from 'cypress/react'
import ValidWord from "../../src/components/responseInterfaces/validWord"

describe('<ValidWord  />', () => {
    it('Testing valid word screen functionality', () => {
        mount(<ValidWord submitWord={true} wordToCheck={'react'} />)

        cy.get("[data-test='double-total-score-btn']").click()
        cy.get("[data-test='double-total-score-btn']").should('not.exist')
        cy.get("[data-test='total-word-score']").should('contain', 14)
        cy.get("[data-test='reset-total-score-btn'").click()
        cy.get("[data-test='triple-total-score-btn']").click()
        cy.get("[data-test='total-word-score']").should('contain', 21)
        cy.get("[data-test='reset-total-score-btn']").click()
    })

    it('Testing tile functionality', () => {
        mount(<ValidWord submitWord={true} wordToCheck={'react'} />)

        cy.get("[data-test='word-tile']").click({ multiple: true })
        cy.get("[data-test='word-tile']").click({ multiple: true })
        cy.get("[data-test='word-tile']").click({ multiple: true })
        cy.get("[data-test='word-tile']").click({ multiple: true })
        cy.get("[data-test='word-tile']").each((tile: any) => {
            cy.get(tile).get('div h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #ffffff
        })

        cy.get("[data-test='list-tile-E']").click()
        cy.get("[data-test='list-tile-E']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(144, 224, 239)') // #90e0ef
            cy.get('h3').should('contain', 2)
        })

        cy.get("[data-test='list-tile-C']").click()
        cy.get("[data-test='list-tile-C']").click()
        cy.get("[data-test='list-tile-C']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #0077b6
            cy.get('h3').should('contain', 0)
        })

        cy.get("[data-test='list-tile-T']").click()
        cy.get("[data-test='list-tile-T']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(0, 119, 182)') // #0077b6
            cy.get('h3').should('contain', 3)
        })
        cy.get("[data-test='total-word-score']").should('contain', 8)
    })

    it('Testing blank tile functionality', () => {
        mount(<ValidWord submitWord={true} wordToCheck={'react'} />)

        cy.get("[data-test='list-tile-E']").click()
        cy.get("[data-test='list-tile-E']").click()
        cy.get("[data-test='list-tile-E']").click()
        cy.get("[data-test='list-tile-E']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #ffffff
            cy.get('h3').should('contain', 0)
        })

        cy.get("[data-test='list-tile-A']").click()
        cy.get("[data-test='list-tile-A']").click()
        cy.get("[data-test='list-tile-A']").click()
        cy.get("[data-test='list-tile-A']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #ffffff
            cy.get('h3').should('contain', 0)
        })

        cy.get("[data-test='list-tile-R']").click()
        cy.get("[data-test='list-tile-R']").click()
        cy.get("[data-test='list-tile-R']").click()
        cy.get("[data-test='list-tile-R']").within(() => {
            cy.get('h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #ffffff
            cy.get('h3').should('not.contain', 0)
        })

        cy.get("[data-test='total-word-score']").should('contain', 5)
    })
})