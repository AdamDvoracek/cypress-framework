
// Retrieve element by CSS class
Cypress.Commands.add('byCss', (value) => cy.get(`[class="${value}"]`));

Cypress.Commands.add('getGridCell', (row,column) => {

    // Get nth children of element
    cy.get('[role=rowgroup]').children('[role=row]').eq(row)
        .children('[role=gridcell]').eq(column)
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

