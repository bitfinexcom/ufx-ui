import _forEach from 'lodash/forEach'
import _map from 'lodash/map'

import { isPositive, isSorted } from '../../../helpers/array'
import { numberFromLocaleString } from '../../../helpers/number'
import { runTests } from '../../../helpers/test'
import Book, { selectors as bs } from '../../../page-objects/components/book'

const mapNodeToNumber = (nodes) => _map(nodes, (row) => numberFromLocaleString(row.innerText))

const headers = {
  [bs.ORDER_COUNT_COL]: '',
  [bs.COUNT_COL]: 'Count',
  [bs.AMOUNT_COL]: 'Amount',
  [bs.TOTAL_COL]: 'Total',
  [bs.PRICE_COL]: 'Price',
}

runTests({
  name: 'Book content',
  getTests: () => {
    it('intially, book is loading', () => {
      Book.isLoading()
    })

    it('then, book is visible', () => {
      Book.isVisible()
    })

    describe('bid content', () => {
      const getBidHeader = Book.getHeader(true)
      const getBidColumn = Book.getColumn(true)

      // tests order and heading for columns
      describe('headers', () => {
        // arrange
        _forEach(headers, (val, key) => {
          it(`column-${key} heading: '${val}'`, () => {
            // assert
            getBidHeader(key).should('have.text', val)
          })
        })
      })

      it(`'${headers[bs.COUNT_COL]}' is positive number`, () => {
        // arrange
        getBidColumn(bs.COUNT_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isPositive(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.AMOUNT_COL]}' is positive number`, () => {
        // arrange
        getBidColumn(bs.AMOUNT_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isPositive(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.TOTAL_COL]}' column is in ascending order`, () => {
        // arrange
        getBidColumn(bs.TOTAL_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isSorted(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.PRICE_COL]}' column is in descending order`, () => {
        // arrange
        getBidColumn(bs.PRICE_COL).then((pNodes) => {
          const data = mapNodeToNumber(pNodes)

          // assert
          expect(isSorted(data, false)).to.equal(true)
        })
      })
    })

    describe('ask content', () => {
      const getAskColumn = Book.getColumn(false)

      it('columns are reversed', () => {
        Book.getHeaders(false).should('have.css', 'flex-direction', 'row-reverse')
        Book.getRows(false).should('have.css', 'flex-direction', 'row-reverse')
      })

      it(`'${headers[bs.COUNT_COL]}' is positive number`, () => {
        // arrange
        getAskColumn(bs.COUNT_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isPositive(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.AMOUNT_COL]}' is positive number`, () => {
        // arrange
        getAskColumn(bs.AMOUNT_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isPositive(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.TOTAL_COL]}' column is in ascending order`, () => {
        // arrange
        getAskColumn(bs.TOTAL_COL).then((tNodes) => {
          const data = mapNodeToNumber(tNodes)

          // assert
          expect(isSorted(data)).to.equal(true)
        })
      })

      it(`'${headers[bs.PRICE_COL]}' column is in ascending order`, () => {
        // arrange
        getAskColumn(bs.PRICE_COL).then((pNodes) => {
          const data = mapNodeToNumber(pNodes)

          // assert
          expect(isSorted(data)).to.equal(true)
        })
      })
    })
  },
})
