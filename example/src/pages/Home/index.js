// @flow
import React, { Component } from 'react'
import Ohlc, { Props as OhlcDataProps } from 'react-ohlc'
import { getStockTimeSeriesDaily } from '../../services/AlphaVantage'
import ContentLoader from 'react-content-loader'
import Humps from 'humps'
import './styles.scss'
import scss from './styles.scss'

const styles = Humps.camelizeKeys(scss)

type Props = {
  location: { hash: string },
  height: number,
}
type State = {
  isLoading: boolean,
  data: null | OhlcDataProps,
  error: null | string,
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isLoading: true,
      data: null,
      error: 'Ups! Something went wrong',
    }
  }

  static defaultProps = {
    height: 800
  }

  componentDidMount = () => {
    this.getStockData()
  }

  getStockData = () => {
    let { location: { hash } } = this.props
    const code = hash.replace('#', '')
    const stockCode = code ? code : 'msft'
    this.setState({ isLoading: true })
    getStockTimeSeriesDaily(stockCode).then((data) => {
      this.setState({
        data,
        isLoading: false,
        error: null,
      })
    }).catch((error) => {
      this.setState({ error, isLoading: false })
    })
  }

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.location.hash !== prevProps.location.hash) {
      this.getStockData()
    }
  }

  renderLoader = () => {
    const { height } = this.props
    return (
      <div className={styles.contentLoaderContainer} style={{ height }}>
        <div className={styles.contentLoaderWrapper}>
          <ContentLoader height={400} width={400} >
            <rect x='55' y='210' rx='10' ry='10' width='40' height='150' />
            <rect x='115' y='160' rx='10' ry='10' width='40' height='200' />
            <rect x='175' y='60' rx='10' ry='10' width='40' height='300' />
            <rect x='235' y='180' rx='10' ry='10' width='40' height='180' />
            <rect x='295' y='40' rx='10' ry='10' width='40' height='320' />
            <rect x='55' y='380' rx='10' ry='10' width='280' height='20' />
          </ContentLoader>
        </div>
      </div>
    )
  }

  renderError = () => {
    const { height } = this.props
    const { error } = this.state

    return (
      <div className={styles.error} style={{ height }}>
        <div className={styles.errorWrapper}>
          <i className='icon ion-ios-information-circle-outline'></i>
          <p>{ error }</p>
        </div>
      </div>
    )
  }

  render () {
    const { isLoading, data, error } = this.state
    const { height } = this.props
    return (
      <div className={styles.home}>
        {
          isLoading ? this.renderLoader() : (
            error ? this.renderError() : <Ohlc height={height} data={data}/>
          )
        }
      </div>
    )

  }
}

export default App
