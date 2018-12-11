import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Humps from 'humps'
import scss from  './styles.scss'

const styles = Humps.camelizeKeys(scss)

const NavigationItem = (props) => {
  const { title, url, location: { hash } } = props
  let className = styles.navigationItem
  if (hash === url) {
    className += ` ${styles.active}`
  }

  return (
    <div className={className}>
      <Link to={url}>{ title }</Link>
    </div>
  )
}

export default withRouter(props => <NavigationItem {...props} />)
