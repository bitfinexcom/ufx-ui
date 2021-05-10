import { numberFromLocaleString } from '../../../helpers/number'
import { runTests } from '../../../helpers/test'
import Book, { selectors as bs } from '../../../page-objects/components/book'
import Orderform from '../../../page-objects/components/orderform'

runTests({
  name: 'Book row',
  getTests: () => {
    it('when book row is clicked, should fill up orderform price input', () => {
      const getColumn = Book.getColumn(true)

      // arrange
      getColumn(bs.PRICE_COL).eq(1).then((pNode) => {
        // get row price
        const price = numberFromLocaleString(pNode.text())

        // act
        Book.clickRow(true)(1)

        // assert
        Orderform.getPrice().should('have.value', price)
      })
    })
  },
})
