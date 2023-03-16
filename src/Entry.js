import React, { useContext } from 'react'
import { AuthStateContext } from './context/AuthProvider'
import LoginScreen from './screens/Login'
import TabNavigation from './navigation/TabNavigation'

const Main = () => {
  const { isLoggedIn } = useContext(AuthStateContext)

  return isLoggedIn ? <TabNavigation /> : <LoginScreen />
}

export default Main
