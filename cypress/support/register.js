///<reference types="cypress"/>

const base = require('../support/elements.js').ELEMENTS

Cypress.Commands.add('validEmailForRegister', (email) => {
    cy.get(base.inputInLoginForRegister).type(email)
    cy.get(base.buttonInLoginForRegister).click().url().should('contain', '/conta/criar?next=conta_index')
})

Cypress.Commands.add('confirmDataForRegister', (email, name, surname, cpf) => {
    cy.get(base.confirmEmailInRegister).type(email)
    cy.get(base.passwordInRegister).type('teste123')
    cy.get(base.confirmPasswordInRegister).type('teste123')
    cy.get(base.nameInRegister).type(`${name} ${surname}`)
    cy.get(base.CPFInRegister).type(cpf)
    cy.get(base.cellphoneInRegister).type('12996803427')
    cy.get(base.telInRegister).type('1299999999')
    cy.get(base.genderInRegister).select('Masculino').should('have.value', 'm')
    cy.get(base.birthDayInRegister).type('01/01/2030')
})

Cypress.Commands.add('addressInfoForRegister', () => {
    cy.intercept('https://api.awsli.com.br/v2/cep?cep=12225-261').as('waitCEP')
    cy.get(base.cepInRegister).type('12225261')
    cy.wait('@waitCEP')
    cy.get(base.numberAddressInRegister).type('748')
    cy.get(base.complementAddressInRegister).type('Casa 5')
})

Cypress.Commands.add('confirmRegister', () => {
    cy.get(base.buttonConfirmRegister).click().url().should('contain', '/conta/index')
})

Cypress.Commands.add('invalidEmailForRegister', (email) => {
    cy.get(base.inputInLoginForRegister).type(email)
    cy.get(base.buttonInLoginForRegister).click()
    cy.get(base.alertError).should('contain.text', 'Já existe um cliente cadastrado com este email.')
})