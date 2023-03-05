import { React, useState } from 'react'
import { Alert, Modal, View, Text, Pressable, Dimensions, FlatList } from 'react-native'

// Tightly Coupling 되어있을 경우 functional parent component 안에 functional child component 가 들어갈 수 있다.
const deviceHeight = Dimensions.get('window').height

const BottomModal = (props) => {
  const OutsideTouchable = () => {
    return (
      <Pressable onPress={props.onTouchOutside} style={{ flex: 1, width: '100%' }}>
        <View style={{ flex: 1, width: '100%' }}></View>
      </Pressable>
    )
  }

  const Title = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#182E44', fontSize: 20, fontWeight: '700', margin: 15 }}> {props.title}</Text>
      </View>
    )
  }

  // react native 는 default main column 이 column 이다. (css 기본은 row)
  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'normal', color: '#182E44' }}>{item.name}</Text>
      </View>
    )
  }

  const Seperator = () => {
    return <View style={{ opacity: 0.1, backgroundColor: '#182E44', height: 1 }}></View>
  }

  const Content = () => {
    return (
      <View>
        <FlatList
          style={{ marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Seperator}
        ></FlatList>
      </View>
    )
  }

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.onTouchOutside() // TODO: refactor
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end' // bottom modal
        }}
      >
        <OutsideTouchable onTouch={props.onTouchOutside} />
        <View
          style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.4
          }}
        >
          <Title />
          <Content />
        </View>
      </View>
    </Modal>
  )
}

export default BottomModal
