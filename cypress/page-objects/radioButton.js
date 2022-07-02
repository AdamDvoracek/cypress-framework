class radioButton {

    checkRadioButton (label) {

        switch (label.toUpperCase()) {
            case 'YES':
                cy.get('[id=yesRadio]')
                    .first()
                        .click({force: true})
                break
            case 'IMPRESSIVE':
                cy.get('[id=impressiveRadio]')
                    .first()
                        .click({force: true})
                break
            case 'NO':
                cy.get('[id=noRadio]')
                    .first()
                        .click({force: true})
                break
        }

    }

}

export default new radioButton();