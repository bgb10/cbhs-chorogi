import { useContext, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AutoQR from '../components/AutoQRScreenMove'
import Logout from '../components/Logout'
import { AuthFunctionContext } from '../context/AuthProvider'
import { SettingsContext } from '../context/SettingsProvider'

function Settings() {
  // 여기 data 안에 component 를 넣어주면 렌더링 가능
  // 그런데 이게 정말 최선인가... 다른 방법이 없을까?
  const data = [
    {
      id: 1,
      component: <AutoQR></AutoQR>
    },
    { id: 2, component: <Logout></Logout> }
  ]

  const renderItem = ({ item }) => {
    return item.component
  }

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'rgb(234, 243, 230)'
            }}
          />
        }
      />
    </View>
  )
}

export default Settings
