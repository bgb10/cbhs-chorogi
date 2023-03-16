import { React, useState } from 'react'
import { Alert, Modal, View, Text, Pressable, Dimensions, FlatList } from 'react-native'
import Content from './Content'

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
          <Content data={props.data} />
        </View>
      </View>
    </Modal>
  )
}

export default BottomModal
