import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useFonts } from 'expo-font'

import { parse } from 'node-html-parser'

import { Card } from '../components/card'

const Meal = () => {
  const [meals, setMeals] = useState([])
  const [isFontLoaded, error] = useFonts({
    'SpoqaHanSansNeo-Bold': require('../../assets/fonts/SpoqaHanSansNeo-Bold.otf'),
    'SpoqaHanSansNeo-Light': require('../../assets/fonts/SpoqaHanSansNeo-Light.otf'),
    'SpoqaHanSansNeo-Medium': require('../../assets/fonts/SpoqaHanSansNeo-Medium.otf'),
    'SpoqaHanSansNeo-Regular': require('../../assets/fonts/SpoqaHanSansNeo-Regular.otf'),
    'SpoqaHanSansNeo-Thin': require('../../assets/fonts/SpoqaHanSansNeo-Thin.otf')
  })

  const fetchMeal = async () => {
    let result = []
    const k = await fetch('http://www.cbhs.kr/meal', {
      method: 'GET'
    })

    const text = await k.text()
    const root = parse(text)
    const fplans = root.querySelectorAll('.fplan_plan')
    const fplansParsed = fplans.map((fplan) =>
      Array.from(fplan.querySelectorAll('p'))
    )

    const dateRegex = /[^0-9]/g
    const unescapeRegex = /\n|\t/g
    fplansParsed.forEach((fplan) => {
      const date = fplan[0].innerText.replace(dateRegex, '')
      const day = fplan[0].querySelector('a').innerText
      const brf = fplan[1].innerText.replace(unescapeRegex, '').split(',')
      const lun = fplan[2].innerText.replace(unescapeRegex, '').split(',')
      const din = fplan[3].innerText.replace(unescapeRegex, '').split(',')

      result.push({ day, brf, lun, din })
    })
    setMeals(result)

    console.log(JSON.stringify(meals, null, 4))
  }

  useEffect(() => {
    fetchMeal()
  }, [])

  if (!meals || !isFontLoaded) {
    return null
  }

  return (
    <ScrollView style={styles.container}>
      {meals.length === 0 ? (
        <React.Fragment />
      ) : (
        meals.map((meal, idx, arr) => <Card key={idx} meal={meal}></Card>)
      )}
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
