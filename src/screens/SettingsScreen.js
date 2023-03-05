import { useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function SettingsScreen() {
  const data = [
    { id: 1, title: '시작 화면' },
    { id: 2, title: '오류 제보' },
    { id: 3, title: '로그아웃', color: 'red' }
  ]

  // {버튼id : 버튼눌림여부} 로 이루어진 state 생성
  const [buttonStates, setButtonStates] = useState(
    data.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: false
      }),
      {}
    )
  )

  const handlePressIn = (id) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [id]: true
    }))
  }

  const handlePressOut = (id) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [id]: false
    }))
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPressIn={() => handlePressIn(item.id)}
        onPressOut={() => handlePressOut(item.id)}
        style={{
          backgroundColor: buttonStates[item.id] ? 'gray' : 'white',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text style={item.color ? { color: item.color } : { color: 'black' }}>{item.title}</Text>
        </View>
        <View>
          <Text>
            <Icon name="chevron-forward-outline" size={30} color="black" />
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
    </View>
  )
}
