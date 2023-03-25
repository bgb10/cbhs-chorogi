const regex = /makeCode\('(\d+)'\)/

const login = async (id: any, pw: any) => {
  try {
    const res = await fetch('http://115.92.96.29:8080/employee/loginProc.jsp', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      referrer: 'http://115.92.96.29:8080/employee/login.jsp',
      body: `USER_ID=${id}&USER_PW=${pw}&SAVE_PW=on`,
      method: 'POST',
      mode: 'cors'
    })
    const text = await res.text()
    const parsed = text.match(regex)

    if (parsed == null) {
      throw new Error('아이디 비번 틀렸습니다.')
    } else {
      return parsed[1]
    }
  } catch (e) {
    throw e
  }
}

export default login
