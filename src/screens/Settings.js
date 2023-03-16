import { useContext, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthFunctionContext } from '../context/AuthProvider'
import BottomModal from '../components/BottomModal'

function Settings() {
  const { signOut } = useContext(AuthFunctionContext)
  const [modalVisible, setModalVisible] = useState(false)

  const closePopup = () => setModalVisible(false)
  const openPopup = () => setModalVisible(true)

  const testHandler2 = () => console.log('오류 제보')
  const testHandler3 = () => console.log('로그 아웃') // 이것도 상단이랑 상태 교류를 해야함...

  const data = [
    { id: 1, title: '시작 화면', handler: openPopup },
    { id: 2, title: '오류 제보', handler: testHandler2 },
    { id: 3, title: '로그아웃', color: 'red', handler: signOut }
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

  const handlePress = (id) => {
    data.filter((d) => d.id === id)[0]['handler']()
  }

  const renderItem = ({ item }) => {
    return (
      <Pressable
        onPressIn={() => handlePressIn(item.id)}
        onPressOut={() => handlePressOut(item.id)}
        onPress={() => handlePress(item.id)}
        style={{
          backgroundColor: buttonStates[item.id] ? 'gray' : 'white',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text style={item.color ? { color: item.color } : { color: 'black' }}>
            {item.title}
          </Text>
        </View>
        <View>
          <Text>
            <Icon name="chevron-forward-outline" size={30} color="black" />
          </Text>
        </View>
      </Pressable>
    )
  }

  const closeModal = () => setModalVisible(false)

  // TODO: 컴포넌트 디펜던시 파악 후 상태 관리 어떻게 할지 결정하기.

  const popupList = [
    { id: 1, name: 'QR', onPress: () => console.log(1) },
    { id: 2, name: '식단', onPress: () => console.log(2) }
  ]

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <BottomModal
        visible={modalVisible}
        onTouchOutside={closeModal}
        title="시작 화면"
        data={popupList}
      />
    </View>
  )
}

export default Settings
