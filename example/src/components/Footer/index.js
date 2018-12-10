// @flow
import React from 'react'
import moment from 'moment'
import './styles.scss'

const Footer = () => (
  <div className='app-footer'>
    Ⓒ arfan.fudyartanto {moment().format('YYYY')}
  </div>
)

export default Footer
