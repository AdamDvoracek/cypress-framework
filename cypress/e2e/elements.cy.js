import textBox from '../page-objects/textBox'
import data from '../fixtures/data.json'
import labels from '../labels/en/labels.json'
import checkBox from '../page-objects/checkBox'

describe('Interact with all types of elements', () => {
  it('Interact with text-box', () => {

    cy.visit('/' + '/text-box')

    textBox.fullName.as('name')
    cy.get('@name').type(data.client)
    textBox.email.type(data.email)
    textBox.currentAddress.type(data.address)

    textBox.submit
      .should('be.enabled')

    textBox.submit.click().then(() => {
      cy.get('.border').as('output')
      cy.get('@output').should('be.visible')

      cy.get('@output')
        .should('include.text', labels.textBoxScreen.name + ":" + data.client)
        .should('include.text', labels.textBoxScreen.email + ":" + data.email)
        .should('include.text', labels.textBoxScreen.currentAddress + " :" + data.address)
    })

    cy.get('@name').clear()

    cy.get('@name').type('Foreign tester').then(() => {
      cy.get('.border')
        .should('include.text', labels.textBoxScreen.name + ":" + data.client)

      textBox.submit.click().then(() => {
        cy.get('.border')
          .should('not.include.text', labels.textBoxScreen.name + ":" + data.client)
      })
    })
  })

  // TO-DO
  it.only('Interact with check box', () => {

    cy.visit('/' + '/checkbox')

    checkBox.expandRow(0)
    checkBox.checkRow(1)

    checkBox.expandRow(3)

    // Verify downloads rows are unchecked

    // Check downloads, verify sub-rows are checked


    checkBox.checkRow(3)
  })
})