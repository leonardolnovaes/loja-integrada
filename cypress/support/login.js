///<reference types="cypress"/>

const base = require('../support/elements.js').ELEMENTS

Cypress.Commands.add('loginWithSuccess', (email, password) => {
    cy.get(base.loginWindow).click().url().should('contain', '/conta/login')
    cy.get(base.inputEmailInLogin).type(email)
    cy.get(base.inputPasswordInLogin).type(password)
    cy.get(base.continueButtonInLogin).click().url().should('contain', '/conta/index')
})
Cypress.Commands.add('loginWithFail', (email) => {
    cy.get(base.loginWindow).click().url().should('contain', '/conta/login')
    cy.get(base.inputEmailInLogin).type(email)
    cy.get(base.inputPasswordInLogin).type('password')
    cy.get(base.continueButtonInLogin).click()
    cy.get(base.alertError).should('contain.text', 'Não foi possível entrar pois o email ou senha não conferem. Por favor tente novamente com outro email ou senha.')
})
