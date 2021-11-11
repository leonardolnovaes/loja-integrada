///<reference types="cypress"/>

const base = require('../support/elements.js').ELEMENTS

Cypress.Commands.add('selectAddressInCheckout', () => {
    cy.get(base.radioAddressCheckout).click().should('be.enabled')
})

Cypress.Commands.add('selectPACInCheckout', () => {
    cy.get(base.radioPACCheckout).click({ force: true }).should('be.enabled')
})

Cypress.Commands.add('selectSEDEXInCheckout', () => {
    cy.get(base.radioSedexCheckout).click({ force: true }).should('be.enabled')
})

Cypress.Commands.add('selectBillet', (idDelivery, delivery, payment) => {
    cy.intercept(`/carrinho/valor/?envio_id=${idDelivery}&envio_code=${delivery}&valor_subtotal=40&forma_pagamento_id=${payment}`).as('waitValue')
    cy.get(base.radioBillet).click().should('be.enabled')
    cy.wait('@waitValue')
})

Cypress.Commands.add('selectBilletWithCoupon', (idDelivery, delivery, payment, coupon) => {
    cy.intercept(`/carrinho/valor/?envio_id=${idDelivery}&envio_code=${delivery}&valor_subtotal=40&cupom=${coupon}&forma_pagamento_id=${payment}`).as('waitValue')
    cy.intercept(`/carrinho/cupom/validar.json?cupom=${coupon}`).as('waitCoupon')
    cy.get(base.radioBillet).click().should('be.enabled')
    cy.wait(['@waitValue', '@waitCoupon'])
})

Cypress.Commands.add('validateCouponInCheckoutInProduct', (coupon) => {
    cy.get(base.labelCoupon).should('have.text', coupon)
    cy.get(base.labelDiscountsCouponCheckout).should('exist')
})

Cypress.Commands.add('validateCouponInCheckoutInShipping', (coupon) => {
    cy.get(base.labelCoupon).should('have.text', coupon)
    cy.get(base.labelFreeShippingCouponCheckout).should('exist')
})

Cypress.Commands.add('calculateSubTotalInCheckout', () => {
    cy.get(base.labelQtyProductCheckout).invoke('text').then(qty => {
        cy.get(base.labelUnitPriceCheckout).invoke('text').then(unitPrice => {
            let qtyFloat = parseFloat(qty),
                unitPriceMatch = parseFloat(unitPrice.match(/\d+/g, '')),
                subTotal = (qtyFloat * unitPriceMatch).toFixed(2).replace('.', ','),
                promise = [subTotal, qtyFloat, unitPriceMatch]
            return promise
        })
    })
})

Cypress.Commands.add('calculateTotalInCheckoutWithDiscount', (subTotal) => {
    cy.get(base.labelSubTotalCheckout).should('contain.text', subTotal)
    cy.get(base.labelShippingTaxCheckout).invoke('text').then(tax => {
        cy.get(base.labelDiscountsCheckout).invoke('text').then(discount => {
            let subTotalReplace = parseFloat(subTotal.replace(',', '.')),
                taxReplace = parseFloat(tax.match(/\d+/g, '')),
                discountReplace = parseFloat(discount.match(/\d+/g, '')),
                totalTax = (subTotalReplace + taxReplace),
                total = (totalTax - discountReplace).toFixed(2),
                totalReplace = (total.replace('.', ',')),
                promise = [totalReplace, taxReplace, discountReplace]
            return promise
        })
    })
})

Cypress.Commands.add('calculateTotalInCheckoutWithCoupon', (subTotal) => {
    cy.get(base.labelSubTotalCheckout).should('contain.text', subTotal)
    cy.get(base.labelShippingTaxCheckout).invoke('text').then(tax => {
        cy.get(base.labelFreeShippingCouponCheckout).invoke('text').then(discount => {
            if (discount == 'Frete grátis') {
                let shipping = '0'
                discount = shipping
            }
            let subTotalReplace = parseFloat(subTotal.replace(',', '.')),
                taxReplace = parseFloat(tax.match(/\d+/g, '')),
                discountReplace = parseFloat(discount.match(/\d+/g, '')),
                totalTax = (subTotalReplace + taxReplace),
                total = (totalTax - discountReplace).toFixed(2),
                totalReplace = (total.replace('.', ',')),
                promise = [totalReplace, taxReplace, discountReplace]
            return promise
        })
    })
})

Cypress.Commands.add('totalInCheckoutWithDiscount', (total) => {
    cy.get(base.labelTotalCheckout).should('contain.text', total)
})

Cypress.Commands.add('finalizeOrder', () => {
    cy.get(base.buttonFinalizeOrderCheckout).click().url().should('contain', '/finalizacao')
})

Cypress.Commands.add('validatePostCheckoutWithBillet', () => {
    cy.get(base.labelMessageBilletPostCheckout).should('have.text', 'BOLETO PRONTO')
    cy.get(base.buttonPrintOutBilletPostCheckout).should('have.attr', 'target', '_blank')
    cy.get(base.labelWaitPaymentBilletPostCheckout).should('have.text', 'Aguardando pagamento')
    cy.get(base.labelOrderNumberPostCheckout).should('be.visible')
    cy.get(base.iframeBilletPostCheckout).should('be.visible')
    cy.get(base.imgPostCheckout).eq(0).should('have.attr', 'alt', 'MercadoPago Boleto')
})

Cypress.Commands.add('validatePostCheckoutWithPAC', (value) => {
    cy.get(base.imgPostCheckout).eq(1).should('have.attr', 'alt', 'PAC')
    cy.get(base.labelDeadlinePostCheckout).should('have.text', '6 dias úteis')
    cy.get(base.labelShippingTaxPostCheckout).should('contain', value)
})

Cypress.Commands.add('validatePostCheckoutWithSEDEX', (value) => {
    cy.get(base.imgPostCheckout).eq(1).should('have.attr', 'alt', 'SEDEX')
    cy.get(base.labelDeadlinePostCheckout).should('have.text', '1 dia útil')
    cy.get(base.labelShippingTaxPostCheckout).should('contain', value)
})

Cypress.Commands.add('validatePostCheckoutWithFreeShipping', (value) => {
    cy.get(base.imgPostCheckout).eq(1).should('have.attr', 'alt', 'Frete Grátis')
    cy.get(base.labelDeadlinePostCheckout).should('have.text', '1 dia útil')
    cy.get(base.labelShippingTaxPostCheckout).should('contain', value)
})

Cypress.Commands.add('validateCouponInPostCheckoutOnProduct', (coupon, discount) => {
    cy.get(base.labelCouponNamePostCheckout).eq(1).should('contain.text', coupon)
    cy.get(base.labelCouponNamePostCheckout).eq(2).should('contain', discount)
})

Cypress.Commands.add('validateCouponInPostCheckoutOnShipping', (coupon, discount) => {
    cy.get(base.labelCouponNamePostCheckout).eq(1).should('contain.text', coupon)
    cy.get(base.labelCouponNamePostCheckout).eq(0).should('contain', discount)
})

Cypress.Commands.add('validateTotalInPostCheckoutWithDiscounts', (quantity, unitPrice, subTotal, tax, discount, total) => {
    cy.get(base.labelUnitPricePostCheckout).should('contain.text', unitPrice)
    cy.get(base.labelQuantityProductPostCheckout).eq(2).should('contain.text', quantity)
    cy.get(base.labelSubTotalPostCheckout).should('contain.text', subTotal)
    cy.get(base.labelShippingTaxPostCheckout).should('contain.text', tax)
    cy.get(base.labelDiscountsPostCheckout).should('contain.text', discount)
    cy.get(base.labelTotalPostCheckout).should('contain.text', total)
})

Cypress.Commands.add('validateTotalInPostCheckoutWithFreeShipping', (quantity, unitPrice, subTotal, tax, total) => {
    cy.get(base.labelUnitPricePostCheckout).should('contain.text', unitPrice)
    cy.get(base.labelQuantityProductPostCheckout).eq(2).should('contain.text', quantity)
    cy.get(base.labelSubTotalPostCheckout).should('contain.text', subTotal)
    cy.get(base.labelShippingTaxPostCheckout).should('contain.text', tax)
    cy.get(base.labelCouponNamePostCheckout).eq(1).should('contain.text', 'FRETEGRATIS')
    cy.get(base.labelTotalPostCheckout).should('contain.text', total)
})