import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './styles.scss'

const NavigationItem = (props) => {
  const { title, url, location: { hash } } = props
  let className = 'navigation-item'
  if (hash === url) {
    className += ' active'
  }

  return (
    <div className={className}>
      <Link to={url}>{ title }</Link>
    </div>
  )
}

export default withRouter(props => <NavigationItem {...props} />)
