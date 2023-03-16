import React, { StrictMode } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import AuthProvider from './src/context/AuthProvider'
import Main from './src/Entry'

export default function App() {
  return (
    // TODO: strictMode 추가시 에러나는 이유를 모르겠다.
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Main />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  )
}
