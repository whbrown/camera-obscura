import React, { Fragment, EventHandler, SyntheticEvent } from 'react'
import { useAuth0 } from '../utils/auth0'

const LoginView: React.FC = () => {
  const { loginWithPopup } = useAuth0()

  const onLoginClick: EventHandler<SyntheticEvent<HTMLAnchorElement>> = async (e) => {
    e.preventDefault()
    await loginWithPopup()
  }

  return (
    <Fragment>
      <p>Camera Obscura</p>
      <a href="" onClick={onLoginClick}>
        Login to view Admin Panel
      </a>
    </Fragment>
  )
}

export default LoginView;