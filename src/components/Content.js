import { React, useState } from 'react'
import { View, FlatList, Pressable, Text } from 'react-native'

// FlatList 에 props 전달시 handler 까지 붙여서 전달
const Content = (props) => {
  const [buttonStates, setButtonStates] = useState(
    props.data.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: false
      }),
      {}
    )
  )

  // react native 는 default main column 이 column 이다. (css 기본은 row)
  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPress={item.onPress}
        onPressIn={() => handlePressIn(item.id)}
        onPressOut={() => handlePressOut(item.id)}
        style={{
          height: 50,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: buttonStates[item.id] ? 'gray' : 'white'
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'normal', color: '#182E44' }}>{item.name}</Text>
      </Pressable>
    )
  }

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

  const Seperator = () => {
    return <View style={{ opacity: 0.1, backgroundColor: '#182E44', height: 1 }}></View>
  }

  return (
    <View>
      <FlatList
        style={{ marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        data={props.data} //
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Seperator}
      ></FlatList>
    </View>
  )
}

export default Content
