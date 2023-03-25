import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const SafeArea = ({
  children
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SafeAreaProvider>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SafeArea
