# CBHS chorogi (충북학사 초록이)
![image](https://github.com/bgb10/cbhs-chorogi/assets/25452313/8d5dd054-104a-495b-a320-fbcb5318069b)

# Motivation

## Inconvenient Web-Based QR Check-In

![학사 입출입](https://github.com/bgb10/cbhs-chorogi/assets/25452313/c61e4edf-7d86-4bad-aada-195946447138)

CBHS has a QR check-in system for student access. To obtain a QR code, students must log in to the CBHS server, which is currently only possible through a web page. Therefore, the existing procedure for student access was as follows:
1. Students access the login page by bookmarking it in their browser or searching for the link in front of the kiosk.
2. Since the page does not have an option to save the ID, students manually enter their ID and password to log in.
3. After logging in, they receive the QR code and proceed with entering or exiting the dorm.

This method has the following problems:
1. The process of obtaining the QR code, including opening the browser, accessing the link, and entering the ID and password, is inconvenient.
2. Forgetting passwords is common, leading to frequent inquiries to the office.
3. Many students experience difficulty in scanning the QR code during morning entry times, resulting in long waiting lines (especially when time for going school)

## Inconvenient Meal Menu Check

![cbhs-meal-uncomfortable](https://github.com/bgb10/cbhs-chorogi/assets/25452313/cabc7240-5431-46a2-ba12-3797346b4be6)

Students always keep checking the dorm's meal menu (I do too XD), as it is available only through a web page. Moreover, 
the menu does not prioritize displaying today's menu, requiring students to search for and verify the menu up to the current date.

> To address the aforementioned issues, we developed the **CBHS Assistant app `cbhs-chorogi` (`충북학사 초록이`).**

# Features
`cbhs-chorogi` provides the following features:

* App-based instead of web-based for quick server access
* Automatic server connection, login, and QR code issuance upon app launch
* Instant access to today's meal menu, categorized into 'Past Meals' and 'Upcoming Meals'

# Developing

## Built with
`React Native` for cross-platform mobile app development and the `Expo` framework for expedited development.

## Setup
```bash
git clone https://github.com/your/your-project.git
cd your-project/
npm install
npm start
```

# Issues
## How to generate QR code?
![image](https://github.com/bgb10/cbhs-chorogi/assets/25452313/9d990036-3f29-4a89-a6c8-edfc488fa769)
Since the QR code generation logic using Server-Side Rendering (SSR) was not publicly available, we initially considered fetching the page directly and extracting the QR code image. However, we was curious about the information encoded in the QR code, we attempted to decode it.
Analyzing the QR code revealed a discernible pattern. It was generating the QR code based on the student ID, current minute, and current second (MMSS). Thus, generating the QR code required the input of the student ID along with the current minute and second. 
However, to ensure security, QR code generation was disabled if the user was not logged into the server.
> The current QR code issuance method of CBHS allows QR code issuance without knowing the 'password,' potentially allowing unauthorized access or manipulation of entry and exit records. Hope CBHS administrative team to address this issue promptly.

## How to login automatically?
```javascript
// at /src/domain/QR/QR.js
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      loadQR()
    } else if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
      setIsLoading(true)
    }

    appState.current = nextAppState
  })
```
Utilized the `useEffect` hook in React to automatically issue the QR code upon app launch or when returning from the background. 
This functionality was triggered only if the 'automatic login' button was enabled.

# Achievements
