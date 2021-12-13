// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })
  it('check emails', () => {
    cy
      .get('[data-cy="emails"]')
      .children()
      .should('have.length', 6)
    // cy.contains('h1', 'Welcome to Your Vu.js App')
  })
})
