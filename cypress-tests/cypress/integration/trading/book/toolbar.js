import _get from 'lodash/get'
import _isInteger from 'lodash/isInteger'
import _map from 'lodash/map'
import _max from 'lodash/max'
import _size from 'lodash/size'
import _split from 'lodash/split'
import _toString from 'lodash/toString'
import _uniq from 'lodash/uniq'

import { numberFromLocaleString, getNumberOfTrailingZeros } from '../../../helpers/number'
import { runTests } from '../../../helpers/test'
import Book, { selectors as bs } from '../../../page-objects/components/book'

const BOOK_TITLE = 'Order Book'
const DECREASE_ZOOM_TITLE = 'Decrease Zoom'
const INCREASE_ZOOM_TITLE = 'Increase Zoom'
const DECREASE_PREC_TITLE = 'Decrease Precision'
const INCREASE_PREC_TITLE = 'Increase Precision'

const {
  DECREASE_ZOOM,
  INCREASE_ZOOM,
  DECREASE_PREC,
  INCREASE_PREC,
} = bs

const getPrecision = (nodes) => _max(_uniq(_map(nodes, (row) => {
  const number = numberFromLocaleString(row.innerText)

  // if decimal, return decimal points
  if (!_isInteger(number)) {
    return _size(_toString(_get(_split(number, '.'), '1')))
  }

  // if integer, return number of trailing zeros
  return _size(_toString(number)) - getNumberOfTrailingZeros(number)
})))

runTests({
  name: 'Book toolbar',
  getTests: () => {
    it(`has book title: ${BOOK_TITLE}`, () => {
      Book.getTitle().contains(BOOK_TITLE)
    })

    describe('zoom buttons', () => {
      it(`has '${DECREASE_ZOOM_TITLE}' button`, () => {
        Book.getToolbarButton(DECREASE_ZOOM).should('have.attr', 'title', DECREASE_ZOOM_TITLE)
      })

      it(`has '${INCREASE_ZOOM_TITLE}' button`, () => {
        Book.getToolbarButton(INCREASE_ZOOM).should('have.attr', 'title', INCREASE_ZOOM_TITLE)
      })
    })

    describe('precision buttons', () => {
      it(`has '${DECREASE_PREC_TITLE}' button`, () => {
        Book.getToolbarButton(DECREASE_PREC).should('have.attr', 'title', DECREASE_PREC_TITLE)
      })

      it(`has '${INCREASE_PREC_TITLE}' button`, () => {
        Book.getToolbarButton(INCREASE_PREC).should('have.attr', 'title', INCREASE_PREC_TITLE)
      })

      it(`by default, '${INCREASE_PREC_TITLE}' is disabled `, () => {
        Book.getToolbarButton(INCREASE_PREC).should('have.attr', 'disabled', 'disabled')
      })

      it('decrease/increase precision works', () => {
        const getColumn = Book.getColumn(true)
        // arrange
        let initialPrec
        // get initial price precision
        getColumn(bs.PRICE_COL).then((pNodes) => {
          initialPrec = getPrecision(pNodes)
        })

        // act, click decrease prec
        Book.clickToolbarButton(DECREASE_PREC)

        // assert
        // after click, button should be disabled for sometime
        Book.getToolbarButton(DECREASE_PREC).should('have.attr', 'disabled', 'disabled')
        // book is loading
        Book.isLoading()
        // price prec should decrease by 1
        getColumn(bs.PRICE_COL).then((pNodes) => {
          const updatedPrec = getPrecision(pNodes)
          expect(updatedPrec).to.equal(initialPrec - 1)
        })

        // act
        // click increase prec
        Book.clickToolbarButton(INCREASE_PREC)

        // assert
        // after click, button should be disabled for sometime
        Book.getToolbarButton(INCREASE_PREC).should('have.attr', 'disabled', 'disabled')
        // book is loading
        Book.isLoading()
        // price prec should increase by 1, so it should match initialPrec
        getColumn(bs.PRICE_COL).then((pNodes) => {
          const updatedPrec = getPrecision(pNodes)
          expect(updatedPrec).to.equal(initialPrec)
        })
      })
    })
  },
})
