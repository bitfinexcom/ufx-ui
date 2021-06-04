import _get from 'lodash/get'

export const TRADING_PRIMITIVE_FONT = 'normal 12pt Verdana'

export const THEMES = {
  LIGHT_THEME: 'light-theme',
  COLOURBLIND_THEME: 'colourblind-theme',
  BLACK_THEME: 'black-theme',
  EOSFINEX_THEME: 'eosfinex-dark-theme',
  DARK_THEME: 'dark-theme',
}

const COLORS = {
  light: {
    bg: '#FBFBFB',
    greenDark: '#16B157',
    greenLight: '#8BD8AB',
    redDark: '#F05359',
    redLight: '#F7A9AC',
    blueDark: '#87a5b8',
    blueLight: '#76a7c6',
  },
  colourblind: {
    bg: '#FBFBFB',
    greenDark: '#1E70B2',
    greenLight: '#ACD0F1',
    redDark: '#EFBA4B',
    redLight: '#FEDD94',
    blueDark: '#87a5b8',
    blueLight: '#76a7c6',
  },
  dark: {
    bg: '#1b262d',
    greenDark: '#16B157',
    greenLight: '#1B4937',
    redDark: '#F05359',
    redLight: '#523137',
    blueDark: '#5e7d90',
    blueLight: '#82BAF6',
  },
  black: {
    bg: '#121212',
    greenDark: '#16B157',
    greenLight: 'red',
    redDark: '#F05359',
    redLight: '#523137',
    blueDark: '#ccc',
    blueLight: '#ccc',
  },
}

const EOSFINEX_COLORS = {
  dark: {
    bg: '#182A39',
    greenDark: '#3DCC91',
    greenLight: '#51D19C',
    redDark: '#D22A42',
    redLight: '#D83E54',
    blueDark: '#87a5b8',
    blueLight: '#76a7c6',
  },
}

const GREY = {
  grayscale1: '#FBFCFE',
  grayscale2: '#F5F6F7',
  grayscale3: '#E6EAEB',
  grayscale4: '#DBDFE3',
  grayscale5: '#BFC3C6',
  grayscale6: '#A4A9AC',
  grayscale7: '#7E8486',
  grayscale8: '#646B6E',
  grayscale9: '#485054',
  grayscale10: '#253135',
  grayscale11: '#212D31',
  grayscale12: '#1B272B',
  grayscale13: '#152023',
  grayscale14: '#111B1E',
  grayscale15: '#0C171A',
}

// @TODO replace GREY with GRAY
const GRAY = {
  darkGray1: '#172a39',
  darkGray2: '#202b33',
  darkGray3: '#293742',
  darkGray4: '#30404d',
  darkGray5: '#394b59',

  gray1: '#5c7080',
  gray2: '#738694',
  gray3: '#8a9ba8',
  gray4: '#a7b6c2',
  gray5: '#bfccd6',
  gray6: '#bfccd6',

  lightGray1: '#c6b9b9',
  lightGray2: '#d4d4d4',
  lightGray3: '#e1e8ed',
  lightGray4: '#ebf1f5',
  lightGray5: '#f5f8fa',
  lightGray6: '#f9f9fe',
}

// helper for lines
const orderLine = (color) => ({
  lineColor: color.line,
  bodyTextColor: color.text,
  quantityTextColor: color.text,
  cancelButtonIconColor: color.text,
  bodyBorderColor: color.borderColor,
  quantityBorderColor: color.borderColor,
  cancelButtonBorderColor: color.borderColor,
  bodyBackgroundColor: color.backgroundColor,
  quantityBackgroundColor: color.backgroundColor,
  cancelButtonBackgroundColor: color.backgroundColor,
})

// generates theme for light backgrounds
const generateLightTheme = (colors) => {
  const color = {
    bg: colors.bg,
    textColor: '#999',
    ask: {
      line: colors.redDark,
      text: colors.redDark,
      borderColor: colors.redDark,
      backgroundColor: GREY.grayscale2,
    },
    bid: {
      line: colors.greenDark,
      text: colors.greenDark,
      borderColor: colors.greenDark,
      backgroundColor: GREY.grayscale2,
    },
    position: {
      line: GREY.grayscale7,
      text: GREY.grayscale7,
      borderColor: GREY.grayscale6,
      backgroundColor: GREY.grayscale2,
    },
    alert: {
      line: colors.blueDark,
      text: colors.blueDark,
      borderColor: colors.blueLight,
      backgroundColor: colors.bg,
    },
  }

  const chartStyles = {
    bg: colors.bg,
    category: 'light',
    short: colors.redDark,
    long: colors.greenDark,
    altDark: colors.blueDark,
    altLight: colors.blueLight,

    crosshair: '#888888',
    cta: colors.bg,
    ctaHighlight: '#F5F5F5',
    alert: '#FFD506',
    grid: '#E6E6E6',
    lineColor: '#555',
    textColor: '#999',
    transparency: 60,
    liqTooltipDot: '#333',
  }

  const orderAskLine = orderLine(color.ask)
  const orderBidLine = orderLine(color.bid)
  const positionLine = orderLine(color.position)
  const alertLine = orderLine(color.alert)

  const depthChartStyles = {
    bidsColor: colors.greenDark,
    asksColor: colors.redDark,
    bgColor: '#fff',
    axisColor: GRAY.gray3,
    fontColor: GRAY.darkGray1,
    highlightColor: GRAY.darkGray1,
  }

  return {
    ...chartStyles,
    orders: {
      ask: orderAskLine,
      bid: orderBidLine,
    },
    position: positionLine,
    alerts: alertLine,
    depthChart: depthChartStyles,
  }
}

// generates theme for dark backgrounds
const generateDarkTheme = (colors) => {
  const color = {
    bg: colors.bg,
    textColor: '#999',
    ask: {
      line: colors.redDark,
      text: colors.redDark,
      borderColor: colors.redLight,
      backgroundColor: colors.bg,
    },
    bid: {
      line: colors.greenDark,
      text: colors.greenDark,
      borderColor: colors.greenLight,
      backgroundColor: colors.bg,
    },
    position: {
      line: GREY.grayscale6,
      text: GREY.grayscale7,
      borderColor: GREY.grayscale8,
      backgroundColor: GREY.grayscale11,
    },
    alert: {
      line: colors.blueDark,
      text: colors.blueDark,
      borderColor: colors.blueLight,
      backgroundColor: colors.bg,
    },
  }

  const orderAskLine = orderLine(color.ask)
  const orderBidLine = orderLine(color.bid)
  const positionLine = orderLine(color.position)
  const alertLine = orderLine(color.alert)

  const chartStyles = {
    bg: colors.bg,
    category: 'dark',
    short: colors.redDark,
    shortLight: colors.redLight,
    long: colors.greenDark,
    longLight: colors.greenLight,
    altDark: colors.blueDark,
    altLight: colors.blueLight,

    crosshair: '#888888',
    cta: '#363D52',
    ctaHighlight: '#414A67',
    alert: '#FFD506',
    grid: '#28343C',
    lineColor: '#555',
    textColor: '#999',
    transparency: 65,
    liqTooltipDot: '#fff',
  }

  const depthChartStyles = {
    bidsColor: colors.greenDark,
    asksColor: colors.redDark,
    bgColor: colors.bg,
    axisColor: GRAY.gray3,
    fontColor: GRAY.gray4,
    highlightColor: '#fff',
  }

  return {
    ...chartStyles,
    orders: {
      ask: orderAskLine,
      bid: orderBidLine,
    },
    position: positionLine,
    alerts: alertLine,
    depthChart: depthChartStyles,
  }
}

const THEME_MAP = {
  [THEMES.LIGHT_THEME]: generateLightTheme(COLORS.light),
  [THEMES.COLOURBLIND_THEME]: generateLightTheme(COLORS.colourblind),
  [THEMES.DARK_THEME]: generateDarkTheme(COLORS.dark),
  [THEMES.BLACK_THEME]: generateDarkTheme(COLORS.black),
  [THEMES.EOSFINEX_THEME]: generateDarkTheme(EOSFINEX_COLORS.dark),
}

export function getCurrentStyle(theme, type = null) {
  if (!theme) {
    throw new Error('Unable to get style, theme not set')
  }

  if (type) {
    return _get(THEME_MAP, `${theme}.${type}`)
  }

  return _get(THEME_MAP, theme)
}

export const getBackgroundColor = (theme) => getCurrentStyle(theme).bg

export function getChartOverrides(theme) {
  const style = getCurrentStyle(theme)
  return {
    'paneProperties.background': style.bg,
    'paneProperties.vertGridProperties.color': style.grid,
    'paneProperties.horzGridProperties.color': style.grid,
    'paneProperties.crossHairProperties.color': style.crosshair,
    'scalesProperties.backgroundColor': style.bg,
    'scalesProperties.lineColor': style.lineColor,
    'scalesProperties.textColor': style.textColor,
    'symbolWatermarkProperties.color': 'rgba(0, 0, 0, 0)',

    'mainSeriesProperties.style': 9,
    // candle styles
    // https://github.com/tradingview/charting_library/wiki/Overrides

    // bar
    'mainSeriesProperties.barStyle.upColor': style.long,
    'mainSeriesProperties.barStyle.downColor': style.short,

    // candle
    'mainSeriesProperties.candleStyle.upColor': style.long,
    'mainSeriesProperties.candleStyle.downColor': style.short,
    'mainSeriesProperties.candleStyle.borderUpColor': style.long,
    'mainSeriesProperties.candleStyle.borderDownColor': style.short,
    'mainSeriesProperties.candleStyle.wickUpColor': style.long,
    'mainSeriesProperties.candleStyle.wickDownColor': style.short,

    // line
    'mainSeriesProperties.lineStyle.color': style.altLight,

    // hollow
    'mainSeriesProperties.hollowCandleStyle.upColor': style.long,
    'mainSeriesProperties.hollowCandleStyle.downColor': style.short,
    'mainSeriesProperties.hollowCandleStyle.drawWick': true,
    'mainSeriesProperties.hollowCandleStyle.drawBorder': true,
    'mainSeriesProperties.hollowCandleStyle.borderColor': '#C400CB',
    'mainSeriesProperties.hollowCandleStyle.borderUpColor': style.long,
    'mainSeriesProperties.hollowCandleStyle.borderDownColor': style.short,
    'mainSeriesProperties.hollowCandleStyle.wickUpColor': style.long,
    'mainSeriesProperties.hollowCandleStyle.wickDownColor': style.short,

    // heikin ashi
    'mainSeriesProperties.haStyle.upColor': style.long,
    'mainSeriesProperties.haStyle.downColor': style.short,
    'mainSeriesProperties.haStyle.borderUpColor': style.long,
    'mainSeriesProperties.haStyle.borderDownColor': style.short,
    'mainSeriesProperties.haStyle.wickUpColor': style.long,
    'mainSeriesProperties.haStyle.wickDownColor': style.short,

    // area
    'mainSeriesProperties.areaStyle.color1': style.altLight,
    'mainSeriesProperties.areaStyle.color2': style.altDark,
    'mainSeriesProperties.areaStyle.linecolor': style.altLight,

    // baseline
    'mainSeriesProperties.baselineStyle.topFillColor1': style.long,
    'mainSeriesProperties.baselineStyle.topFillColor2': style.short,
    'mainSeriesProperties.baselineStyle.bottomFillColor1': style.long,
    'mainSeriesProperties.baselineStyle.bottomFillColor2': style.short,
    'mainSeriesProperties.baselineStyle.topLineColor': style.short,
    'mainSeriesProperties.baselineStyle.bottomLineColor': style.long,
  }
}

// https://github.com/tradingview/charting_library/wiki/Studies-Overrides
export function getChartStudiesOverrides(theme) {
  const style = getCurrentStyle(theme)
  return {
    'volume.volume.color.0': style.short,
    'volume.volume.color.1': style.long,
    'volume.volume.transparency': style.transparency,
  }
}

export function getChartVolumeStudyOverrides(theme) {
  const style = getCurrentStyle(theme)
  return {
    'volume.color.0': style.short,
    'volume.color.1': style.long,
    'volume.transparency': style.transparency,
  }
}

export function getLoadingScreenStyle(theme) {
  const style = getCurrentStyle(theme)
  return {
    backgroundColor: style.bg,
    foregroundColor: style.textColor,
  }
}
