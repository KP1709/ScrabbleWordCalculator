describe('Scrabble Word Calculator', () => {
  it('Page loads correctly', () => {
    cy.visit('/')
  })

  it('Contains correct header', () =>{
    cy.getDataTest('page-header').contains(/Scrabble word calculator/i)
  })
})