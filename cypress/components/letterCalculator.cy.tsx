import { mount } from 'cypress/react'
import LetterCalculator from '../../src/pages/letterCalculator'

// This is currenly not working well - possibly move this into e2e testing instead
describe('<LetterCalculator />', () => {
  it('Testing screen functionality', () => {

    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/abcdef', {
      statusCode: 404,
      body: { message: 'Not a valid word' }
    }).as('UnknownWord')
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/type',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        if (Array.isArray(response)) response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    mount(<LetterCalculator />)

    cy.get("[data-test='word-form']").as('word-input')
    cy.get("[data-test='submit-word-form-btn']").should('exist')

    cy.get('@word-input').type('gr8t')
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/gr8t', {
      statusCode: 404,
      body: { message: 'Not a valid word' }
    })
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.get("[data-test='invalid-entry-screen']").should('be.visible')

    cy.get('@word-input').type('abcdef')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@UnknownWord')
    cy.get("[data-test='unknown-word-screen']").should('be.visible')

    cy.get('@word-input').type('type')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@ValidWord')
    cy.get("[data-test='valid-word-screen']").should('be.visible')
  })

  it('Testing valid word functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/react',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        if (Array.isArray(response)) response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    mount(<LetterCalculator />)

    cy.get("[data-test='word-form']").as('word-input')
    cy.get('@word-input').type('react')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@ValidWord')
    cy.get("[data-test='valid-word-screen']").should('be.visible')

    cy.get("[data-test='double-total-score-btn']").click()
    cy.get("[data-test='double-total-score-btn']").should('not.exist')
    cy.get("[data-test='total-word-score']").should('contain', 14)
    cy.get("[data-test='reset-total-score-btn'").click()
    cy.get("[data-test='triple-total-score-btn']").click()
    cy.get("[data-test='total-word-score']").should('contain', 21)
    cy.get("[data-test='reset-total-score-btn']").click()
  })

  it('Testing tile functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/react',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        if (Array.isArray(response)) response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    mount(<LetterCalculator />)

    cy.get("[data-test='word-form']").as('word-input')
    cy.get('@word-input').type('react')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@ValidWord')
    cy.get("[data-test='valid-word-screen']").should('be.visible')

    cy.get("[data-test='word-tile']").click({ multiple: true })
    cy.get("[data-test='word-tile']").click({ multiple: true })
    cy.get("[data-test='word-tile']").click({ multiple: true })
    cy.get("[data-test='word-tile']").click({ multiple: true })
    cy.get("[data-test='word-tile']").each((tile: any) => {
      cy.get(tile).get('div h2').should('have.css', 'background-color', 'rgb(252, 241, 225)') // #fcf1e1ff
    })

    cy.get("[data-test='list-tile-E']").click()
    cy.get("[data-test='list-tile-E']").within(() => {
      cy.get('h2').should('have.css', 'background-color', 'rgb(144, 224, 239)') // #90e0ef
      cy.get('h3').should('contain', 2)
    })

    cy.get("[data-test='list-tile-C']").click()
    cy.get("[data-test='list-tile-C']").click()
    cy.get("[data-test='list-tile-C']").within(() => {
      cy.get('h2').should('have.css', 'background-color', 'rgb(252, 241, 225)') // #fcf1e1ff
      cy.get('h3').should('contain', 0)
    })
    cy.get("[data-test='total-word-score']").should('contain', 7)

  })
})