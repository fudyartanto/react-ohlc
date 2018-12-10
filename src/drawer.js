// @flow
import moment from 'moment'
import _ from 'lodash'

type Props = {
  timeSeries: Object,
  chartCanvasId: string,
  verticalLabelCanvasId: string,
  verticalLabelWidth: number,
  height: number,
}

type TimeSeriesItem = {
  '1. open': string | number,
  '2. high': string | number,
  '3. low': string | number,
  '4. close': string | number,
}

class Drawer {
  props: Props
  minPrice: number
  maxPrice: number
  verticalStepPrice: number
  verticalStepCount: number = 15
  pixelConvertionRate: number
  horizontalRulePixelGap: number = 25
  verticalRulePixelGap: number
  bearishColor: string = 'rgba(237, 69, 74, 0.8)'
  bullishColor: string = 'rgba(57, 181, 75, 0.8)'
  lineColor: string = 'rgba(236, 236, 236, 0.8)'
  symbolTailLength: number = 8
  symbolWidth: number = 3
  chartCanvasWidth: number
  verticalAxisLabelFont: string = '11px "Montserrat", sans-serif'
  horizontalAxisLabelFont: string = '10px "Montserrat", sans-serif'
  stickLabelFont: string = '8px "Montserrat", sans-serif'
  bottomSpace: number = 50
  topSpace: number = 20

  constructor(props: Props) {
    this.props = {...props, height: props.height - this.bottomSpace}
    this.chartCanvasWidth = this.horizontalRulePixelGap * (Object.keys(props.timeSeries).length + 1)
    this.getPixelConvertionRate()
  }

  getPixelConvertionRate = () => {
    const { timeSeries, height } = this.props
    let max: number = 0
    let min: number = 0
    Object.keys(timeSeries).forEach((key) => {
      const item = timeSeries[key]
      const high: number = parseFloat(item['2. high'])
      const low: number = parseFloat(item['3. low'])

      max = Math.max(max, high)
      min = min === 0 ? low : Math.min(min, low)
    })
    this.maxPrice = Math.ceil(max)
    this.minPrice = Math.floor(min)

    const rangePrice = this.maxPrice - this.minPrice
    this.pixelConvertionRate = rangePrice / (height - this.topSpace)
    this.verticalRulePixelGap = (height - this.topSpace) / this.verticalStepCount

    this.verticalStepPrice = this.verticalRulePixelGap * this.pixelConvertionRate
  }

  getReversedVerticalAxisCoordinate = (coordinate: number) => {
    const { height } = this.props
    if (coordinate > height) {
      return height - coordinate
    } else {
      return Math.abs(coordinate - height)
    }
  }

  getVerticalCanvasCoordinateFromPrice = (price: number) => {
    const yValue = price - this.minPrice
    const yCoordinateFromBottom = yValue / this.pixelConvertionRate
    const yCoordinateFromTop = this.getReversedVerticalAxisCoordinate(yCoordinateFromBottom)
    return yCoordinateFromTop
  }

  getChartContext = () => {
    const { chartCanvasId } = this.props
    var canvas: any = document.getElementById(chartCanvasId)
    return canvas.getContext('2d')
  }

  getVerticalLebelContext = () => {
    const { verticalLabelCanvasId } = this.props
    var canvas: any = document.getElementById(verticalLabelCanvasId)
    return canvas.getContext('2d')
  }

  drawVerticalRules = () => {
    const context = this.getChartContext()
    const { timeSeries, height } = this.props

    const y = 0
    let x = this.horizontalRulePixelGap
    context.font = this.horizontalAxisLabelFont
    context.translate(0.5, 0.5)

    let yesterday = 1
    _.forEachRight(Object.keys(timeSeries), (key) => {
      context.moveTo(x, y)
      context.lineTo(x, height)
      context.strokeStyle = this.lineColor
      context.stroke()

      const date = moment(key)
      const currentDate = parseInt(date.format('D'))
      const label = currentDate
      const yCoordinateLabel = height + 15
      const xCoordinateLabel = x
      context.textAlign = 'center'
      context.fillText(label, xCoordinateLabel, yCoordinateLabel)

      if (currentDate < yesterday) {
        const labelMonth = date.format('MMM')
        context.fillText(labelMonth, xCoordinateLabel, yCoordinateLabel + 20)
      }

      x += this.horizontalRulePixelGap
      yesterday = currentDate
    })
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawHorizontalRules = () => {
    const { height } = this.props
    const context = this.getChartContext()
    context.translate(0.5, 0)
    for (let y = (height - this.verticalRulePixelGap); y > 0; y -= this.verticalRulePixelGap) {
      context.moveTo(0, y)
      context.lineTo(this.chartCanvasWidth, y)
      context.strokeStyle = this.lineColor
      context.stroke()
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawVerticalLabel = () => {
    const { height, verticalLabelWidth } = this.props
    const context = this.getVerticalLebelContext()

    context.font = this.verticalAxisLabelFont
    context.translate(0.5, 0.5)
    let price = this.minPrice
    const x = verticalLabelWidth - 10
    for (let y = height; y >= 0; y -= this.verticalRulePixelGap) {
      context.fillStyle = 'black'
      context.textAlign = 'right'
      context.fillText(parseFloat(price.toFixed(1)), x, y + 3)
      price += this.verticalStepPrice
    }

    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawSymbolVertical = (color: string, xCoordinate: number, yHighCoordinate: number, yLowCoordinate: number) => {
    const context = this.getChartContext()
    context.translate(0.5, 0.5)
    context.beginPath()
    context.moveTo(xCoordinate, yHighCoordinate)
    context.lineTo(xCoordinate, yLowCoordinate)
    context.strokeStyle = color
    context.fillStyle = color
    context.lineWidth = this.symbolWidth
    context.stroke()
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawSymbolOpenTail = (color: string, xCoordinate: number, yOpenCoordinate: number) => {
    const context = this.getChartContext()
    context.translate(0.5, 0.5)
    context.beginPath()
    context.moveTo(xCoordinate - this.symbolTailLength, yOpenCoordinate)
    context.lineTo(xCoordinate, yOpenCoordinate)
    context.strokeStyle = color
    context.fillStyle = color
    context.lineWidth = this.symbolWidth
    context.stroke()
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawSymbolCloseTail = (color: string, xCoordinate: number, yCloseCoordinate: number) => {
    const context = this.getChartContext()
    context.translate(0.5, 0.5)
    context.beginPath()
    context.moveTo(xCoordinate + this.symbolTailLength, yCloseCoordinate)
    context.lineTo(xCoordinate, yCloseCoordinate)
    context.strokeStyle = color
    context.fillStyle = color
    context.lineWidth = this.symbolWidth
    context.stroke()
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawVerticalLineAxis = () => {
    const { height, verticalLabelWidth } = this.props
    const context = this.getVerticalLebelContext()

    context.translate(0.5, 0.5)
    context.beginPath()
    context.moveTo(verticalLabelWidth - 1, 0)
    context.lineTo(verticalLabelWidth - 1, height)
    context.strokeStyle = this.lineColor
    context.stroke()
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawHorizontalLineAxis = () => {
    const { height } = this.props
    const context = this.getChartContext()
    context.translate(0.5, 0.5)
    context.beginPath()
    context.moveTo(0, height)
    context.lineTo(this.chartCanvasWidth, height)
    context.strokeStyle = this.lineColor
    context.fillStyle = this.lineColor
    context.lineWidth = 1
    context.stroke()
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  draw = () => {
    const context = this.getChartContext()
    this.drawVerticalRules()
    this.drawHorizontalRules()
    this.drawHorizontalLineAxis()
    this.drawVerticalLineAxis()
    this.drawVerticalLabel()

    const { timeSeries } = this.props

    context.font = this.stickLabelFont
    let x = this.horizontalRulePixelGap

    _.forEachRight(Object.keys(timeSeries), (key) => {
      const item: TimeSeriesItem = timeSeries[key]

      const open: number = parseFloat(item['1. open'])
      const high: number = parseFloat(item['2. high'])
      const low: number = parseFloat(item['3. low'])
      const close: number = parseFloat(item['4. close'])

      const yOpenCoordinate: number = this.getVerticalCanvasCoordinateFromPrice(open)
      const yHighCoordinate: number = this.getVerticalCanvasCoordinateFromPrice(high)
      const yLowCoordinate: number = this.getVerticalCanvasCoordinateFromPrice(low)
      const yCloseCoordinate: number = this.getVerticalCanvasCoordinateFromPrice(close)

      const isBearish: boolean = (open > close)
      const color: string = isBearish ? this.bearishColor : this.bullishColor

      this.drawSymbolVertical(color, x, yHighCoordinate, yLowCoordinate)
      this.drawSymbolOpenTail(color, x, yOpenCoordinate)
      this.drawSymbolCloseTail(color, x, yCloseCoordinate)

      context.fillText(parseFloat(high.toFixed(1)), x, yHighCoordinate - 3)
      context.fillText(parseFloat(low.toFixed(1)), x, yLowCoordinate + 10)

      x += this.horizontalRulePixelGap
    })
  }
}

export default Drawer
