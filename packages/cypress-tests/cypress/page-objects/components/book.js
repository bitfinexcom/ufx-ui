export const selectors = {
  BOOK: '.ufx-book',
  MAIN: '.main',
  SIDE: '.side',
  ROW: '.row',
  SPINNER: '.ufx-book__error .ufx-spinner',
  TOOLBAR_TITLE: '.grid-layout__title',
  TOOLBAR: '.ufx-book__toolbar',
  ORDER_COUNT_COL: '1',
  COUNT_COL: '2',
  AMOUNT_COL: '3',
  TOTAL_COL: '4',
  PRICE_COL: '5',
  DECREASE_ZOOM: 0,
  INCREASE_ZOOM: 1,
  DECREASE_PREC: 2,
  INCREASE_PREC: 3,
  SPREAD: '.spread',
}

const BID = 0
const ASK = 1

export default class Book {
  static isLoading() {
    cy.isVisible(selectors.SPINNER)
  }

  static isVisible() {
    cy.isVisible(selectors.BOOK)
  }

  static getElement(selector = '') {
    return cy.get(selectors.BOOK).find(selector)
  }

  static getSide(bid = true) {
    const side = bid ? BID : ASK
    return cy.get(`${selectors.BOOK} ${selectors.SIDE}`).eq(side)
  }

  static getHeaders = (bid) => this.getSide(bid).find('.header')

  static getHeader = (bid) => (colNum) => this.getHeaders(bid).find(`div:nth-child(${colNum})`)

  static getRows(bid) {
    return this.getSide(bid).find(selectors.ROW)
  }

  static clickRow = (bid) => (rowNum) => this.getRows(bid).eq(rowNum).click()

  static getColumn = (bid) => (column) => {
    const row = this.getRows(bid).find(`div:nth-child(${column})`)

    if (column === selectors.ORDER_COUNT_COL) {
      return row.find('div')
    }

    if (column === selectors.COUNT_COL) {
      return row
    }

    return row.find('span')
  }

  static getToolbar() {
    return cy.get(selectors.TOOLBAR)
  }

  static getTitle() {
    return this.getToolbar().parent().parent()
      .find(selectors.TOOLBAR_TITLE)
  }

  static getToolbarButton(index) {
    return this.getToolbar().find('button').eq(index)
  }

  static clickToolbarButton(index) {
    return this.getToolbarButton(index).click()
  }
}
