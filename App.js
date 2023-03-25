import React, { StrictMode } from 'react'
import { View, Text } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import AuthProvider from './src/context/AuthProvider'
import MealProvider from './src/context/MealProvider'
import SettingsProvider from './src/context/SettingsProvider'
import SafeArea from './src/layout/SafeArea'
import Main from './src/Main'

const Dummy = () => {
  return (
    <View>
      <Text>에러</Text>
    </View>
  )
}

export default function App() {
  return (
    // TODO: strictMode 추가시 에러나는 이유를 모르겠다.
    <SafeArea>
      <ErrorBoundary FallbackComponent={Dummy}>
        <SettingsProvider>
          <MealProvider>
            <AuthProvider>
              <Main />
            </AuthProvider>
          </MealProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </SafeArea>
  )
}
