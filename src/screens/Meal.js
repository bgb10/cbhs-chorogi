import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import { Card } from '../components/card'
import { useQuery, QueryClient } from 'react-query'
import fetchMeal from '../api/meal'

const Meal = () => {
  const { data: meals = [], isLoading, error } = useQuery('meals', fetchMeal)

  if (isLoading) {
    return null
  }

  if (error) {
    return <div>Error fetching meals: {error.message}</div>
  }

  if (!meals) {
    return null
  }

  return (
    <ScrollView style={styles.container}>
      {meals.map((meal, idx) => (
        <Card key={idx} meal={meal}></Card>
      ))}
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
