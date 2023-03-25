import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const SafeArea = ({ children }: any) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SafeArea
