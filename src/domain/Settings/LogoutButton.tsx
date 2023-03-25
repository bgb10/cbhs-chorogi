import { View, Text, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthFunctionContext } from '../../context/AuthProvider'
import Icon from 'react-native-vector-icons/Ionicons'

const LogoutButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  const { signOut } = useContext(AuthFunctionContext)

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={signOut}
      style={{
        backgroundColor: isPressed ? 'gray' : 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Text style={{ color: 'red' }}>로그아웃</Text>
      </View>
      <View>
        <Text>
          <Icon name="chevron-forward-outline" size={20} color="black" />
        </Text>
      </View>
    </Pressable>
  )
}

export default LogoutButton
