import DepthChartCanvas from '../DepthChart.canvas'
import * as storyData from '../stories/DepthChart.stories_data'

const tests = describe('DepthChartCanvas', () => {
  let chart

  beforeEach(() => {
    document.write('<canvas id="depth-chart" style="width: 600px; height: 300px;"></canvas>')
    chart = new DepthChartCanvas({
      ref: document.querySelector('#depth-chart'),
      width: 600,
      height: 300,
      bidsColor: '#0f0',
      asksColor: '#f00',
      fontColor: '#8a9ba8',
      axisColor: '#8a9ba8',
      initialZoom: 50,
      onScroll: () => {},
      updateZoom: () => {},
    })
  })

  afterEach(() => {
    document.write('')
  })

  describe('initialize', () => {
    it('should initialize the canvas context correctly', () => {
      expect(chart.canvas).toBeTruthy()
      expect(chart.context.canvas).toBe(chart.canvas)
    })

    it('should initialize the dimensions correctly', () => {
      expect(chart.width).toBe(600)
      expect(chart.height).toBe(300)
    })
  })

  describe('render', () => {
    it('should clear the canvas', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 25,
      })
      expect(chart.context.clearRect).toHaveBeenCalled()
    })

    it('should set midPrice correctly', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 25,
      })
      expect(chart.midPrice).toBe(19275.5)
    })

    it('should set bids and asks correctly', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
      })

      expect(chart.bids).toMatchSnapshot()
      expect(chart.asks).toMatchSnapshot()
    })

    it('should have sorted bids and asks by price', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 50,
      })

      expect(chart.bids[0].price > chart.bids[1].price).toBe(false)
      expect(chart.bids[4].price > chart.bids[3].price).toBe(true)
      expect(chart.asks[1].price > chart.asks[2].price).toBe(false)
      expect(chart.asks[8].price > chart.asks[5].price).toBe(true)
    })

    it('should have set yTotal correctly', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 100,
      })

      expect(chart.yTotal).toBe(Math.abs(storyData.tAsks.total))
    })

    it('should set x coordinates correctly', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 100,
      })

      expect(chart.asks[6].x0).toBe(chart.getX(storyData.pAsks[6]))
      expect(chart.asks[6].x1).toBe(chart.getX(storyData.pAsks[7]))
    })

    it('should set y coordinate correctly', () => {
      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
        zoom: 25,
      })

      expect(chart.bids[4].y).toBe(chart.getY(chart.bids[4].total))
    })

    it('should call draw methods', () => {
      chart.drawBidsLine = jest.fn()
      chart.drawBidsGradient = jest.fn()
      chart.drawAsksLine = jest.fn()
      chart.drawAsksGradient = jest.fn()
      chart.drawYAxis = jest.fn()
      chart.drawXAxis = jest.fn()
      chart.drawXAxisTicks = jest.fn()
      chart.drawStaticTicks = jest.fn()
      chart.drawYAxisTicks = jest.fn()
      chart.drawMouseHover = jest.fn()

      chart.render({
        bids: storyData.bids,
        tBids: storyData.tBids,
        asks: storyData.asks,
        tAsks: storyData.tAsks,
        pBids: storyData.pBids,
        pAsks: storyData.pAsks,
      })

      expect(chart.drawBidsLine).toHaveBeenCalled()
      expect(chart.drawBidsGradient).toHaveBeenCalled()
      expect(chart.drawAsksLine).toHaveBeenCalled()
      expect(chart.drawAsksGradient).toHaveBeenCalled()
      expect(chart.drawYAxis).toHaveBeenCalled()
      expect(chart.drawXAxis).toHaveBeenCalled()
      expect(chart.drawXAxisTicks).toHaveBeenCalled()
      expect(chart.drawStaticTicks).toHaveBeenCalled()
      expect(chart.drawYAxisTicks).toHaveBeenCalled()
      expect(chart.drawMouseHover).toHaveBeenCalled()
    })
  })
})

export default tests
