import React, { StrictMode } from 'react'

import AuthProvider from './src/context/AuthProvider'
import Main from './src/Entry'
import SafeArea from './src/SafeArea'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from 'react-query'
import { View, Text } from 'react-native'
import fetchMeal from './src/api/meal'

const queryClient = new QueryClient()

const Dummy = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default function App() {
  queryClient.prefetchQuery('meals', () => fetchMeal())

  return (
    // TODO: strictMode 추가시 에러나는 이유를 모르겠다.
    <QueryClientProvider client={queryClient}>
      <SafeArea>
        <ErrorBoundary FallbackComponent={Dummy}>
          <AuthProvider>
            <Main />
          </AuthProvider>
        </ErrorBoundary>
      </SafeArea>
    </QueryClientProvider>
  )
}
