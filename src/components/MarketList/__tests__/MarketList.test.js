/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme'
import _get from 'lodash/get'
import React from 'react'
import { act } from 'react-dom/test-utils'

import * as Classes from '../../../common/classes'
import { StoreProvider } from '../../../store'
import { getWrapper } from '../../../utils/test.helpers'
import Component from '../MarketList'
import { data, tabs } from '../stories/MarketList.stories_data'

const WrappedComp = (props) => (
  <StoreProvider>
    <Component {...props} />
  </StoreProvider>
)

const props = {
  data,
  tabs,
  favs: {},
  saveFavs: jest.fn(),
  onRowClick: jest.fn(),
}

const MARKET_LIST_TOOLBAR = `${Classes.MARKET_LIST}__toolbar`
const MARKET_LIST_TABLE = `${Classes.MARKET_LIST}__table`

const activeTab = _get(tabs, [0, 'title'])
const selectors = {
  searchInput: `.${MARKET_LIST_TOOLBAR} .search-input input`,
  activeTab: '.tab--active span',
  favButtonTab: `.${MARKET_LIST_TOOLBAR} button.fav-button`,
  favButton: `.${MARKET_LIST_TABLE} button.fav-button`,
  tableRow: `.${MARKET_LIST_TABLE} tbody tr`,
  tableCol: `.${MARKET_LIST_TABLE} thead th`,
  tab: '.tab',
  dropdownItem: '.tab',
}
const defaultParamsForFilterData = {
  data,
  favs: {},
  activeTab: 'USD',
  searchTerm: '',
  sortBy: 'volume',
  sortAscending: false,
}

let wrapper
let filterData

const tests = describe('MarketList', () => {
  beforeEach(() => {
    filterData = jest.fn(() => data)

    wrapper = mount(<WrappedComp
      {...props}
      filterData={filterData}
    />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Should call saveFavs prop when favorites icon (from table row) is clicked ', () => {
    const button = getWrapper(wrapper, selectors.favButton).first()
    button.simulate('click')
    expect(props.saveFavs).toHaveBeenCalledTimes(1)
    expect(props.saveFavs).toHaveBeenCalledWith({
      [data[0].id]: true,
    })
  })

  it('Should call onRowClick prop when table row is clicked', () => {
    const tableRow = getWrapper(wrapper, selectors.tableRow).first()
    tableRow.simulate('click')
    expect(props.onRowClick).toHaveBeenCalledTimes(1)
    expect(props.onRowClick).toHaveBeenCalledWith(data[0].id)
  })

  describe('Default value ', () => {
    it('of search term should be empty', () => {
      const { value } = getWrapper(wrapper, selectors.searchInput).props()
      expect(value).toEqual('')
    })

    it(`of active tab should be ${activeTab}`, () => {
      const value = getWrapper(wrapper, selectors.activeTab).text()
      expect(value).toEqual(activeTab)
    })
  })

  describe('Should call filterData prop when', () => {
    let args
    afterEach(() => {
      expect(filterData).toHaveBeenCalledTimes(2)
      expect(filterData.mock.calls).toMatchObject([
        [defaultParamsForFilterData],
        [args],
      ])
    })

    const cases = [
      [
        'tab is changed',
        { activeTab: 'EUR' },
        () => getWrapper(wrapper, selectors.tab).at(1),
        ['click'],
      ],
      [
        'favorite tab is clicked',
        { activeTab: 'fav_tab' },
        () => getWrapper(wrapper, selectors.favButtonTab),
        ['click'],
      ],
      [
        'search input is changed',
        { searchTerm: 'XRP' },
        () => getWrapper(wrapper, selectors.searchInput),
        [
          'change', {
            target: { value: 'XRP' },
          },
        ],
      ],
      [
        'table column is sorted',
        { sortBy: 'baseCcy' },
        () => getWrapper(wrapper, selectors.tableCol).at(1),
        ['click'],
      ],
    ]

    test.each(cases)(
      '%p',
      async (testname, input, getNode, event) => {
        args = {
          ...defaultParamsForFilterData,
          ...input,
        }

        const node = getNode()

        await act(async () => {
          node.simulate(...event)
          wrapper.update()
        })
      },
    )

    it('"dropdown is changed"', async () => {
      args = {
        ...defaultParamsForFilterData,
        activeTab: 'EUR',
      }

      const node = wrapper.find('.selected-text')
      node.simulate('click')
      const exists = wrapper.exists('.list')
      expect(exists).toEqual(true)
      const dropdownItem = getWrapper(wrapper, `.item_${args.activeTab}`)

      await act(async () => {
        dropdownItem.simulate('click')
        wrapper.update()
      })
    })
  })
})

export default tests
