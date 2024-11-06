import React from 'react'
import LetterCalculator from '../../src/pages/letterCalculator'

describe('<LetterCalculator />', () => {
  it('renders', () => {
    cy.mount(<LetterCalculator />)
  })
})