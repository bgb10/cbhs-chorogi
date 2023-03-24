import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Card } from '../components/Card'
import { HighlightedCard } from '../components/HighlightedCard'
import { MealContext } from '../MealQueryProvider'

const Meal = () => {
  const [meals, loading] = useContext(MealContext)

  if (loading) {
    return null
  }

  const now = new Date()
  let todayMeal = meals.filter((meal) => {
    const yy = now.getFullYear().toString().substr(-2) // last two digits of year
    const mm = (now.getMonth() + 1).toString().padStart(2, '0') // month with leading zero
    const dd = now.getDate().toString().padStart(2, '0') // day with leading zero
    const dateString = `${yy}${mm}${dd}` // combine into a string
    return meal.date === dateString
  })[0]
  todayMeal = { ...todayMeal }
  todayMeal.fullDate = '오늘의 식단 🍚'

  return (
    <ScrollView style={styles.container}>
      <HighlightedCard meal={todayMeal}></HighlightedCard>
      {meals.map((meal, idx) => {
        return meal.brf.includes('&nbsp;') ? null : <Card key={idx} meal={meal}></Card>
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
