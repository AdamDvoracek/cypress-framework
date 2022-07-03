import textBox from '../page-objects/textBox'
import data from '../fixtures/data.json'
import labels from '../labels/en/labels.json'
import checkBox from '../page-objects/checkBox'
import radioButton from '../page-objects/radioButton'
import localization from '../../localization/en/labels.json'
import { expect } from 'chai'

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

    // Change form and submit
    cy.get('@name').type('Foreign tester').then(() => {
      cy.get('.border')
        .should('include.text', labels.textBoxScreen.name + ":" + data.client)

      textBox.submit.click().then(() => {
        cy.get('.border')
          .should('not.include.text', labels.textBoxScreen.name + ":" + data.client)
      })
    })
  })

  it('Interact with check box', () => {

    cy.visit('/' + '/checkbox')

    checkBox.expandRow(0)
    checkBox.checkRow(1)

    checkBox.expandRow(3)
    checkBox.checkRow(3)

    // Get current expanded tree
    let tree =['Home', 'Desktop', 'Documents', 'Downloads', 'Word File.doc', 'Excel File.doc']

    for (let i = 0; i < tree.length; i++) {
      checkBox.getRow(i).should('have.text', tree[i])
    }
  })

  it('Interact with radio button', () => {
    
    cy.visit('/' + '/radio-button')

    cy.byCss('mb-3').should('have.text', 'Do you like the site?')

    // Click force when element is radio button
    cy.get('[id=yesRadio]').first().click({force: true})

    let answer = [
      'Yes',
      'Impressive',
      'No'
    ]

    let verifyAnswer = function (label) {

      // Radio button with value 'No' is not clickable
      if (label == 'No') {
        radioButton.checkRadioButton(label)
        cy.once('fail', () => {
          cy.get('[id=noRadio]')
            .should('have.class', 'custom-control-label disabled')
            done()
        })
      }
      else {
        radioButton.checkRadioButton(label)
        cy.get('.mt-3')
        .should('have.text', `You have selected ${label}`)
      }
    }

    answer.forEach(verifyAnswer)

  })

  // Now using Cypress commands instead of POM
  it.only('Interact with web table', () => {

    cy.visit('/' + '/webtables')

    // Using getGridCell with args (y = row, x = column)
    cy.getGridCell(1,1).should('have.text', 'Cantrell')

    // Now verify whole grid row
    let row = {
      'firstName': 'Cierra',
      'lastName': 'Vega',
      'age': '39',
      'email': 'cierra@example.com',
      'salary': '10000',
      'department': 'Insurance'
    }

    for (let i = 0; i < Object.keys(row).length; i++) {
      cy.get('[role=rowgroup]').children('[role=row]').eq(0)
        .children('[role=gridcell]').eq(i)
          .should('have.text', Object.values(row)[i])
    }

    // Load localization data and verify column labels
    cy.get('[role=columnheader]').eq(0)
      .should('have.text', localization.columns.firstName)
      cy.get('[role=columnheader]').eq(1)
      .should('have.text', localization.columns.lastName)

  })
})