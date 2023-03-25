import React, { useContext } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
// @ts-expect-error TS(6142): Module '../../context/MealProvider' was resolved t... Remove this comment to see the full error message
import { MealContext } from '../../context/MealProvider'
// @ts-expect-error TS(6142): Module './MealCard' was resolved to '/Users/parkgw... Remove this comment to see the full error message
import { MealCard } from './MealCard'
// @ts-expect-error TS(6142): Module './TodayMealCard' was resolved to '/Users/p... Remove this comment to see the full error message
import { TodayMealCard } from './TodayMealCard'

const Meal = () => {
  // @ts-expect-error TS(2488): Type 'null' must have a '[Symbol.iterator]()' meth... Remove this comment to see the full error message
  const [meals, loading] = useContext(MealContext)

  if (loading) {
    return null
  }

  const now = new Date()
  let todayMealIdx = meals.findIndex((meal: any) => {
    const yy = now.getFullYear().toString().substr(-2) // last two digits of year
    // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
    const mm = (now.getMonth() + 1).toString().padStart(2, '0') // month with leading zero
    // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
    const dd = now.getDate().toString().padStart(2, '0') // day with leading zero
    const dateString = `${yy}${mm}${dd}` // combine into a string
    return meal.date === dateString
  })
  const beforeMeals = meals.slice(0, todayMealIdx)
  const afterMeals = meals.slice(todayMealIdx + 1)

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TodayMealCard meal={meals[todayMealIdx]}></TodayMealCard>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text style={{ width: '88%', margin: 10, marginBottom: 0, fontSize: 20, fontWeight: '500' }}>
        이후 식단
      </Text>
      {afterMeals.map((m: any, idx: any) => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return m.brf.includes('&nbsp;') ? null : <MealCard key={idx} meal={m}></MealCard>
      })}
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text style={{ width: '88%', margin: 10, marginBottom: 0, fontSize: 20, fontWeight: '500' }}>
        지난 식단
      </Text>
      {beforeMeals.map((m: any, idx: any) => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return m.brf.includes('&nbsp;') ? null : <MealCard key={idx} meal={m}></MealCard>
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white'
  }
})

export default Meal
