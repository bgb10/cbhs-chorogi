import { View, Text } from 'react-native'
import { createContext, useContext, useMemo, useRef, useState } from 'react'

export const SettingsContext = createContext()

// 그냥 예를 들어서 세팅할 값이 4개라고 치자. 그럼 어떻게 전달하지?
// 백그라운드에서 돌아올 때 QR 로 화면 자동 이동, (추후 푸쉬알림 정도?)
// 일단 화면 자동이동만 고려하고, 나머지는 여쭤보자.

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(true)
  const actions = useMemo(
    () => ({
      toggle() {
        setSettings((p) => !p)
      }
    }),
    []
  )

  return <SettingsContext.Provider value={[settings, actions]}>{children}</SettingsContext.Provider>
}

export default SettingsProvider
