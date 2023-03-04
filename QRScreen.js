import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'

export default function QRScreen() {
  const [code, setCode] = useState('test')

  useEffect(() => {
    const regex = /makeCode\('(\d+)'\)/

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
      .then((e) => setCode(e[1]))
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>QR</Text> */}
      <QRCode value={`${code}`} />
    </View>
  )
}
