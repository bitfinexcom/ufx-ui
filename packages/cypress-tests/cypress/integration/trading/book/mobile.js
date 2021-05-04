import { numberFromLocaleString } from '../../../helpers/number'
import { runTests } from '../../../helpers/test'
import Book, { selectors as bs } from '../../../page-objects/components/book'

runTests({
  name: 'Book mobile content',
  getTests: () => {
    beforeEach(() => {
      // arrange
      cy.showMobileView()
      Book.getElement(bs.SPREAD).scrollIntoView()
    })

    it('has stacked view', () => {
      // assert
      Book.getElement(bs.MAIN).should('have.css', 'flex-direction', 'column-reverse')
    })

    describe('book spread', () => {
      it('is visible', () => {
        // assert
        Book.getElement(bs.SPREAD).should('be.visible')
      })

      it('spread is positive number', () => {
        // arrange
        Book.getElement(`${bs.SPREAD} .row div:nth-child(${bs.PRICE_COL})`).then((node) => {
          const spread = numberFromLocaleString(node.text())

          // assert
          cy.wrap(spread).should('be.gte', 0)
        })
      })

      it('total is positive number', () => {
        // arrange
        Book.getElement(`${bs.SPREAD} .row div:nth-child(${bs.TOTAL_COL})`).then((node) => {
          const total = numberFromLocaleString(node.text())

          // assert
          cy.wrap(total).should('be.gte', 0)
        })
      })
    })
  },
})
