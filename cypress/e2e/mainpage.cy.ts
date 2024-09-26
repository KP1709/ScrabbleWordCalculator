describe('Scrabble Word Calculator', () => {
  it('Page loads correctly', () => {
    cy.visit('/')
  })

  it('Contains correct header', () => {
    cy.getDataTest('page-header').contains(/Scrabble word calculator/i)
  })

  it('Start screen works correctly', () => {
    cy.getDataTest('start-screen').within(() => {
      cy.get('h2').contains(/Enter a word/i)
      cy.getDataTest('view-instructions-button').click()
      cy.wait(3000)
      cy.get('div').should('be.visible')
      cy.reload()
    })
  })

  // Sad path - invalid input
  it('Invalid string entered', () => {
    cy.getDataTest('word-calculator-form').type('gre8t')
    cy.getDataTest('check-word-button').click()
    cy.getDataTest('start-screen').should('not.exist')
    cy.getDataTest('invalid-input-screen').should('exist')

  })

  // Sad path - unknown word
  it('Unknown word entered', () => {
    cy.getDataTest('word-calculator-form').type('zeel')
    cy.getDataTest('check-word-button').click()

    // Testing API get request 
    cy.intercept('GET', 'http://localhost:3000/examples', {
      // Return data from a file 
      body: {
          message: "Requests made to API"
      }
  })

    cy.getDataTest('invalid-input-screen').should('not.exist')
    cy.getDataTest('unknown-input-screen').should('exist')

  })

  // Happy path - valid word
  it('Valid word entered', () => {
    cy.getDataTest('word-calculator-form').type('typescript')
    cy.getDataTest('check-word-button').click()

    cy.getDataTest('unknown-input-screen').should('not.exist')
    cy.getDataTest('valid-input-screen').should('exist')
  })

  it('Valid word functionality works correctly', () => {
    cy.getDataTest('reset-multiplier-button').should('not.exist')
    cy.getDataTest('double-multiplier-button').click()
    cy.getDataTest('reset-multiplier-button').should('exist')
    cy.getDataTest('reset-multiplier-button').click()
    cy.getDataTest('reset-multiplier-button').should('not.exist')
    cy.getDataTest('triple-multiplier-button').click()
    cy.getDataTest('reset-multiplier-button').click()
  })
  
})