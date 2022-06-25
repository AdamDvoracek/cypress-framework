// import '../support/commands'

class checkBox {

    get section () {
        return cy.get('.col-md-6')
    }

    expandRow (row) {
        cy.byCss('check-box-tree-wrapper')
                    .byCss('rct-collapse rct-collapse-btn').then($elements => {
                        cy.wrap($elements[row]).click()
                })
    }

    checkRow (row) {
        cy.byCss('rct-icon rct-icon-uncheck').then($elements => {
            cy.wrap($elements[row]).click()
        })

    }
}

export default new checkBox();