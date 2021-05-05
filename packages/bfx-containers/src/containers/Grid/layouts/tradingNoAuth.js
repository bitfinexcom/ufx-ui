import {
  GRID_LARGE,
  GRID_MEDIUM,
  GRID_SMALL,
  GRID_XSMALL,
  GRID_XXSMALL,
} from '../Grid.constants'
import gridBook from '../items/grid.book'
import gridDepthChart from '../items/grid.depthchart'
import gridOrderform from '../items/grid.orderform'
import gridTicker from '../items/grid.ticker'
import gridTickerList from '../items/grid.tickerlist'
import gridTrades from '../items/grid.trades'

const available = [
  gridTicker,
  gridTickerList,
  gridOrderform,
  gridBook,
  gridDepthChart,
  gridTrades,
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
  [gridTicker, gridTickerList, gridOrderform],
  [gridDepthChart, gridBook, gridTrades],
]

const mobileGrid = [
  [
    gridTicker,
    gridTickerList,
    gridDepthChart,
    gridOrderform,
    () => ({
      component: gridBook,
      defaults: {
        h: 14.1,
      },
    }),
    gridTrades,
  ],
]

const tabletGrid = [
  [
    gridTicker,
    gridTickerList,
    gridDepthChart,
    gridOrderform,
    gridBook,
    () => ({
      component: gridTrades,
      defaults: {
        h: 17.5,
      },
    }),
  ],
]

export default {
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
