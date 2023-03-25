import { View, Text, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
// @ts-expect-error TS(6142): Module '../../context/SettingsProvider' was resolv... Remove this comment to see the full error message
import { SettingsContext } from '../../context/SettingsProvider'
import Checkbox from 'expo-checkbox'

const AutoQRMoveButton = () => {
  const [isPressed, setIsPressed] = useState(false)
  // @ts-expect-error TS(2488): Type 'null' must have a '[Symbol.iterator]()' meth... Remove this comment to see the full error message
  const [settings, actions] = useContext(SettingsContext)

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={() => actions.toggle()}
      style={{
        backgroundColor: isPressed ? 'gray' : 'white',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={{ color: 'black' }}>자동 화면 이동</Text>
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Checkbox
          value={settings}
          onValueChange={actions.toggle}
          color={settings ? '#4630EB' : undefined}
        />
      </View>
    </Pressable>
  )
}

export default AutoQRMoveButton
