import LetterCalculator from '../../src/pages/letterCalculator'

describe('<LetterCalculator />', () => {
  it('Testing screen functionality', () => {
    cy.mount(<LetterCalculator />)

    cy.getDataTest('word-form').as('word-input')
    cy.get('@word-input').type('gr8t') 
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('invalid-entry-screen').should('be.visible')

    cy.get('@word-input').type('abcdef')
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('unknown-word-screen').should('be.visible')

    cy.get('@word-input').type('zeel')
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('unknown-word-screen').should('be.visible')

    cy.get('@word-input').type('type')
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('valid-word-screen').should('be.visible')

  })

  it('Testing valid word functionality', () => {
    cy.mount(<LetterCalculator />)

    cy.getDataTest('word-form').as('word-input')
    cy.get('@word-input').type('react')
    cy.getDataTest('submit-word-form-btn').click()
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
    cy.mount(<LetterCalculator />)

    cy.getDataTest('word-form').as('word-input')
    cy.get('@word-input').type('react')
    cy.getDataTest('submit-word-form-btn').click()
    cy.getDataTest('valid-word-screen').should('be.visible')
    
    cy.getDataTest('word-tile').click({multiple: true})
    cy.getDataTest('word-tile').click({multiple: true})
    cy.getDataTest('word-tile').click({multiple: true})
    cy.getDataTest('word-tile').click({multiple: true}) 
  })
})