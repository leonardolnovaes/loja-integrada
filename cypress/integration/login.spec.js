///<reference types="cypress"/>

import data from "../fixtures/user.json"

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Realize Login with Success', () => {

        cy.loginWithSuccess(data.email, data.password)
    });
    it('Realize Login with Fail', () => {

        cy.loginWithFail(data.email)
    });
});