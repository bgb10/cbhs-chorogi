import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { parse } from 'node-html-parser'

// await 을 function 안에서 사용하지 못하는 이유는?
// 저렇게 promise chaining 하지 않고 해결할 수 있는 방법이 있을 것 같은데.

// const k = await fetch('http://www.cbhs.kr/meal', {
//   method: 'GET'
// })

export default function MealScreen() {
  const [meal, setMeal] = useState({})

  useEffect(() => {
    // fetch('http://www.cbhs.kr/meal', {
    //   method: 'GET'
    // }).then((k) => k.text().then((text) => console.log(text)))

    fetch('http://www.cbhs.kr/meal', {
      method: 'GET'
    }).then((k) => {
      k.text().then((text) => {
        // console.log(text)
        const root = parse(text)
        const fplans = root.querySelectorAll('.fplan_plan')
        const fplansParsed = fplans.map((fplan) => Array.from(fplan.querySelectorAll('p')))
        const dateRegex = /[^0-9]/g
        const unescapeRegex = /\n|\t/g
        let tmeal = {}
        fplansParsed.forEach((fplan) => {
          const date = fplan[0].innerText.replace(dateRegex, '')
          const brf = fplan[1].innerText.replace(unescapeRegex, '')
          const lun = fplan[2].innerText.replace(unescapeRegex, '')
          const din = fplan[3].innerText.replace(unescapeRegex, '')
          tmeal[date] = { brf, lun, din }
        })
        console.log(tmeal)
      })
    })
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>asdf</Text>
    </View>
  )
}
