import { View, Text } from 'react-native'
import { useEffect } from 'react'

export default function QRScreen() {
  useEffect(() => {
    console.log(1)

    //TODO: QR 코드 로드하는 로직 넣기
  }, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>QR</Text>
    </View>
  )
}
