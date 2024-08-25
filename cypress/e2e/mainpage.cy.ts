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
})