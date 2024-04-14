import React from 'react'
import { Navigate } from 'react-router-dom'

import { getItem } from '../helpers/localStorage'

const Authmiddleware = (props) => {
  if (!getItem('tokens')) {
    return (
      <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
    )
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authmiddleware
