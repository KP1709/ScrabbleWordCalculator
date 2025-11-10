/// <reference types="cypress" />

describe('Letter Calculator', () => {
  it('Visits site', () => {
    cy.visit('/')
  })

  it('Testing screen functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/type',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    cy.visit('/')
    cy.get("[data-test='word-form']").as('word-input')
    cy.get("[data-test='submit-word-form-btn']").should('exist')

    cy.get('@word-input').type('gr8t')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.get("[data-test='invalid-entry-screen']").should('be.visible')

    cy.visit('/')
    cy.get('@word-input').type('abcdef')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.get("[data-test='unknown-word-screen']").should('be.visible')

    cy.visit('/')
    cy.get('@word-input').type('type')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@ValidWord')
    cy.get("[data-test='valid-word-screen']").should('be.visible')
  })

  it('Testing valid word from API functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/react',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    cy.visit('/')
    cy.get("[data-test='word-form']").as('word-input')
    cy.get('@word-input').type('counterbalancing')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.get("[data-test='invalid-entry-screen']").should('be.visible')

    cy.visit('/')
    cy.get('@word-input').type('knickknacks')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.get("[data-test='max-tile-limit-exceeded-screen']").should('be.visible')

    cy.visit('/')
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

  it('Testing valid word from extended check functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/zarf',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 404,
          body: { message: 'Word not in API' }
        })
      })
      .as('WordNotInAPI')

    cy.intercept('POST', '/.netlify/functions/supabase?word=zarf',
      (response: { reply: (arg0: { statusCode: number; body: { data: any } }) => void }) => {
        response.reply({
          statusCode: 200,
          body: { data: [{ "word": "zarf" }] }
        })
      }).as('WordInSupabase')

    cy.visit('/')
    cy.get("[data-test='word-form']").as('word-input')
    cy.get('@word-input').type('zarf')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@WordNotInAPI').then((interception) => {
      expect(interception?.response?.statusCode).to.eq(404);
    })
    cy.wait('@WordInSupabase').then((interception2) => {
      expect(interception2?.response?.statusCode).to.eq(200);
    })
    cy.get("[data-test='valid-word-screen']").should('be.visible')
  })

  it('Testing tile functionality', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/react',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 200,
          body: { message: 'Valid word' }
        })
      }).as('ValidWord')

    cy.visit('/')

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

  it('Testing extended word check if database is not running', () => {
    cy.intercept('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/zeel',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 404,
          body: { message: 'Word not in API' }
        })
      })
      .as('WordNotInAPI')

    cy.intercept('POST', '/.netlify/functions/supabase?word=zeel',
      (response: { reply: (arg0: { statusCode: number; body: { message: string } }) => void }) => {
        response.reply({
          statusCode: 500,
          body: { message: 'Check is down' }
        })
      }).as('WordNotInSupabase')

    cy.visit('/')
    cy.get("[data-test='word-form']").as('word-input')
    cy.get('@word-input').type('zeel')
    cy.get("[data-test='submit-word-form-btn']").click()
    cy.wait('@WordNotInAPI').then((interception) => {
      expect(interception?.response?.statusCode).to.eq(404);
    })
    cy.wait('@WordNotInSupabase').then((interception2) => {
      expect(interception2?.response?.statusCode).to.eq(500);
    })
    cy.get("[data-test='invalid-entry-screen']").should('be.visible')
  })
})