import { useState, React } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import QRScreen from './QRScreen'
import MealScreen from './MealScreen'
import SettingsScreen from './SettingsScreen'
import LoginScreen from './LoginScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  const [isSaved, setIsSaved] = useState(false)

  const onLogin = (p) => setIsSaved(p)

  if (isSaved) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="QR" component={QRScreen} />
          <Tab.Screen name="Meal" component={MealScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  } else {
    return <LoginScreen onLogin={onLogin}></LoginScreen>
  }
}
