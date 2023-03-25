import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

// add other navigation functions that you need and export them

// https://reactnavigation.org/docs/navigating-without-navigation-prop
