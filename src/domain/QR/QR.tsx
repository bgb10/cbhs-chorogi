import { View, Text, Button, Image, TouchableOpacity, AppState, Platform } from 'react-native'
import { useContext, useEffect, useState, useRef } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { useFonts } from 'expo-font'

import QRCode from 'react-native-qrcode-svg'
import login from '../../api/login'
// @ts-expect-error TS(6142): Module '../../context/AuthProvider' was resolved t... Remove this comment to see the full error message
import { AuthStateContext } from '../../context/AuthProvider'

const QR = () => {
  const appState = useRef(AppState.currentState)
  const [code, setCode] = useState('test')
  const [lastUpdatedTimeStamp, setLastUpdatedTimeStamp] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(false)
  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Medium': require('../../../assets/fonts/SpoqaHanSansNeo-Medium.otf')
  })
  // @ts-expect-error TS(2339): Property 'userToken' does not exist on type 'null'... Remove this comment to see the full error message
  const { userToken } = useContext(AuthStateContext)

  const updateLastUpdatedTimeStamp = () => {
    const now = new Date(Date.now())
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
    const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day
      .toString()
      // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
      .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
      .padStart(2, '0')}`

    // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
    setLastUpdatedTimeStamp(formattedDate)
  }

  // QR 코드를 발급하는 코드는 학사번호 + MM + SS 로 구성
  // 1초 안에 여러번 Reload 버튼을 눌러도 코드가 발급 코드가 그대로이기 때문에 QR 코드는 바뀌지 않는다.
  const loadQR = async () => {
    try {
      setIsLoading(true)
      const code = await login(userToken.id, userToken.pw)
      setCode(code)
      setIsLoading(false)
      updateLastUpdatedTimeStamp()
    } catch (e) {
      throw e
    }
  }

  // QR loads whenComponentMounts
  useEffect(() => {
    loadQR()
  }, [])

  // QR loads when appstate changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        loadQR()
      } else if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
        setIsLoading(true)
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  if (!isFontLoaded) {
    return null
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={styles.container}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={[styles.QRcontainer, styles.shadow]}>
        {isLoading ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text style={{ fontSize: 50 }}>Loading...</Text>
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <QRCode size={Dimensions.get('screen').width * 0.5} value={`${code}`} />
        )}
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text
        style={{
          fontFamily: 'SpoqaHanSansNeo-Medium',
          fontSize: 14,
          marginTop: 12,
          marginBottom: 24
        }}
      >{`발급 날짜: ${lastUpdatedTimeStamp}`}</Text>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={[styles.shadow]}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TouchableOpacity style={styles.buttonReload} onPress={loadQR}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Image
            style={{ width: 25, height: 25 }}
            source={require('../../../assets/refresh.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height * 0.66,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  QRcontainer: {
    width: Dimensions.get('screen').width * 0.66,
    height: Dimensions.get('screen').width * 0.66,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FAFAFA'
  },
  shadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: 'black',
          shadowOffset: {
            width: -2,
            height: 4
          },
          shadowOpacity: 0.25,
          shadowRadius: 5
        }
      : {
          elevation: 20,
          shadowColor: 'black'
        },
  buttonReload: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#00A551',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default QR
