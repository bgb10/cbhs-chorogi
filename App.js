import { useState, React } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRScreen from './src/screens/QRScreen'
import MealScreen from './src/screens/MealScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import LoginScreen from './src/screens/LoginScreen'
import Toast from 'react-native-toast-message'

const Tab = createBottomTabNavigator()

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('test7', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('test7')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // error reading value
  }
}

export default function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const onLoginHandler = (p) => {
    setLoginStatus(p)

    if (p === true) {
      console.log('tqtas')
      storeData({ id, pw })
    }
  }

  useState(() => {
    getData().then(
      (data) => {
        if (data === null) {
          console.log('not saved!')
          return
        }

        setId(data.id)
        setPw(data.pw)

        const regex = /makeCode\('(\d+)'\)/

        // 로그인 시도
        fetch('http://115.92.96.29:8080/employee/loginProc.jsp', {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          referrer: 'http://115.92.96.29:8080/employee/login.jsp',
          body: `USER_ID=${data.id}&USER_PW=${data.pw}&SAVE_PW=on`,
          method: 'POST',
          mode: 'cors'
        })
          .then((res) => res.text())
          .then((text) => {
            const res = text.match(regex)
            if (res == null) {
              console.log('wrong id!')
              Toast.show({
                type: 'error',
                text1: 'login fail!'
              })
              // do nothing
            } else {
              setLoginStatus(true)
            }
          })
      },
      () => {
        console.log('rejected!')
      }
    )
  }, [])

  return (
    <>
      {loginStatus ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="QR" children={() => <QRScreen id={id} pw={pw} />} />
            <Tab.Screen name="Meal" component={MealScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen id={id} pw={pw} setId={setId} setPw={setPw} onLogin={onLoginHandler} />
      )}
      <Toast />
    </>
  )
}
