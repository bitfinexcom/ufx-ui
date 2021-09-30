import {
  GRID_LARGE,
  GRID_MEDIUM,
  GRID_SMALL,
  GRID_XSMALL,
  GRID_XXSMALL,
  STORED_LAYOUT_TRADING_KEY,
} from '../Grid.constants'
import gridBalances from '../items/grid.balances'
import gridBook from '../items/grid.book'
import gridChart from '../items/grid.chart'
import gridDepthChart from '../items/grid.depthchart'
import gridOrderform from '../items/grid.orderform'
import gridOrderHistory from '../items/grid.orderHistory'
import gridOrders from '../items/grid.orders'
import gridTicker from '../items/grid.ticker'
import gridTickerList from '../items/grid.tickerlist'
import gridTrades from '../items/grid.trades'

const available = [
  gridTicker,
  gridTickerList,
  gridOrderform,
  gridBook,
  gridDepthChart,
  gridChart,
  gridTrades,
  gridOrders,
  gridOrderHistory,
  gridBalances,
]

const availableMap = available.reduce(
  (acc, cur) => ({
    ...acc,
    [cur.id]: cur,
  }),
  {},
)

// default number of columns and their x starting point
const columns = {
  [GRID_LARGE]: [0, 4],
  [GRID_MEDIUM]: [0, 3],
  [GRID_SMALL]: [0],
  [GRID_XSMALL]: [0],
  [GRID_XXSMALL]: [0],
}

const grid = [
  [gridTicker, gridTickerList, gridOrderform, gridBalances],
  [
    gridChart,
    gridDepthChart,
    gridOrders,
    gridOrderHistory,
    ({ breakpoint, columnWidth }) => {
      const w = breakpoint === GRID_LARGE ? (columnWidth * 3) / 5 : columnWidth

      return {
        component: gridBook,
        defaults: {
          w,
        },
      }
    },
    ({ breakpoint, columnX, columnWidth }) => {
      const shouldSplit = breakpoint === GRID_LARGE

      const x = shouldSplit ? columnX + (columnWidth * 3) / 5 : columnX

      const w = shouldSplit ? (columnWidth * 2) / 5 : columnWidth

      return {
        component: gridTrades,
        defaults: {
          x,
          w,
        },
      }
    },
  ],
]

const mobileGrid = [
  [
    gridTicker,
    gridTickerList,
    gridChart,
    gridDepthChart,
    gridOrderform,
    gridBalances,
    gridOrders,
    gridOrderHistory,
    () => ({
      component: gridBook,
      defaults: {
        h: 14.2,
      },
    }),
    gridTrades,
  ],
]

const tabletGrid = [
  [
    gridTicker,
    gridTickerList,
    ({ breakpoint, columnWidth }) => {
      const w = breakpoint === GRID_XSMALL ? columnWidth : columnWidth / 2

      return {
        component: gridOrderform,
        defaults: {
          w,
          minW: w,
        },
      }
    },
    gridBalances,
    gridChart,
    gridDepthChart,
    () => ({
      component: gridOrders,
      defaults: {
        h: 6.5,
      },
    }),
    () => ({
      component: gridOrderHistory,
      defaults: {
        h: 6.5,
      },
    }),
    gridBook,
    gridTrades,
  ],
]

export default {
  gridId: STORED_LAYOUT_TRADING_KEY, // for save/load
  gridComponents: availableMap,
  defaultColumns: columns,
  defaultLayout: {
    [GRID_LARGE]: grid,
    [GRID_MEDIUM]: grid,
    [GRID_SMALL]: tabletGrid,
    [GRID_XSMALL]: tabletGrid,
    [GRID_XXSMALL]: mobileGrid,
  },
}
