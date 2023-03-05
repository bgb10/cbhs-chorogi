import { React, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const onPressHandler = () => {
    setIsLoading(true)

    // 개인정보 저장
    // 로그인 성공할 경우
    // TODO: 추후에 중복 제거 필요
    const regex = /makeCode\('(\d+)'\)/

    fetch('http://115.92.96.29:8080/employee/loginProc.jsp', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      referrer: 'http://115.92.96.29:8080/employee/login.jsp',
      body: `USER_ID=${props.id}&USER_PW=${props.pw}&SAVE_PW=on`,
      method: 'POST',
      mode: 'cors'
    })
      .then((res) => res.text())
      .then((text) => {
        const res = text.match(regex)
        if (res == null) {
          props.onLogin(false)
          setIsError(true)
          Toast.show({
            type: 'error',
            text1: 'login fail!'
          })
        } else {
          props.onLogin(true)
          setIsError(false)
          // 여기서 isSaved 를 true 로 해줘야 하는데 어떻게 할 수 있지?
          // 부모 state 를 자식이 변경하는게 가능한가? redux 가 필요하려나?
          // depth 가 깊지 않으므로 굳이 상태관리 라이브러리는 필요 없다. 물론 recoil 사용하면 더 좋긴 함.
        }
      })

    setIsLoading(false)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>로그인 안되었을 때 초기 화면</Text>
      <Text>충북학사</Text>
      <TextInput
        style={styles.input}
        value={props.id}
        placeholder="학사 번호"
        onChangeText={props.setId}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        value={props.pw}
        placeholder="비밀 번호"
        onChangeText={props.setPw}
        editable={!isLoading}
      />
      <Button title="로그인" color="#841584" onPress={onPressHandler} disabled={isLoading} />
      <Text style={!isError && { display: 'none' }}>Error. Login Failed!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})

export default LoginScreen
