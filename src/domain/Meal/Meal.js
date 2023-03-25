import React, { useContext } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { MealContext } from '../../context/MealProvider'
import { MealCard } from './MealCard'
import { TodayMealCard } from './TodayMealCard'

const Meal = () => {
  const [meals, loading] = useContext(MealContext)

  if (loading) {
    return null
  }

  const now = new Date()
  let todayMealIdx = meals.findIndex((meal) => {
    const yy = now.getFullYear().toString().substr(-2) // last two digits of year
    const mm = (now.getMonth() + 1).toString().padStart(2, '0') // month with leading zero
    const dd = now.getDate().toString().padStart(2, '0') // day with leading zero
    const dateString = `${yy}${mm}${dd}` // combine into a string
    return meal.date === dateString
  })
  console.log(todayMealIdx)

  const beforeMeals = meals.slice(0, todayMealIdx)
  const afterMeals = meals.slice(todayMealIdx + 1)
  console.log(beforeMeals)
  console.log(afterMeals)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      <Text
        style={{
          width: '88%',
          margin: 10,
          marginBottom: 0,
          fontSize: 20,
          fontWeight: '500'
        }}
      >
        오늘의 식사 🍚
      </Text>
      <TodayMealCard meal={meals[todayMealIdx]}></TodayMealCard>
      <Text style={{ width: '88%', margin: 10, marginBottom: 0, fontSize: 20, fontWeight: '500' }}>
        이후 식단
      </Text>
      {afterMeals.map((m, idx) => {
        return m.brf.includes('&nbsp;') ? null : <MealCard key={idx} meal={m}></MealCard>
      })}
      <Text style={{ width: '88%', margin: 10, marginBottom: 0, fontSize: 20, fontWeight: '500' }}>
        지난 식단
      </Text>
      {beforeMeals.map((m, idx) => {
        return m.brf.includes('&nbsp;') ? null : <MealCard key={idx} meal={m}></MealCard>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white'
  }
})

export default Meal
