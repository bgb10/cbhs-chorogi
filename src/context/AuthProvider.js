import { createContext, React, useReducer, useEffect, useMemo } from 'react'
import login from '../api/login'
import * as SecureStore from 'expo-secure-store'
import { AUTHENTICATION_KEY, AUTO_LOGIN_ENABLED_KEY } from '../data/constants'

export const AuthStateContext = createContext(null)
export const AuthFunctionContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null
          }
      }
    },
    {
      isLoading: true,
      isLoggedIn: false,
      userToken: { id: null, pw: null }
    }
  )

  const authenticateFromStorage = async () => {
    let storedPrivacy
    let storedAutoLoginEnabled

    try {
      storedAutoLoginEnabled = await SecureStore.getItemAsync(AUTO_LOGIN_ENABLED_KEY)

      if (storedAutoLoginEnabled === null || storedAutoLoginEnabled === 'false') return
      storedPrivacy = await SecureStore.getItemAsync(AUTHENTICATION_KEY)
      const privacy = JSON.parse(storedPrivacy)
      await login(privacy.id, privacy.pw)
      dispatch({ type: 'SIGN_IN', token: privacy })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    authenticateFromStorage()
  }, [])

  const authFuncton = useMemo(
    () => ({
      signIn: async ({ id, pw }) => {
        try {
          await login(id, pw)

          const storedPrivacy = JSON.stringify({ id, pw })
          SecureStore.setItemAsync(AUTHENTICATION_KEY, storedPrivacy)

          dispatch({ type: 'SIGN_IN', token: { id, pw } })
        } catch (e) {
          // TODO: stacktrace 제대로 뽑아내기. JS의 에러처리 로직을 아직 잘 모르겠다.
          throw e
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' })
    }),
    []
  )

  return (
    <AuthStateContext.Provider value={state}>
      <AuthFunctionContext.Provider value={authFuncton}>{children}</AuthFunctionContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default AuthProvider
