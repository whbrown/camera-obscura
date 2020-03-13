import React from 'react'
import { useAuth0 } from "../utils/auth0";
import CameraObscuraView from './AdminPanel';
import LoginView from './LoginView';

const App: React.FC = () => {
  const {
    isInitializing,
    isAuthenticated
  } = useAuth0()

  if (isInitializing) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Camera Obscura</h1>
      {
        isAuthenticated
          ? <CameraObscuraView />
          : <LoginView />
      }
    </div>
  )
}

export default App