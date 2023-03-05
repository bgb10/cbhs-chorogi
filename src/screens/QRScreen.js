import { View, Text, Button } from 'react-native'
import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

const regex = /makeCode\('(\d+)'\)/

export default function QRScreen() {
  const [code, setCode] = useState('test')
  const [lastUpdatedTimeStamp, setLastUpdatedTimeStamp] = useState(Date.now())

  const updateLastUpdatedTimeStamp = () => {
    const now = new Date(Date.now())
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()

    const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    setLastUpdatedTimeStamp(formattedDate)
  }

  // QR 코드를 발급하는 코드는 학사번호 + MM + SS 로 구성
  // 1초 안에 여러번 Reload 버튼을 눌러도 코드가 발급 코드가 그대로이기 때문에 QR 코드는 바뀌지 않는다.
  const loadQR = () => {
    fetch('http://115.92.96.29:8080/employee/loginProc.jsp', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      referrer: 'http://115.92.96.29:8080/employee/login.jsp',
      body: 'USER_ID=202051&USER_PW=001028&SAVE_PW=on',
      method: 'POST',
      mode: 'cors'
    })
      .then((res) => res.text())
      .then((text) => text.match(regex))
      .then((e) => setCode((before) => e[1]))

    updateLastUpdatedTimeStamp()
  }

  useEffect(() => {
    loadQR()
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode value={`${code}`} />
      <Text>{`발급 날짜: ${lastUpdatedTimeStamp}`}</Text>
      <Button onPress={loadQR} title="reload" color="#841584" />
    </View>
  )
}
