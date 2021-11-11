///<reference types="cypress"/>

import data from "../fixtures/user.json"

describe('Cart', () => {
    beforeEach(() => {
        cy.loginAPI(data.email, data.password)
        cy.removeCoupon()
        cy.removeProductAPI()
        cy.addProductAPI()
        cy.intercept('/carrinho/valor-descontos').as('discounts')
        cy.visit('/carrinho/index')
        cy.wait('@discounts')
    });
    let type = [
        "retirar na loja",
        "PAC",
        "Sedex"
    ]
    for (let i = 0; i < 3; i++) {
        it(`Selecionar ${type[i]}`, () => {
            cy.valueDeliveryType(i).then(res => {
                cy.valueTotalDeliveryType(res)
            })
        });
    }
    it.skip('Cupom acumulativo com outros descontos', () => {
        cy.valueDeliveryType(1).then(res => {
            cy.chooseACoupon('10OFF')
            cy.couponPercentageProduct(res).then(per => {
                cy.totalWithCouponInProduct(per)
            })
        })
    })
    it('Cupom aplica desconto no produto', () => {
        cy.valueDeliveryType(0).then(res => {
            cy.chooseACoupon('10OFF')
            cy.couponPercentageProduct(res).then(per => {
                cy.totalWithCouponInProduct(per)
            })
        })
    })
    it('Cupom aplica frete grátis na compra', () => {
        cy.valueDeliveryType(2).then(res => {
            cy.valueTotalDeliveryType(res)
            cy.chooseACoupon('FRETEGRATIS')
            cy.couponFreeShipping(res)
            cy.totalWithCouponWithFreeShipping(1)
        })
    })
    it.skip('Cupom tem valor minimo para compra', () => {

    });
})
