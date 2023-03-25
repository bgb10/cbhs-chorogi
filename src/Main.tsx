import React, { useContext } from 'react'
// @ts-expect-error TS(6142): Module './context/AuthProvider' was resolved to '/... Remove this comment to see the full error message
import { AuthStateContext } from './context/AuthProvider'
// @ts-expect-error TS(6142): Module './domain/Login/Login' was resolved to '/Us... Remove this comment to see the full error message
import LoginScreen from './domain/Login/Login'
// @ts-expect-error TS(6142): Module './domain/Navigation/TabNavigation' was res... Remove this comment to see the full error message
import TabNavigation from './domain/Navigation/TabNavigation'

const Main = () => {
  // @ts-expect-error TS(2339): Property 'isLoggedIn' does not exist on type 'null... Remove this comment to see the full error message
  const { isLoggedIn } = useContext(AuthStateContext)

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return !isLoggedIn ? <LoginScreen /> : <TabNavigation></TabNavigation>
}

export default Main
