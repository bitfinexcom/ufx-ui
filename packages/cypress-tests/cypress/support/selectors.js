Cypress.Commands.add('isVisible', selector => {
  cy.get(selector).should('be.visible')
})

Cypress.Commands.add('isHidden', selector => {
  cy.get(selector).should('not.exist')
})
