import React from 'react'
import { View, FlatList } from 'react-native'
// @ts-expect-error TS(6142): Module './AutoQRMoveButton' was resolved to '/User... Remove this comment to see the full error message
import AutoQRMoveButton from './AutoQRMoveButton'
// @ts-expect-error TS(6142): Module './LogoutButton' was resolved to '/Users/pa... Remove this comment to see the full error message
import LogoutButton from './LogoutButton'

function Settings() {
  // 여기 data 안에 component 를 넣어주면 렌더링 가능
  // 그런데 이게 정말 최선인가... 다른 방법이 없을까?
  const data = [
    {
      id: 1,
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      component: <AutoQRMoveButton></AutoQRMoveButton>
    },
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { id: 2, component: <LogoutButton></LogoutButton> }
  ]

  const renderItem = ({
    item
  }: any) => {
    return item.component
  }

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ height: '100%' }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // @ts-expect-error TS(2769): No overload matches this call.
        ItemSeparatorComponent={
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
