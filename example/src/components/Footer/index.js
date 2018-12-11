// @flow
import React from 'react'
import moment from 'moment'
import Humps from 'humps'
import scss from  './styles.scss'

const styles = Humps.camelizeKeys(scss)

const Footer = () => (
  <div className={styles.appFooter}>
    Ⓒ arfan.fudyartanto {moment().format('YYYY')}
  </div>
)

export default Footer
