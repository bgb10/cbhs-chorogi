import React, { useContext, useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// @ts-expect-error TS(6142): Module '../QR/QR' was resolved to '/Users/parkgwan... Remove this comment to see the full error message
import QR from '../QR/QR'
// @ts-expect-error TS(6142): Module '../Meal/Meal' was resolved to '/Users/park... Remove this comment to see the full error message
import Meal from '../Meal/Meal'
// @ts-expect-error TS(6142): Module '../Settings/Settings' was resolved to '/Us... Remove this comment to see the full error message
import Settings from '../Settings/Settings'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as RootNavigation from './tabNavigator'
// @ts-expect-error TS(6142): Module '../../context/SettingsProvider' was resolv... Remove this comment to see the full error message
import { SettingsContext } from '../../context/SettingsProvider'

const screenOptionsHandler = ({ route }: any) => ({
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName

    if (route.name === 'QR') {
      iconName = focused ? 'compass' : 'compass-outline'
    } else if (route.name === '식단') {
      iconName = focused ? 'today' : 'today-outline'
    } else if (route.name === '설정') {
      iconName = focused ? 'ios-list' : 'ios-list-outline'
    }

    return <Ionicons name={iconName} size={size} color={color} />
  },
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: '#333333',
  tabBarStyle: { backgroundColor: 'rgb(234, 243, 230)' },
  ...styles.header
})

const TabNavigation = () => {
  const appState = useRef(AppState.currentState)
  // @ts-expect-error TS(2488): Type 'null' must have a '[Symbol.iterator]()' meth... Remove this comment to see the full error message
  const [settings] = useContext(SettingsContext)

  // 시작 화면을 QR 화면으로 세팅
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
        if (settings) RootNavigation.navigate('QR')
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [settings])

  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <Tab.Navigator screenOptions={screenOptionsHandler}>
        <Tab.Screen name="QR" component={QR} />

        <Tab.Screen name="식단" component={Meal} />

        <Tab.Screen name="설정" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = {
  header: {
    headerStyle: {
      backgroundColor: 'rgb(234, 243, 230)'
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
}

export default TabNavigation
