import React, { createContext, useEffect, useState } from 'react'

import fetchMeal from './api/meal'

export const MealContext = createContext()

const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState('')
  const [loading, setLoading] = useState(true)
  let timer = null

  const load = async () => {
    setLoading(true)
    const meals = await fetchMeal()
    setMeals(meals)
    setLoading(false)
  }

  const reloadTimer = () => {
    // 지금 시간 (GMT+9)
    const now = new Date()
    now.setHours(now.getHours() + 9)
    // 익일 00:01 분에 초기화
    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 1)
    nextDay.setHours(9, 0, 10, 0)
    console.log(nextDay.toUTCString())

    // 일정 시간 간격으로 되는가?
    // nextDay.setHours(nextDay.getHours() + 9, nextDay.getMinutes(), nextDay.getSeconds() + 5) // 5초 간격으로 fetch
    // 표적한 시간에 되는가?
    // nextDay.setSeconds(nextDay.getSeconds() + 10)

    const reloadTime = nextDay - now

    timer = setTimeout(() => {
      load()
      reloadTimer()
    }, reloadTime)
  }

  useEffect(() => {
    load()
    reloadTimer()
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <MealContext.Provider value={[meals, loading]}>{children}</MealContext.Provider>
}

export default MealProvider
