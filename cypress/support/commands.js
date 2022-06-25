
// Retrieve element by CSS class
Cypress.Commands.add('byCss', (value) => cy.get(`[class="${value}"]`));

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

