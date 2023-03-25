import React, { useContext } from 'react'
import { AuthStateContext } from './context/AuthProvider'
import LoginScreen from './domain/Login/Login'
import TabNavigation from './domain/Navigation/TabNavigation'

const Main = () => {
  // @ts-expect-error TS(2339): Property 'isLoggedIn' does not exist on type 'null... Remove this comment to see the full error message
  const { isLoggedIn } = useContext(AuthStateContext)

  return !isLoggedIn ? <LoginScreen /> : <TabNavigation></TabNavigation>
}

export default Main
