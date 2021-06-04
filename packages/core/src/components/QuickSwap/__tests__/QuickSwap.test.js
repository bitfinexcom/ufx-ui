/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'

import * as Classes from '../../../common/classes'
import { StoreProvider } from '../../../store'
// import { getWrapper, updateFormikField } from '../../../utils/test.helpers'
import Component from '../QuickSwap'

const getWrapper = val => val
const updateFormikField = val => val

const data = {
  tokenList: {
    btc: 'Bitcoin',
    eth: 'Ethereum',
  },
  getConversionRate: () => 100.12,
  getAvailableBalance: () => 100,
}
const onSwapClick = jest.fn()
const inputList = {
  fromAmount: 'fromAmount',
  fromToken: 'fromToken',
  toAmount: 'toAmount',
  toToken: 'toToken',
  acceptedTerms: 'acceptedTerms',
}
const selectors = {
  fromAmount: `input[name="${inputList.fromAmount}"]`,
  toAmount: `input[name="${inputList.toAmount}"]`,
  acceptedTerms: `input[name="${inputList.acceptedTerms}"]`,
  fromToken: `div.${Classes.DROPDOWN}.from-token .dropdown-field`,
  toToken: `div.${Classes.DROPDOWN}.to-token .dropdown-field`,
}

let wrapper

const tests = describe('QuickSwap', () => {
  beforeEach(() => {
    const story = (
      <StoreProvider>
        <Component
          {...data}
          onSwapClick={onSwapClick}
        />
      </StoreProvider>
    )
    wrapper = mount(story)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('From/Exchange Amount', () => {
    let fromAmountField
    const getValue = () => getWrapper(wrapper, selectors.fromAmount).props().value

    beforeEach(() => {
      fromAmountField = getWrapper(wrapper, selectors.fromAmount)
    })

    it('Default value should be empty', () => {
      expect(getValue()).toEqual('')
    })

    describe('validation', () => {
      const cases = [[null, 'required'], ['1.1.1', 'number'], [-2, 'negative'], [200, 'not enough balance']]

      test.each(cases)(
        'given %p as input, returns error (%p)',
        async (value) => {
          await updateFormikField(fromAmountField, inputList.fromAmount, value, !value)
          wrapper.update()

          const errorNode = getWrapper(wrapper, '.from-amount .error')
          expect(errorNode.length).toBe(1)
        },
      )
    })

    it('Should update input field on change', async () => {
      const value = 2.125

      await updateFormikField(fromAmountField, inputList.fromAmount, value)
      wrapper.update()

      const errorNode = getWrapper(wrapper, '.from-amount .error')
      expect(errorNode.length).toBe(0)
      expect(getValue()).toEqual(value)
    })
  })

  describe('From/Exchange Token', () => {
    const getValue = () => getWrapper(wrapper, selectors.fromToken).props()['data-qa']

    it('Default value should not be empty', () => {
      expect(getValue()).not.toBe('')
    })

    it('Should update token on change', () => {
      const key = 'eth'
      const value = 'Ethereum'
      const inputField = getWrapper(wrapper, selectors.fromToken)

      inputField.simulate('click')
      expect(wrapper.exists('.list')).toEqual(true)
      const node = wrapper.find(`div.${Classes.DROPDOWN}.from-token .item_${key}`)
      node.simulate('click')
      wrapper.update()

      expect(getValue()).toEqual(value)
    })
  })

  describe('Accept Terms', () => {
    const getValue = () => getWrapper(wrapper, selectors.acceptedTerms).props().value

    it('Default value should be false', () => {
      expect(getValue()).toBe(false)
    })

    it('Should update input field on change', async () => {
      const value = true

      const inputField = getWrapper(wrapper, selectors.acceptedTerms)
      await updateFormikField(inputField, inputList.acceptedTerms, value)
      wrapper.update()

      expect(getValue()).toEqual(value)
    })
  })

  describe('Submit Form', () => {
    const formSelector = `form.${Classes.QUICKSWAP}`

    it('Should not call onSwapClick when has error', async () => {
      const node = wrapper.find(formSelector)
      await act(async () => {
        node.simulate('submit', {
          preventDefault: () => { }, // no op
        })
      })

      expect(onSwapClick).toHaveBeenCalledTimes(0)
    })

    it('Should call onSwapClick when inputs are correct', async () => {
      const values = {
        fromToken: 'btc',
        fromAmount: 1,
        toToken: 'eth',
        toAmount: 2,
        acceptedTerms: true,
      }
      let inputField

      inputField = getWrapper(wrapper, selectors.fromAmount)
      await updateFormikField(inputField, inputList.fromAmount, values.fromAmount)

      inputField = getWrapper(wrapper, selectors.toAmount)
      await updateFormikField(inputField, inputList.toAmount, values.toAmount)

      inputField = getWrapper(wrapper, selectors.acceptedTerms)
      await updateFormikField(inputField, inputList.acceptedTerms, values.acceptedTerms)

      wrapper.update()

      const node = wrapper.find(formSelector)
      await act(async () => {
        node.simulate('submit', {
          preventDefault: () => { }, // no op
        })
      })

      expect(onSwapClick).toHaveBeenCalledWith(values)
      expect(onSwapClick).toHaveBeenCalledTimes(1)
    })
  })
})

export default tests
