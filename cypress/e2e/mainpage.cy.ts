describe('Scrabble Word Calculator', () => {
  it('Page loads correctly', () => {
    cy.visit('/')
  })

  it('Contains correct header', () => {
    cy.getDataTest('page-header').contains(/Scrabble word calculator/i)
  })

  it('Contains correct start message', () => {
    cy.getDataTest('start-screen').within(() => {
      cy.get('h2').contains(/Enter a word/i)
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


})