// @flow
import React from 'react'
import Humps from 'humps'
import scss from  './styles.scss'

const styles = Humps.camelizeKeys(scss)

const Header = () => (
  <div className={styles.appHeader}>
    <div className='logo'>Your Logo Here...</div>
  </div>
)

export default Header
