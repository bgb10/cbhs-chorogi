import React, { StrictMode } from 'react'
import AuthProvider from './src/context/AuthProvider'
import Main from './src/Main'
import SafeArea from './src/SafeArea'
import { ErrorBoundary } from 'react-error-boundary'
import { View, Text } from 'react-native'
import MealQueryProvider from './src/MealQueryProvider'

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
        <MealQueryProvider>
          <AuthProvider>
            <Main />
          </AuthProvider>
        </MealQueryProvider>
      </ErrorBoundary>
    </SafeArea>
  )
}
