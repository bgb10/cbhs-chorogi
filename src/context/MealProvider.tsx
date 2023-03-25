import { createContext, useState, useEffect } from 'react'
import fetchMeal from '../api/meal'

export const MealContext = createContext(null)

const MealProvider = ({ children }: any) => {
  const [meals, setMeals] = useState('')
  const [loading, setLoading] = useState(true)
  let timer: any = null

  const load = async () => {
    setLoading(true)
    const meals = await fetchMeal()
    // @ts-expect-error TS(2345): Argument of type '{ fullDate: string; date: string... Remove this comment to see the full error message
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

    // 일정 시간 간격으로 되는가?
    // nextDay.setHours(nextDay.getHours() + 9, nextDay.getMinutes(), nextDay.getSeconds() + 5) // 5초 간격으로 fetch
    // 표적한 시간에 되는가?
    // nextDay.setSeconds(nextDay.getSeconds() + 10)

    // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    const reloadTime = nextDay - now
    console.log(nextDay.toUTCString())

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
