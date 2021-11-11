///<reference types="cypress"/>

import data from "../fixtures/user.json"

const pure = require('pure-gen');
pure.setLocale('pt_BR');
describe('Login', () => {
    const createNewUser = () => {
        return {
            name: pure.name.firstName(),
            surname: pure.name.lastName(),
            email: pure.internet.email(),
            cnpj: pure.document.brazilianCompanyNumber(),
            cpf: pure.document.brazilianCitizenNumber(),
            corporateName: pure.company.companyName()
        }
    }
    beforeEach(() => {
        cy.visit('/conta/login')
    });
    it('Realize register', () => {
        const user = createNewUser()
        cy.validEmailForRegister(user.email)
        cy.confirmDataForRegister(user.email, user.name, user.surname, user.cpf)
        cy.addressInfoForRegister()
        cy.confirmRegister()
    });
    it('Invalid Email', () => {
        cy.invalidEmailForRegister(data.email)
    });
});