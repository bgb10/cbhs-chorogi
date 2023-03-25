import React, { useContext } from 'react'
import { AuthStateContext } from './context/AuthProvider'
import LoginScreen from './domain/Login/Login'
import TabNavigation from './domain/Navigation/TabNavigation'

const Main = () => {
  const { isLoggedIn } = useContext(AuthStateContext)

  return !isLoggedIn ? <LoginScreen /> : <TabNavigation></TabNavigation>
}

export default Main
