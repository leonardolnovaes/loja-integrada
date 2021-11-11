///<reference types="cypress"/>

import data from "../fixtures/user.json"

describe('Checkout', () => {

    describe('Checkout sem cupom', () => {
        beforeEach(() => {
            cy.loginAPI(data.email, data.password)
            cy.removeProductAPI()
            cy.removeCoupon()
            cy.addProductAPI()
            cy.visit('/checkout')
        });

        it('Finalizar um pedido com Boleto e PAC', () => {
            cy.selectAddressInCheckout()
            cy.selectPACInCheckout()
            cy.selectBillet('2', 'pac', '520160')
            cy.calculateSubTotalInCheckout().then(subTotal => {
                cy.calculateTotalInCheckoutWithDiscount(subTotal[0]).then(total => {
                    cy.totalInCheckoutWithDiscount(total[0])
                    cy.finalizeOrder()
                    cy.validatePostCheckoutWithBillet()
                    cy.validatePostCheckoutWithPAC(total[1])
                    cy.validateTotalInPostCheckoutWithDiscounts(subTotal[1], subTotal[2], subTotal[0], total[1], total[2], total[0])
                })
            })
        });
    })

    describe('Checkout com cupom', () => {
        beforeEach(() => {
            cy.loginAPI(data.email, data.password)
            cy.removeProductAPI()
            cy.removeCoupon()
            cy.addProductAPI()
        });
        context('Cupom no Produto', () => {
            let actualCoupon = "30REAIS"
            beforeEach(() => {
                cy.addCouponAPI(actualCoupon)
                cy.visit('/checkout')
            });
            it.skip('Finalizar um pedido com cupom com outros descontos', () => {
                cy.selectAddressInCheckout()
                cy.selectPACInCheckout()
                cy.selectBillet()
                cy.finalizeOrder()
                cy.validatePostCheckoutWithBillet()
                cy.validatePostCheckoutWithPAC(total[1])
            });
            it('Finalizar um pedido com cupom com desconto no produto com PAC', () => {
                cy.selectAddressInCheckout()
                cy.selectPACInCheckout()
                cy.selectBilletWithCoupon('2', 'pac', '520160', actualCoupon)
                cy.validateCouponInCheckoutInProduct(actualCoupon)
                cy.calculateSubTotalInCheckout().then(subTotal => {
                    cy.calculateTotalInCheckoutWithCoupon(subTotal[0]).then(total => {
                        cy.totalInCheckoutWithDiscount(total[0])
                        cy.finalizeOrder()
                        cy.validatePostCheckoutWithBillet()
                        cy.validatePostCheckoutWithPAC(total[1])
                        cy.validateTotalInPostCheckoutWithDiscounts(subTotal[1], subTotal[2], subTotal[0], total[1], total[2], total[0])
                        cy.validateCouponInPostCheckoutOnProduct(actualCoupon, total[2])
                    })
                })
            })
            it('Finalizar um pedido com cupom com desconto no produto com SEDEX', () => {
                cy.selectAddressInCheckout()
                cy.selectSEDEXInCheckout()
                cy.selectBilletWithCoupon('1', 'sedex', '520160', actualCoupon)
                cy.validateCouponInCheckoutInProduct(actualCoupon)
                cy.calculateSubTotalInCheckout().then(subTotal => {
                    cy.calculateTotalInCheckoutWithCoupon(subTotal[0]).then(total => {
                        cy.totalInCheckoutWithDiscount(total[0])
                        cy.finalizeOrder()
                        cy.validatePostCheckoutWithBillet()
                        cy.validatePostCheckoutWithSEDEX(total[1])
                        cy.validateTotalInPostCheckoutWithDiscounts(subTotal[1], subTotal[2], subTotal[0], total[1], total[2], total[0])
                        cy.validateCouponInPostCheckoutOnProduct(actualCoupon, total[2])
                    })
                })
            });


        })
        context('Cupom no frete', () => {
            let freightCoupon = "FRETEGRATIS"
            beforeEach(() => {
                cy.addCouponAPI(freightCoupon)
                cy.visit('/checkout')
            });
            it('Finalizar um pedido com cupom com frete grátis SEDEX', () => {
                cy.selectAddressInCheckout()
                cy.selectSEDEXInCheckout()
                cy.selectBilletWithCoupon('1', 'sedex', '520160', freightCoupon)
                cy.validateCouponInCheckoutInShipping(freightCoupon)
                cy.calculateSubTotalInCheckout().then(subTotal => {
                    cy.calculateTotalInCheckoutWithCoupon(subTotal[0]).then(total => {
                        cy.totalInCheckoutWithDiscount(total[0])
                        cy.finalizeOrder()
                        cy.validatePostCheckoutWithBillet()
                        cy.validatePostCheckoutWithFreeShipping(total[1])
                        cy.validateTotalInPostCheckoutWithFreeShipping(subTotal[1], subTotal[2], subTotal[0], total[1], total[0])
                        cy.validateCouponInPostCheckoutOnShipping(freightCoupon, total[2])
                    })
                })
            });
        });
    });
});
