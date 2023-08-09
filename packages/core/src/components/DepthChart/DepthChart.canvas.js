/* eslint-disable class-methods-use-this */
import { formatPrice, formatTotal, convertHexToRGBA } from '@ufx-ui/utils'
import _last from 'lodash/last'
import _sortBy from 'lodash/sortBy'

import { disableScroll, enableScroll, dpi } from './DepthChart.helpers'
import { BREAKPOINTS } from '../../common/classes'

export default class DepthChartCanvas {
  static ticksDisplayStyle = {
    oneStaticTick: 'oneStaticTick',
    twoStaticTicks: 'twoStaticTicks',
    dynamic: 'dynamic',
  }

  // canvas settings
  devicePixelRatio = null

  yAxisWidth = null

  xAxisHeight = null

  yAxisTickSize = null

  xAxisTickSize = null

  fontSize = null

  // this margin is necessary to make the texts that are positioned in the top
  // of the chart fit within the canvas, as the total volume’s text extends
  // beyond the graph
  chartMarginTop = null

  crosshairIntersectionPointSize = null

  // offset to position the spread percentage text in the middle (vertically)
  // of the crosshair line
  spreadPercentageTextYOffset = null

  textBackgroundPadding = null

  // set on init
  canvas = null

  context = null

  // set in each render
  midPrice = null

  bids = null

  asks = null

  yTotal = null

  bidsGradient = null

  asksGradient = null

  // set on mouse hover
  mouseX = null

  mouseY = null

  didMouseEnter = false

  constructor({
    ref,
    bidsColor,
    asksColor,
    fontColor,
    axisColor,
    bgColor,
    highlightColor,
    ticksDisplayStyle = (document.body.clientWidth > BREAKPOINTS.MD
      ? DepthChartCanvas.ticksDisplayStyle.twoStaticTicks
      : DepthChartCanvas.ticksDisplayStyle.oneStaticTick),
    onScroll,
    initialZoom,
    fontFamily,
  }) {
    this.bidsColor = bidsColor
    this.asksColor = asksColor
    this.fontColor = fontColor
    this.axisColor = axisColor
    this.bgColor = bgColor
    this.highlightColor = highlightColor
    this.ticksDisplayStyle = ticksDisplayStyle
    this.canvas = ref
    this.zoom = initialZoom
    this.fontFamily = fontFamily

    // check for canvas, there’s an edge-case here when the connection drops, reconnects and drops again
    if (!this.canvas) return

    this.context = this.canvas.getContext('2d')

    const canvasStyle = window.getComputedStyle(this.canvas)
    this.width = dpi(Math.floor(Number(canvasStyle.getPropertyValue('width').slice(0, -2))))
    this.height = dpi(Number(canvasStyle.getPropertyValue('height').slice(0, -2)))
    this.centerX = this.width / 2

    // set the correct attributes for a crystal clear image!
    this.canvas.setAttribute('width', this.width)
    this.canvas.setAttribute('height', this.height)

    this.setPixels()

    this.chartHeight = this.height - this.chartMarginTop - this.xAxisHeight

    this.bidsGradient = this.context.createLinearGradient(0, this.chartMarginTop, 0, this.chartHeight)
    this.bidsGradient.addColorStop(0, convertHexToRGBA(bidsColor, 0.1))
    this.bidsGradient.addColorStop(1, convertHexToRGBA(bidsColor, 0.02))

    this.asksGradient = this.context.createLinearGradient(0, this.chartMarginTop, 0, this.chartHeight)
    this.asksGradient.addColorStop(0, convertHexToRGBA(asksColor, 0.1))
    this.asksGradient.addColorStop(1, convertHexToRGBA(asksColor, 0.02))

    if (document.body.clientWidth > BREAKPOINTS.MD) {
      this.canvas.addEventListener('mouseenter', () => {
        disableScroll()
        this.didMouseEnter = true
      })

      this.canvas.addEventListener('mouseleave', () => {
        enableScroll()
        this.didMouseEnter = false
      })

      this.canvas.addEventListener('mousemove', event => {
        this.mouseX = dpi(event.offsetX)
        this.mouseY = dpi(event.offsetY)

        this.drawChart()
      })

      this.canvas.addEventListener('wheel', onScroll)
    }
  }

  // #region get coordinates methods

  // returns the x coordinate by price
  getX(price) {
    const xRatio = (price - this.firstPrice) / (this.lastPrice - this.firstPrice)
    const x = this.leftYAxisX + this.chartWidth * xRatio

    // the coordinate should stay within the chart axis, hence the 1px max/min
    const leftCappedX = Math.max(x, this.leftYAxisX + 1)
    return Math.min(leftCappedX, this.rightYAxisX - 1)
  }

  // returns the y coordinate by total
  // it’s dividing the bids’ or asks’ total (depending on which one is calling this function)
  // from the bids’ AND asks’ total and compensating for the top margin
  getY(total) {
    const yRatio = total / this.yTotal
    const chartHeightMinusMarginTop = this.chartHeight - this.chartMarginTop

    const y = Math.round(this.chartMarginTop
      + (chartHeightMinusMarginTop - yRatio
        * (chartHeightMinusMarginTop)))

    return Math.min(y, this.chartHeight - 1)
  }

  getYAxisWidth() {
    return Math.round(this.context.measureText(formatTotal(this.yTotal)).width + this.yAxisTickSize + dpi(7))
  }

  getPriceByX(x) {
    const xRatio = (x - this.leftYAxisX) / this.chartWidth
    return this.firstPrice + ((this.lastPrice - this.firstPrice) * xRatio)
  }

  // #endregion

  transformOrders(orders) {
    /* eslint-disable prefer-destructuring */
    const zoomRatio = this.zoom / 100
    const startingBidPrice = orders.pBidsTop[0] + ((this.midPrice - orders.pBidsTop[0]) * (1 - zoomRatio))

    // the ask prices should not be more than double the mid price to
    // ensure the bids filler price will not go below 0
    const endingAskPrice = this.midPrice + ((Math.min(_last(orders.pAsksTop), this.midPrice * 2) - this.midPrice) * zoomRatio)

    // minimum amount of orders
    const minOrders = 3

    let pBids = orders.pBidsTop.filter((price, index) => index >= orders.pBidsTop.length - minOrders || price >= startingBidPrice)
    let pAsks = orders.pAsksTop.filter((price, index) => index < minOrders || price <= endingAskPrice)

    const bidsPriceRange = this.midPrice - pBids[0]
    const asksPriceRange = _last(pAsks) - this.midPrice

    let bids = { ...orders.bids, ...orders.bidsTop }
    let tBids = { ...orders.tBids, ...orders.tBidsTop }
    let asks = { ...orders.asks, ...orders.asksTop }
    let tAsks = { ...orders.tAsks, ...orders.tAsksTop }

    // add order with a filler price to get the price range to match the other side
    if (bidsPriceRange < asksPriceRange) {
      const fillerPrice = this.midPrice - asksPriceRange
      const pBidsTopTillFillerPrice = orders.pBidsTop.filter(price => price >= fillerPrice)
      const pBidsFromFillerPriceTillFirstBidTop = orders.pBids.filter(price => price >= fillerPrice && price < pBidsTopTillFillerPrice[0]).sort((a, b) => a - b)
      bids = {
        ...bids,
        [fillerPrice]: bids[pBidsFromFillerPriceTillFirstBidTop[0] || pBidsTopTillFillerPrice[0]],
      }
      tBids = {
        ...tBids,
        [fillerPrice]: tBids[pBidsFromFillerPriceTillFirstBidTop[0] || pBidsTopTillFillerPrice[0]],
      }
      pBids = [fillerPrice, ...pBidsFromFillerPriceTillFirstBidTop, ...pBidsTopTillFillerPrice]
    }

    if (bidsPriceRange > asksPriceRange) {
      const fillerPrice = this.midPrice + bidsPriceRange
      const pAsksTopTillFillerPrice = orders.pAsksTop.filter(price => price <= fillerPrice)
      const pAsksFromFillerPriceTillFirstAskTop = orders.pAsksTop.filter(price => price <= fillerPrice && price > _last(pAsksTopTillFillerPrice))
      asks = {
        ...asks,
        [fillerPrice]: asks[_last(pAsksFromFillerPriceTillFirstAskTop) || _last(pAsksTopTillFillerPrice)],
      }
      tAsks = {
        ...tAsks,
        [fillerPrice]: tAsks[_last(pAsksFromFillerPriceTillFirstAskTop) || _last(pAsksTopTillFillerPrice)],
      }
      pAsks = [...pAsksTopTillFillerPrice, ...pAsksFromFillerPriceTillFirstAskTop, fillerPrice]
    }

    return {
      bids, tBids, pBids, asks, tAsks, pAsks,
    }
  }

  getChartData(orders, pOrders, tOrders, isBids) {
    const chartData = []
    const coordinates = []

    for (let index = 0; index < pOrders.length; index += 1) {
      const price = pOrders[index]
      const order = orders[price]
      const total = Math.abs(tOrders[price].total)

      const neighboringPrice = pOrders[index + (isBids ? -1 : 1)]
      const neighboringTotal = neighboringPrice ? Math.abs(tOrders[neighboringPrice].total) : null

      const x0 = isBids && neighboringPrice ? this.getX(neighboringPrice) : this.getX(price)
      const x1 = !isBids && neighboringPrice ? this.getX(neighboringPrice) : this.getX(price)
      const y = this.getY(total)

      chartData.push({
        price,
        amount: order.amount,
        total,

        // the difference is used to display the biggest ticks in volume
        // the total is compared with the next (asks) or previous (bids) entry
        difference: total - neighboringTotal,

        // coordinates (x0, x1, y)
        x0,
        x1,
        y,
      })

      coordinates.push([
        x0, y,
      ], [
        x1, y,
      ])
    }

    return [chartData, coordinates]
  }

  // #region draw methods

  drawLine(coordinates, color, lineDash = []) {
    this.context.beginPath()
    this.context.setLineDash(lineDash)
    this.context.lineWidth = dpi(1)
    this.context.strokeStyle = color

    coordinates.forEach(([x, y]) => {
      // https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry
      // the 0.5 is necessary to avoid blurry lines
      this.context.lineTo(x + 0.5, y + 0.5)
    })

    this.context.stroke()
    this.context.restore()
  }

  drawDashedLine(coordinates, color) {
    this.drawLine(coordinates, color, [3, 4])
  }

  drawFilledPath(coordinates, fillStyle) {
    this.context.beginPath()
    this.context.fillStyle = fillStyle

    coordinates.forEach(([x, y]) => {
      // https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry
      // the 0.5 is necessary to avoid blurry lines
      this.context.lineTo(x + 0.5, y + 0.5)
    })

    this.context.fill()
    this.context.closePath()
    this.context.restore()
  }

  drawText(text, x, y, color) {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`
    this.context.textBaseline = 'top'

    const textWidth = this.context.measureText(text).width
    const textPadding = this.textBackgroundPadding

    // draw background rect for text
    this.context.fillStyle = this.bgColor
    this.context.fillRect(
      x - textPadding, y - textPadding,
      textWidth + (textPadding * 2), this.fontSize + textPadding,
    )

    // draw text on top of background
    this.context.fillStyle = color
    this.context.fillText(
      text,
      x,
      y,
    )

    this.context.restore()
  }

  // #endregion

  // #region draw canvas components

  drawBidsLine() {
    this.drawLine([
      ...this.bidsCoordinates,
      [_last(this.bids).x1, this.chartHeight],
    ], this.bidsColor)
  }

  drawBidsGradient() {
    this.drawFilledPath([
      ...this.bidsCoordinates,
      [_last(this.bids).x1, this.chartHeight],
      [this.bids[0].x0, this.chartHeight],
      [this.bids[0].x0, 0],
    ], this.bidsGradient)
  }

  drawAsksLine() {
    this.drawLine([
      [this.asks[0].x0, this.chartHeight],
      ...this.asksCoordinates,
    ], this.asksColor)
  }

  drawAsksGradient() {
    this.drawFilledPath([
      ...this.asksCoordinates,
      [_last(this.asks).x1, this.chartHeight],
      [this.asks[0].x0, this.chartHeight],
      [this.asks[0].x0, this.asks[0].y],
    ], this.asksGradient)
  }

  drawYAxis() {
    // left
    this.drawLine([
      [this.leftYAxisX, this.chartMarginTop],
      [this.leftYAxisX, this.chartHeight],
    ], this.axisColor)

    // center
    this.drawLine([
      [this.centerX, this.chartMarginTop],
      [this.centerX, this.chartHeight],
    ], convertHexToRGBA(this.axisColor, 0.2))

    // right
    this.drawLine([
      [this.rightYAxisX, this.chartMarginTop],
      [this.rightYAxisX, this.chartHeight],
    ], this.axisColor)
  }

  drawXAxis() {
    this.drawLine([
      [this.leftYAxisX, this.chartHeight],
      [this.rightYAxisX, this.chartHeight],
    ], this.axisColor)
  }

  drawYTick(order, opts = {}) {
    const axisColor = opts.color || this.axisColor
    const fontColor = opts.color || this.fontColor
    const avoidClash = opts.avoidClash || false
    const isBids = order.amount > 0
    const tickY = order.y
    const textY = tickY - (this.chartMarginTop / 2)

    let isClashing = false
    if (avoidClash) {
      const lastY = _last(this.ticks.y[isBids ? 'bids' : 'asks'])

      isClashing = textY + this.fontSize > lastY
      if (!lastY || !isClashing) {
        this.ticks.y[isBids ? 'bids' : 'asks'].push(textY)
      }
    }

    if (isClashing) return

    // distance between right axis and text
    const rightAxisOffset = dpi(15)

    const textX = isBids ? 0 : this.rightYAxisX + rightAxisOffset
    const tickX0 = isBids ? this.leftYAxisX : this.rightYAxisX
    const tickX1 = (isBids ? this.leftYAxisX - this.yAxisTickSize : this.rightYAxisX + this.yAxisTickSize)

    this.drawText(
      formatTotal(order.total),
      textX,
      textY,
      fontColor,
    )

    this.drawLine([
      [tickX0, tickY],
      [tickX1, tickY],
    ], axisColor)
  }

  drawXTick(order, opts = {}) {
    const axisColor = opts.color || this.axisColor
    const fontColor = opts.color || this.fontColor
    const avoidClash = opts.avoidClash || opts.spreadTick || false
    const xOffset = opts.xOffset || 0
    const isBids = order.amount > 0
    let x = isBids ? 'x0' : 'x1'

    if (opts.spreadTick) {
      x = isBids ? 'x1' : 'x0'
    }

    const text = formatPrice(order.price)
    const textWidth = this.context.measureText(text).width

    // distance between x axis and text
    const textOffsetY = dpi(16)

    let textX = order[x] - (textWidth / 2)
    let isClashing = false

    if (isBids) {
      const leftMax = this.centerX - this.textBackgroundPadding - textWidth
      textX = Math.min(order[x] - (textWidth / 2), leftMax)

      if (avoidClash) {
        const lastX = _last(this.ticks.x.bids)

        isClashing = textX + textWidth > lastX
        if (!lastX || !isClashing) {
          this.ticks.x.bids.push(textX)
        }
      }
    }

    if (!isBids) {
      const rightMin = this.centerX + this.textBackgroundPadding
      textX = Math.max(order[x] - (textWidth / 2), rightMin)

      if (avoidClash) {
        const lastX = _last(this.ticks.x.asks)

        isClashing = textX - textWidth < lastX
        if (!lastX || !isClashing) {
          this.ticks.x.asks.push(textX)
        }
      }
    }

    if (!isClashing) {
      this.drawText(text, textX, this.chartHeight + textOffsetY, fontColor)

      this.drawLine([
        [order[x] + xOffset, this.chartHeight],
        [order[x] + xOffset, this.chartHeight + this.xAxisTickSize],
      ], axisColor)
    }
  }

  drawYAxisTicks() {
    this.drawYTick(this.bids[0])
    this.drawYTick(_last(this.asks))
  }

  drawXAxisTicks() {
    this.drawXTick(_last(this.bids), { spreadTick: true })
    this.drawXTick(this.asks[0], { spreadTick: true })
  }

  // draw the biggest ticks in volume
  drawVolumeTicks() {
    const bids = _sortBy(_sortBy(this.bids, 'difference').slice(0, 3), 'price').reverse()

    bids.forEach(bid => {
      this.drawXTick(bid, { avoidClash: true })
      this.drawYTick(bid, { avoidClash: true })

      this.drawDashedLine([
        [this.leftYAxisX, bid.y],
        [bid.x0, bid.y],
        [bid.x0, this.chartHeight],
      ], convertHexToRGBA(this.bidsColor, 0.4))
    })

    const asks = _sortBy(_sortBy(this.asks.filter(a => a.difference), 'difference').slice(0, 3), 'price')

    asks.forEach(ask => {
      this.drawXTick(ask, { avoidClash: true })
      this.drawYTick(ask, { avoidClash: true })

      this.drawDashedLine([
        [ask.x1, this.chartHeight],
        [ask.x1, ask.y],
        [this.rightYAxisX, ask.y],
      ], convertHexToRGBA(this.asksColor, 0.7))
    })
  }

  drawStaticTicks() {
    const oneStaticTick = this.ticksDisplayStyle === DepthChartCanvas.ticksDisplayStyle.oneStaticTick
    const chartHalf = this.chartWidth / 2

    const bids = []
    const asks = []

    if (oneStaticTick) {
      const bidX = this.leftYAxisX + (chartHalf / 2)
      const askX = (this.centerX) + (chartHalf / 2)

      const bid = this.bids.find(b => bidX >= b.x0 && bidX <= b.x1)
      const ask = this.asks.find(a => askX >= a.x0 && askX <= a.x1)

      if (bid) {
        bids.push({
          ...bid,
          price: this.getPriceByX(bidX),
          x0: bidX,
        })
      }

      if (ask) {
        asks.push({
          ...ask,
          price: this.getPriceByX(askX),
          x1: askX,
        })
      }
    } else {
      const bidX1 = this.leftYAxisX + ((chartHalf / 3) * 2)
      const askX1 = (this.centerX) + (chartHalf / 3)
      const bidX2 = this.leftYAxisX + (chartHalf / 3)
      const askX2 = (this.centerX) + ((chartHalf / 3) * 2)

      const bid1 = this.bids.find(b => bidX1 >= b.x0 && bidX1 <= b.x1)
      const bid2 = this.bids.find(b => bidX2 >= b.x0 && bidX2 <= b.x1)
      const ask1 = this.asks.find(a => askX1 >= a.x0 && askX1 <= a.x1)
      const ask2 = this.asks.find(a => askX2 >= a.x0 && askX2 <= a.x1)

      if (bid1) {
        bids.push({
          ...bid1,
          price: this.getPriceByX(bidX1),
          x0: bidX1,
        })
      }

      if (bid2) {
        bids.push({
          ...bid2,
          price: this.getPriceByX(bidX2),
          x0: bidX2,
        })
      }

      if (ask1) {
        asks.push({
          ...ask1,
          price: this.getPriceByX(askX1),
          x1: askX1,
        })
      }

      if (ask2) {
        asks.push({
          ...ask2,
          price: this.getPriceByX(askX2),
          x1: askX2,
        })
      }
    }

    this.drawXTick(this.bids[0], { xOffset: -1 })

    bids.forEach((bid) => {
      this.drawXTick(bid, { avoidClash: true })
      this.drawYTick(bid, { avoidClash: true })

      this.drawDashedLine([
        [this.leftYAxisX, bid.y],
        [bid.x0, bid.y],
        [bid.x0, this.chartHeight],
      ], convertHexToRGBA(this.bidsColor, 0.4))
    })

    this.drawXTick(_last(this.asks), { xOffset: 1 })

    asks.forEach((ask) => {
      this.drawXTick(ask, { avoidClash: true })
      this.drawYTick(ask, { avoidClash: true })

      this.drawDashedLine([
        [ask.x1, this.chartHeight],
        [ask.x1, ask.y],
        [this.rightYAxisX, ask.y],
      ], convertHexToRGBA(this.asksColor, 0.7))
    })
  }

  // #endregion

  // #region draw crosshair methods

  drawBidCrosshair(bidX) {
    const bid = this.bids.find(b => bidX >= b.x0 && bidX <= b.x1)
      // if we didn’t find a bid in the mouse position then we are hovering in the spread gap
      || {
        ..._last(this.bids),
        y: this.chartHeight,
      }

    const price = this.getPriceByX(bidX)
    const bidSpreadPercentage = `${((1 - price / this.midPrice) * 100).toFixed(2)}%`

    this.drawXTick({
      ...bid,
      price,
      x0: bidX,
    }, { color: this.bidsColor })
    this.drawYTick(bid, { color: this.bidsColor })

    // cover non relevant bids data with background to make "selection" more visibly focused
    this.drawFilledPath([
      [this.leftYAxisX, this.chartMarginTop - 1],
      [bidX, this.chartMarginTop - 1],
      [bidX, this.chartHeight],
      [this.leftYAxisX, this.chartHeight],
    ], convertHexToRGBA(this.bgColor, 0.6))

    // draw line inside
    this.drawDashedLine([
      [this.leftYAxisX, bid.y],
      [bidX, bid.y],
      [bidX, this.chartHeight + this.chartMarginTop],
    ], this.bidsColor)

    // draw line outside
    this.drawDashedLine([
      [bidX, this.chartMarginTop],
      [bidX, bid.y],
      [this.centerX, bid.y],
    ], convertHexToRGBA(this.bidsColor, 0.4))

    // draw intersection point
    const pointSize = this.crosshairIntersectionPointSize
    this.drawFilledPath([
      [bidX, bid.y - pointSize],
      [bidX + pointSize, bid.y],
      [bidX, bid.y + pointSize],
      [bidX - pointSize, bid.y],
    ], this.highlightColor)

    // draw spread percentage text
    const bidSpreadPercentageTextWidth = this.context.measureText(bidSpreadPercentage).width
    const bidSpreadPercentageTextX = bidX + (this.centerX - bidX) / 2 - (bidSpreadPercentageTextWidth / 2)
    const bidSpreadPercentageTextY = Math.min(bid.y + this.spreadPercentageTextYOffset, this.chartHeight - dpi(13))
    this.drawText(bidSpreadPercentage, bidSpreadPercentageTextX, bidSpreadPercentageTextY, this.bidsColor)
  }

  drawAskCrosshair(askX) {
    const ask = this.asks.find(a => askX >= a.x0 && askX <= a.x1)
      // if we didn’t find an ask in the mouse position then we are hovering in the spread gap
      || {
        ...this.asks[0],
        y: this.chartHeight,
      }

    const price = this.getPriceByX(askX)
    const askSpreadPercentage = `${(((price / this.midPrice) - 1) * 100).toFixed(2)}%`

    this.drawXTick({
      ...ask,
      price,
      x1: askX,
    }, { color: this.asksColor })
    this.drawYTick(ask, { color: this.asksColor })

    // cover non relevant asks data with background to make "selection" more visibly focused
    this.drawFilledPath([
      [this.rightYAxisX, this.chartMarginTop - 1],
      [askX, this.chartMarginTop - 1],
      [askX, this.chartHeight],
      [this.rightYAxisX, this.chartHeight],
    ], convertHexToRGBA(this.bgColor, 0.6))

    // draw line inside
    this.drawDashedLine([
      [askX, this.chartHeight],
      [askX, ask.y],
      [this.rightYAxisX, ask.y],
    ], this.asksColor)

    // draw line outside
    this.drawDashedLine([
      [askX, this.chartMarginTop],
      [askX, ask.y],
      [this.centerX, ask.y],
    ], convertHexToRGBA(this.asksColor, 0.7))

    // draw intersection point
    const pointSize = this.crosshairIntersectionPointSize
    this.drawFilledPath([
      [askX, ask.y - pointSize],
      [askX + pointSize, ask.y],
      [askX, ask.y + pointSize],
      [askX - pointSize, ask.y],
    ], this.highlightColor)

    const askSpreadPercentageTextWidth = this.context.measureText(askSpreadPercentage).width
    const askSpreadPercentageTextX = askX + (this.centerX - askX) / 2 - (askSpreadPercentageTextWidth / 2)
    const bidSpreadPercentageTextY = Math.min(ask.y + this.spreadPercentageTextYOffset, this.chartHeight - dpi(13))
    this.drawText(askSpreadPercentage, askSpreadPercentageTextX, bidSpreadPercentageTextY, this.asksColor)
  }

  drawMouseHover() {
    if (!this.didMouseEnter) return

    const isInXRange = this.mouseX > this.leftYAxisX
      && this.mouseX < this.rightYAxisX
    const isInYRange = this.mouseY > this.chartMarginTop
      && this.mouseY < this.chartMarginTop + this.chartHeight

    // only render if the mouse is in the actual chart
    if (!isInXRange || !isInYRange) return

    // take the opposite x position within the chart for the other side
    const oppositeX = this.width - this.mouseX

    // var to determine whether the user is hovering over bids
    const isHoveringBids = this.mouseX >= this.leftYAxisX && this.mouseX <= (this.centerX)

    // incase the spread percentage texts from both sides overlap (when they’re
    // close together), we want to draw the hovered side last so that it draws
    // on top of the other side
    if (isHoveringBids) {
      this.drawAskCrosshair(oppositeX)
      this.drawBidCrosshair(this.mouseX)
    } else {
      this.drawBidCrosshair(oppositeX)
      this.drawAskCrosshair(this.mouseX)
    }
  }

  drawMidPrice() {
    const midPriceText = formatPrice(this.midPrice, { minDecimals: 1 })
    const midPriceTextWidth = this.context.measureText(midPriceText).width
    const midPriceTextX = this.centerX - (midPriceTextWidth / 2)
    this.drawText(midPriceText, midPriceTextX, 0, this.fontColor)

    const spreadText = ` ${(((this.midPrice - _last(this.bids).price) / this.midPrice) * 100).toFixed(3)}%`
    const spreadTextWidth = this.context.measureText(spreadText).width
    const spreadTextX = this.centerX - (spreadTextWidth / 2)
    this.drawText(spreadText, spreadTextX, dpi(13), convertHexToRGBA(this.fontColor, 0.7))
  }

  // #endregion

  drawChart() {
    // check for context, there’s an edge-case here when the connection drops, reconnects and drops again
    if (!this.context || !this.bids || !this.bids.length) return

    // clear previous drawing
    this.drawFilledPath([
      [0, 0],
      [this.width, 0],
      [this.width, this.height],
      [0, this.height],
    ], this.bgColor)

    // init store for ticks locations to avoid clashing
    this.ticks = {
      y: {
        bids: [],
        asks: [],
      },
      x: {
        bids: [],
        asks: [],
      },
    }

    this.drawBidsLine()
    this.drawBidsGradient()
    this.drawAsksLine()
    this.drawAsksGradient()

    this.drawYAxis()
    this.drawXAxis()

    this.drawXAxisTicks()

    if (this.ticksDisplayStyle === DepthChartCanvas.ticksDisplayStyle.dynamic) {
      this.drawVolumeTicks()
    } else {
      this.drawStaticTicks()
    }

    // draw y total ticks after volume ticks
    this.drawYAxisTicks()

    this.drawMouseHover()

    this.drawMidPrice()
  }

  // when a user drags the window from a retina to a normal display
  // the dpi changes and we have to re-initalize these vars
  setPixels() {
    if (this.devicePixelRatio === window.devicePixelRatio) return

    this.devicePixelRatio = window.devicePixelRatio
    this.yAxisWidth = dpi(50)
    this.xAxisHeight = dpi(20)
    this.yAxisTickSize = dpi(8)
    this.xAxisTickSize = dpi(8)
    this.fontSize = dpi(11)
    this.chartMarginTop = dpi(7)
    this.crosshairIntersectionPointSize = dpi(2)
    this.spreadPercentageTextYOffset = dpi(-4)
    this.textBackgroundPadding = dpi(2)
  }

  render({
    bids,
    tBids,
    pBids,
    asks,
    tAsks,
    pAsks,
    bidsTop,
    tBidsTop,
    pBidsTop,
    asksTop,
    tAsksTop,
    pAsksTop,
    zoom,
  }) {
    /* eslint-disable no-param-reassign */
    this.zoom = zoom || this.zoom
    this.midPrice = (pAsksTop[0] - _last(pBidsTop)) / 2 + _last(pBidsTop)
    this.setPixels()

    const {
      bids: nextBids,
      tBids: nextTBids,
      pBids: nextPBids,
      asks: nextAsks,
      tAsks: nextTAsks,
      pAsks: nextPAsks,
    } = this.transformOrders({
      bids,
      tBids,
      pBids,
      asks,
      tAsks,
      pAsks,
      bidsTop,
      tBidsTop,
      pBidsTop,
      asksTop,
      tAsksTop,
      pAsksTop,
    })

    this.yTotal = Math.max(Math.abs(nextTBids[nextPBids[0]].total), Math.abs(nextTAsks[_last(nextPAsks)].total))
    this.yAxisWidth = this.getYAxisWidth()
    this.chartWidth = this.width - (this.yAxisWidth * 2)
    this.leftYAxisX = this.yAxisWidth
    this.rightYAxisX = this.width - this.yAxisWidth
    this.firstPrice = nextPBids[0]
    this.lastPrice = _last(nextPAsks)

    // get the data for chart drawing
    const [bidsChartData, bidsCoordinates] = this.getChartData(nextBids, nextPBids, nextTBids, true)
    this.bids = bidsChartData
    this.bidsCoordinates = bidsCoordinates

    const [asksChartData, asksCoordinates] = this.getChartData(nextAsks, nextPAsks, nextTAsks, false)
    this.asks = asksChartData
    this.asksCoordinates = asksCoordinates

    this.drawChart()

    return this
  }
}
