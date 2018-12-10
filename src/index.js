// @flow
import React, { Component } from 'react'
import Humps from 'humps'
import Drawer from './drawer'
import scss from './styles.scss'

const styles = Humps.camelizeKeys(scss)
const chartCanvasId = 'react-olhc-chart'
const verticalLabelCanvasId = 'react-ohlc-y-axis'
const verticalLabelWidth = 50

export type Props = {
  height: number,
  data: {'Time Series (Daily)': Object},
}

type State = {
  width: number,
}

class Ohlc extends Component<Props, State> {
  drawer: Drawer

  constructor(props: Props) {
    super(props)

    this.drawer = new Drawer({
      height: props.height,
      chartCanvasId,
      verticalLabelCanvasId,
      verticalLabelWidth,
      timeSeries: props.data['Time Series (Daily)'],
    })
  }

  static defaultProps = {
    height: 500,
  }

  componentDidMount = () => {
    this.drawer.draw()
  }

  render = () => {
    const { height } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <canvas height={height} width={verticalLabelWidth} id={verticalLabelCanvasId} />
        </div>
        <div className={styles.right} style={{ height }}>
          <canvas className={styles.chart} height={height} width={this.drawer.chartCanvasWidth} id={chartCanvasId} />
        </div>
      </div>
    )
  }
}

export default Ohlc
