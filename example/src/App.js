// @flow
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import NavitaionItem from './components/NavigationItem'
import Home from './pages/Home'
import './assets/styles/main.scss'

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
        <div className='app'>
          <Header/>
          <div className='body'>
            <div className='navigation-container'>
              {
                stocks.map((title, index) => {
                  return <NavitaionItem key={index} title={title.toUpperCase()} url={`#${title.toLowerCase()}`}/>
                })
              }
            </div>
            <div className='content'>
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
