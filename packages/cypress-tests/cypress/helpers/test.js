/* eslint-disable import/prefer-default-export */
import _forEach from 'lodash/forEach'

import { testPairs } from '../config'

export const runTests = ({
  name,
  getTests,
  urls = testPairs,
}) => _forEach(urls, url => {
  describe(`${name}: ${url}`, () => {
    before(() => {
      cy.visit(url)
    })

    getTests()
  })
})
