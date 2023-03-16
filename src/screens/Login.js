import { React, useContext, useState } from 'react'
import { View, Image, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { AuthFunctionContext } from '../context/AuthProvider'
import { useFonts } from 'expo-font'
import Checkbox from 'expo-checkbox'
import * as SecureStore from 'expo-secure-store'
import { AUTO_LOGIN_ENABLED_KEY } from '../data/constants'

const LoginScreen = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [isError, setIsError] = useState(false)
  const [isAutoChecked, setIsAutoChecked] = useState(true)

  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Medium': require('../../assets/fonts/SpoqaHanSansNeo-Medium.otf'),
    BMJUA: require('../../assets/fonts/BMJUA.otf')
  })

  const { signIn } = useContext(AuthFunctionContext)

  const toggleAutoLogin = async () => {
    setIsAutoChecked((p) => !p)
  }

  const onLoginPressHandler = async () => {
    try {
      setIsError(false)
      signIn({ id, pw })
      SecureStore.setItemAsync(AUTO_LOGIN_ENABLED_KEY, isAutoChecked ? 'true' : 'false')
    } catch (e) {
      setIsError(true)
      console.trace(e)
      // TODO: 모든 thrown error 를 catch 해주는 spring 의 controllerAdvice 같은 친구가 있지 않을까, 아마 nextJS 에 있지 않을까 생각
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 100,
            marginBottom: 60,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image style={{ width: 48, height: 48 }} source={require('../../assets/cbhs.png')} />
          <Text style={styles.title}>충북학사</Text>
        </View>
        <TextInput
          value={id}
          onChangeText={setId}
          autoCapitalize="none"
          placeholder="학사 번호"
          style={styles.input}
        />
        <TextInput
          value={pw}
          onChangeText={setPw}
          placeholder="비밀 번호"
          secureTextEntry
          style={styles.input}
        />
        <Pressable style={styles.CTAbutton} onPress={onLoginPressHandler}>
          <Text style={styles.CTAtext}>로그인</Text>
        </Pressable>
        <View
          style={{
            width: '75%',
            paddingLeft: 10
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start' // Set alignSelf to flex-start. Pressable component will only take up the space needed by its children.
            }}
            onPress={toggleAutoLogin}
          >
            <Checkbox
              style={styles.checkbox}
              value={isAutoChecked}
              onValueChange={toggleAutoLogin}
              color={isAutoChecked ? '#4630EB' : undefined}
            />
            <Text style={{ margin: 5 }}>자동 로그인</Text>
          </Pressable>
        </View>
        {isError && (
          <Text style={styles.error}>
            {'학사 번호 또는 비밀 번호가 틀렸습니다\n다시 입력해주세요'}
          </Text>
        )}
      </View>
      <View style={{ width: '100%', height: '10%', alignItems: 'center' }}>
        <Text
          style={{
            // fontFamily: 'SpoqaHanSansNeo-Medium',
            color: 'rgba(198, 199, 193, 1)',
            textAlign: 'center'
          }}
        >
          {'학사 번호가 기억이 나지 않을 경우\n행정실에 문의하세요'}
        </Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    // fontFamily: 'BMJUA',
    fontSize: 32,
    marginLeft: 8
  },
  input: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    fontSize: 14,
    width: '75%',
    height: 48,
    marginLeft: 44,
    marginRight: 44,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#B9CCB4',
    paddingLeft: 16
  },
  CTAbutton: ({ pressed }) => {
    return [
      {
        width: '75%',
        height: 48,
        marginTop: 20,
        marginBottom: 15,
        backgroundColor: pressed ? 'rgb(234, 243, 230)' : '#00A551',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    ]
  },
  CTAtext: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    color: 'white'
  },
  error: {
    // fontFamily: 'SpoqaHanSansNeo-Medium',
    marginTop: 14,
    color: '#BA1A1A'
  }
})

export default LoginScreen
