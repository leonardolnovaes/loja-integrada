///<reference types="cypress"/>

const base = require('../support/elements.js').ELEMENTS

Cypress.Commands.add('selectDeliveryType', (i) => {
    cy.get(base.deliveryType).eq(i).click()
    cy.get(base.valueDeliveryType).eq(i).invoke('text').then(res => {
        let
            value = res.split(' '),
            splitedValue = value[1].replace(',', '.'),
            valueFloat = parseFloat(splitedValue)
        return valueFloat
    })
})

Cypress.Commands.add('calculateDeliveryType', (data) => {
    cy.get(base.labelSubTotal).invoke('text').then(res => {
        let
            value = res.replace(/\s/g, ''),
            split = value.split("$"),
            splitedValue = parseFloat(split[1].replace(',', '.')),
            total = splitedValue + data
        total = total.toFixed(2).replace('.', ',')
        return total
    })
})

Cypress.Commands.add('valueDeliveryType', (i) => {
    cy.selectDeliveryType(i).then(res => {
        cy.wait('@discounts')
        cy.calculateDeliveryType(res).then(total => {
            return total
        })
    })
})

Cypress.Commands.add('valueTotalDeliveryType', (total) => {
    cy.get(base.labelTotal).should('contain', total)
})

Cypress.Commands.add('chooseACoupon', (coupon) => {
    cy.get(base.inputCoupon).type(coupon)
    cy.get(base.percentageCoupon).should('not.exist')
    cy.get(base.labelCoupon).should('not.exist')
    cy.get(base.buttonCoupon).eq(1).click()
    cy.get(base.labelCoupon).should('exist').and('contain', coupon)
})

Cypress.Commands.add('couponPercentageProduct', (order) => {
    cy.get(base.productPrice).should('be.visible').invoke('text').then(number => {
        cy.get(base.percentageCoupon).should('exist').invoke('text').then(res => {
            let value = res.match(/\d+/g, ''),
                valueReplace = value[0].replace(value, `0.${value}`),
                valueFloat = parseFloat(valueReplace),
                numberMatch = number.match(/\d+/g, ''),
                newNumber = parseFloat(numberMatch),
                discount = (newNumber * valueFloat),
                totalOrder = order.replace(',', '.'),
                total = (totalOrder - discount),
                totalFloat = total.toFixed(2),
                totalString = totalFloat.replace('.', ',').toString()
            return totalString
        })
    })
})

Cypress.Commands.add('', () => {

})

Cypress.Commands.add('couponFreeShipping', () => {
    cy.get(base.labelFreeShippingCoupon).should('contain.text', "Frete Grátis")
    cy.get(base.deliveryType).eq(1).parent('label').should('contain.text', "0,00").and('contain.text', "Frete Grátis")
})

Cypress.Commands.add('totalWithCouponWithFreeShipping', (i) => {
    cy.valueDeliveryType(i).then(res => {
        cy.get(base.labelTotal).should('contain', res)
    })
})

Cypress.Commands.add('totalWithCouponInProduct', (value) => {
    cy.get(base.labelTotal).should('contain', value)
})

