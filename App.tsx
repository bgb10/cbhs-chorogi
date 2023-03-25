import React, { StrictMode } from 'react'
import { View, Text } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
// @ts-expect-error TS(6142): Module './src/context/AuthProvider' was resolved t... Remove this comment to see the full error message
import AuthProvider from './src/context/AuthProvider'
// @ts-expect-error TS(6142): Module './src/context/MealProvider' was resolved t... Remove this comment to see the full error message
import MealProvider from './src/context/MealProvider'
// @ts-expect-error TS(6142): Module './src/context/SettingsProvider' was resolv... Remove this comment to see the full error message
import SettingsProvider from './src/context/SettingsProvider'
// @ts-expect-error TS(6142): Module './src/layout/SafeArea' was resolved to '/U... Remove this comment to see the full error message
import SafeArea from './src/layout/SafeArea'
// @ts-expect-error TS(6142): Module './src/Main' was resolved to '/Users/parkgw... Remove this comment to see the full error message
import Main from './src/Main'

const Dummy = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text>에러</Text>
    </View>
  )
}

export default function App() {
  return (
    // TODO: strictMode 추가시 에러나는 이유를 모르겠다.
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <SafeArea>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ErrorBoundary FallbackComponent={Dummy}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SettingsProvider>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <MealProvider>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <AuthProvider>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Main />
            </AuthProvider>
          </MealProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </SafeArea>
  )
}
