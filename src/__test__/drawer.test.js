import Drawer from '../drawer'
import data from './data/msft'

it('test pixel convertion rate', () => {
  const drawer = new Drawer({
    height: 800,
    chartCanvasId: 'react-olhc-chart',
    verticalLabelCanvasId: 'react-ohlc-y-axis',
    verticalLabelWidth: 50,
    timeSeries: data['Time Series (Daily)'],
  })

  expect(drawer.pixelConvertionRate).toEqual(0.024657534246575342)
})

it('test reverse y axis calculation', () => {
  const height = 800

  const drawer = new Drawer({
    height,
    chartCanvasId: 'react-olhc-chart',
    verticalLabelCanvasId: 'react-ohlc-y-axis',
    verticalLabelWidth: 50,
    timeSeries: data['Time Series (Daily)'],
  })

  const expectations = [
    { input: 0, output: 800 },
    { input: 800, output: 0 },
    { input: 400, output: 400 },
    { input: 350, output: 450 },
    { input: 200, output: 600 },
  ]

  expectations.forEach((val) => {
    const output = val.output - drawer.bottomSpace
    expect(drawer.getReversedVerticalAxisCoordinate(val.input)).toEqual(output)
  })
})

