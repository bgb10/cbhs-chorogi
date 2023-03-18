import parse from 'node-html-parser'

const fetchMeal = async () => {
  const k = await fetch('http://www.cbhs.kr/meal', { method: 'GET' })
  const text = await k.text()
  const root = parse(text)
  const fplans = root.querySelectorAll('.fplan_plan')
  const fplansParsed = fplans.map((fplan) => Array.from(fplan.querySelectorAll('p')))

  const dateRegex = /[^0-9]/g
  const unescapeRegex = /\n|\t/g
  const result = fplansParsed.map((fplan) => {
    const fullDate = fplan[0].querySelector('a').innerText
    const date = fullDate.replace(/\D/g, '')
    const brf = fplan[1].innerText.replace(unescapeRegex, '').split(',')
    const lun = fplan[2].innerText.replace(unescapeRegex, '').split(',')
    const din = fplan[3].innerText.replace(unescapeRegex, '').split(',')
    return { fullDate, date, brf, lun, din }
  })

  return result
}

export default fetchMeal
