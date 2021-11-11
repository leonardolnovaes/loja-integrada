///<reference types="cypress"/>

Cypress.Commands.add('loginAPI', (email, password) => {
    cy.request({
        url: "/conta/login",
        method: "POST",
        form: true,
        body: {
            "next": "conta_index",
            "email": email,
            "senha": password
        }
    })
})

Cypress.Commands.add('addProductAPI', () => {
    cy.request({
        url: "/carrinho/produto/118475116/adicionar",
        method: "POST",
        form: true
    })
})

Cypress.Commands.add('removeProductAPI', () => {
    cy.request({
        url: "/carrinho/produto/118475116/remover",
        method: "POST",
        form: true
    })
})
Cypress.Commands.add('addCouponAPI', (coupon) => {
    cy.request({
        url: '/carrinho/cupom/validar',
        method: "POST",
        form: true,
        body: {
            cupom: coupon
        }
    })
})

Cypress.Commands.add('removeCoupon', () => {
    let coupon = [
        "10OFF",
        "FRETEGRATIS",
        "30REAIS"
    ]
    for (let i = 0; i < 3; i++) {
        cy.request({
            url: '/carrinho/cupom/remover',
            method: "GET",
            form: true,
            qs: {
                cupom: coupon[i]
            }
        })
    }
})

Cypress.Commands.add('insertAProductInCart', () => {
    cy.request({
        url: '/checkout/redirect/',
        method: "POST",
        form: true
    })
})