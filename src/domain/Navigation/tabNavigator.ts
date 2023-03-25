import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    // @ts-expect-error TS(2345): Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    navigationRef.navigate(name, params)
  }
}

// add other navigation functions that you need and export them

// https://reactnavigation.org/docs/navigating-without-navigation-prop
