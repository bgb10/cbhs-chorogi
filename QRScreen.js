import { View, Text, Button } from 'react-native'
import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

const regex = /makeCode\('(\d+)'\)/

export default function QRScreen() {
  const [code, setCode] = useState('test')

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
  }

  useEffect(() => loadQR(), [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode value={`${code}`} />
      <Button onPress={loadQR} title="reload" color="#841584" />
    </View>
  )
}
