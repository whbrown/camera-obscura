import React, { Fragment, EventHandler, SyntheticEvent } from 'react'
import { useAuth0 } from '../utils/auth0'
import useAPIResult from '../utils/useAPIResult'

const AdminPanel: React.FC = () => {
  const {
    isAuthenticated,
    logout,
    user
  } = useAuth0()

  if (!isAuthenticated) {
    return <div>Permission Denied</div>
  }

  const email = user && user.email

  if (!email) {
    return <div>Failed to fetch user email from identity service</div>
  }

  const onLogoutClick: EventHandler<SyntheticEvent<HTMLAnchorElement>> = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <Fragment>
      <h2>Camera Obscura Admin Panel</h2>
      <p>Your info: {user && user.email}</p>
      <a href="" onClick={onLogoutClick}>Logout</a>
    </Fragment>
  )
}

export default AdminPanel;