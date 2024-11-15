import { mount } from 'cypress/react18'
import LetterCalculator from '../../src/pages/letterCalculator'

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

    cy.getDataTest('word-form').as('word-input')
    cy.getDataTest('submit-word-form-btn').should('exist')

    cy.get('@word-input').type('gr8t')
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/gr8t', {
      statusCode: 404,
      body: { message: 'Not a valid word' }
    })
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('invalid-entry-screen').should('be.visible')

    cy.get('@word-input').type('abcdef')
    cy.getDataTest('submit-word-form-btn').click()
    cy.wait('@UnknownWord')
    cy.getDataTest('unknown-word-screen').should('be.visible')

    cy.get('@word-input').type('type')
    cy.getDataTest('submit-word-form-btn').click()
    cy.wait('@ValidWord')
    cy.getDataTest('valid-word-screen').should('be.visible')
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

    cy.getDataTest('word-form').as('word-input')
    cy.get('@word-input').type('react')
    cy.getDataTest('submit-word-form-btn').click()
    cy.wait('@ValidWord')
    cy.getDataTest('valid-word-screen').should('be.visible')

    cy.getDataTest('double-total-score-btn').click()
    cy.getDataTest('double-total-score-btn').should('not.exist')
    cy.getDataTest('total-word-score').should('contain', 14)
    cy.getDataTest('reset-total-score-btn').click()
    cy.getDataTest('triple-total-score-btn').click()
    cy.getDataTest('total-word-score').should('contain', 21)
    cy.getDataTest('reset-total-score-btn').click()
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

    cy.getDataTest('word-form').as('word-input')
    cy.get('@word-input').type('react')
    cy.getDataTest('submit-word-form-btn').click()
    cy.wait('@ValidWord')
    cy.getDataTest('valid-word-screen').should('be.visible')

    cy.getDataTest('word-tile').click({ multiple: true })
    cy.getDataTest('word-tile').click({ multiple: true })
    cy.getDataTest('word-tile').click({ multiple: true })
    cy.getDataTest('word-tile').click({ multiple: true })
    cy.getDataTest('word-tile').each((tile: any) => {
      cy.get(tile).get('div h2').should('have.css', 'background-color', 'rgb(255, 255, 255)') // #ffffff
    })

    cy.getDataTest('list-tile-E').click()
    cy.getDataTest('list-tile-E').within(() => {
      cy.get('h2').should('have.css', 'background-color', 'rgb(144, 224, 239)') // #90e0ef
      cy.get('h3').should('contain', 2)
    })
  
    cy.getDataTest('list-tile-C').click()
    cy.getDataTest('list-tile-C').click()
    cy.getDataTest('list-tile-C').within(() => {
      cy.get('h2').should('have.css', 'background-color', 'rgb(0, 119, 182)') // #0077b6
      cy.get('h3').should('contain', 9)
    })
    cy.getDataTest('total-word-score').should('contain', 14)

  })
})