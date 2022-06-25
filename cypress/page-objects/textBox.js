class textBox {

    get fullName () {
        return cy.get('#userName')
    }
    get email () {
        return cy.get('#userEmail')
    }
    get currentAddress () {
        return cy.get('#currentAddress')
    }
    get permanentAddress () {
        return cy.get('#permanentAddress')
    }
    get email () {
        return cy.get('#userEmail')
    }
    get submit() {
        return cy.get('#submit')
    }
}

export default new textBox();