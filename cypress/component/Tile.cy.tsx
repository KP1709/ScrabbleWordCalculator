import React from "react"
import { v4 as uuid } from "uuid"
import Tile from "../../src/components/tile"
import "../../src/styles/tile.css"


const char = {
  letter: 'T',
  score: 1
}

describe('Tile.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<Tile letter={char.letter} score={char.score} />)
  })
})