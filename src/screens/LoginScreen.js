import { React, useState } from 'react';
import {
  View, Image,
  Text, TextInput,
  StyleSheet,
  Pressable
} from 'react-native';

import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Medium': require('../../assets/fonts/SpoqaHanSansNeo-Medium.otf'),
    'BMJUA': require('../../assets/fonts/BMJUA.otf'),
  });

  const onPressHandler = () => {
    setIsLoading(true);

    // 개인정보 저장
    // 로그인 성공할 경우
    // TODO: 추후에 중복 제거 필요
    const regex = /makeCode\('(\d+)'\)/;

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
      });

    setIsLoading(false);
  }

  if (!isFontLoaded) {
    return null;
  }

  return (
    <>
    <View style={styles.container}>
      <View style={{ marginTop: 100, marginBottom: 60, display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 48, height: 48 }}
          source={require("../../assets/cbhs.png")}
        />
        <Text style={styles.title}>충북학사</Text>
      </View>
      <TextInput
        style={styles.input}
        value={props.id}
        autoCapitalize="none"
        placeholder="학사 번호"
        onChangeText={props.setId}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        value={props.pw}
        placeholder="비밀 번호"
        secureTextEntry
        onChangeText={props.setPw}
        editable={!isLoading}
      />
      <Pressable style={styles.CTAbutton}
        onPress={onPressHandler} disabled={isLoading}>
        <Text style={styles.CTAtext}>로그인</Text>
      </Pressable>
      {
        isError &&
        <Text style={styles.error}>
          {"학사 번호 또는 비밀 번호가 틀렸습니다\n다시 입력해주세요"}
        </Text>
      }
    </View>
    <View style={{width: "100%", height: "10%", alignItems: "center"}}>
      <Text style={{fontFamily: "SpoqaHanSansNeo-Medium", color:"rgba(198, 199, 193, 1)" ,textAlign: "center"}}>{"학사 번호가 기억이 나지 않을 경우\n행정실에 문의하세요"}</Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontFamily: "BMJUA",
    fontSize: 32,
    marginLeft: 8,
  },
  input: {
    fontFamily: "SpoqaHanSansNeo-Medium",
    fontSize: 14,
    width: "75%",
    height: 48,
    marginLeft: 44,
    marginRight: 44,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#B9CCB4",
    paddingLeft: 16
  },
  CTAbutton: ({ pressed }) => {return([{
    width: "75%",
    height: 48,
    marginTop: 20,
    backgroundColor: pressed ? "rgb(234, 243, 230)" : "#00A551",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }])},
  CTAtext: {
    fontFamily: "SpoqaHanSansNeo-Medium",
    color: "white"
  },
  error: {
    fontFamily: "SpoqaHanSansNeo-Medium",
    marginTop: 14,
    color: "#BA1A1A"
  }
});

export default LoginScreen;
