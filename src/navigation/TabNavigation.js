import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import QR from '../screens/QR'
import Meal from '../screens/Meal'
import Settings from '../screens/Settings'
import Ionicons from 'react-native-vector-icons/Ionicons'

const screenOptionsHandler = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
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
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
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
