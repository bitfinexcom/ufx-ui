export const selectors = {
  ORDERFORM: '.ufx-order-form',
  PRICE_INPUT: '.price-input input',
}

export default class Orderform {
  static getForm() {
    return cy.get(selectors.ORDERFORM)
  }

  static getPrice() {
    return this.getForm().find(selectors.PRICE_INPUT)
  }
}
