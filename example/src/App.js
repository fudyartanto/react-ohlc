// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Humps from 'humps'
import Header from './components/Header'
import Footer from './components/Footer'
import NavitaionItem from './components/NavigationItem'
import Home from './pages/Home'
import scss from './assets/styles/main.scss'

const styles = Humps.camelizeKeys(scss)
const stocks = [
  'msft',
  'aapl',
  'intc',
  'nflx',
  'orcl',
  'cmcsa',
  'goog',
  'luv',
  'hog',
  'googl',
  'amzn',
]

type Props = {}

class App extends Component<Props> {
  render () {
    return (
      <Router>
        <div className={styles.app}>
          <Header/>
          <div className={styles.body}>
            <div className={styles.navigationContainer}>
              {
                stocks.map((title, index) => {
                  const url = index === 0 ? '' : `#${title.toLowerCase()}`
                  return <NavitaionItem key={index} title={title.toUpperCase()} url={url}/>
                })
              }
            </div>
            <div className={styles.content}>
              <Route exact path='/' component={Home} />
              <Route path='/:code' component={Home} />
            </div>
          </div>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App
