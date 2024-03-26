# CBHS chorogi (충북학사 초록이)
![image](https://github.com/bgb10/cbhs-chorogi/assets/25452313/8d5dd054-104a-495b-a320-fbcb5318069b)

The CBHS Assistant app `cbhs-chorogi` addresses inconveniences faced by students at CBHS. It Simplifies QR code based entry system and provides quick access to the meal. Developed using `React Native` and `Expo`. Distributed it to the Google Play Store, and put up posters in CBHS for advertising. Statistics showed that almost all Android users (around 90-100) in CBHS installed `cbhs-chorogi`. Also, when I ask people they say that CBHS makes check-in much faster and simplified to see what's on the menu for the day.
> `CBHS` is 'Chung Buk Hak-Sa', which means local dormitory for people from Chungchungbuk-do, Korea.

# Motivation

## Inconvenient Web-Based QR Check-In

<p align="center">
  <img src="https://github.com/bgb10/cbhs-chorogi/assets/25452313/c61e4edf-7d86-4bad-aada-195946447138" alt="CBHS chorogi">
</p>

CBHS has a QR check-in system for student access. To obtain a QR code, students must log in to the CBHS server, which is currently only possible through a web page. Therefore, the existing procedure for student access was as follows:
1. Students access the login page by bookmarking it in their browser or searching for the link in front of the kiosk.
2. Since the page does not have an option to save the ID, students manually enter their ID and password to log in.
3. After logging in, they receive the QR code and proceed with entering or exiting the dorm.

This method has the following problems:
1. The process of obtaining the QR code, including opening the browser, accessing the link, and entering the ID and password, is inconvenient.
2. Forgetting passwords is common, leading to frequent inquiries to the office.
3. Many students experience difficulty in scanning the QR code during morning entry times, resulting in long waiting lines (especially when time for going school)

## Inconvenient Meal Menu Check

<p align="center">
  <img src="https://github.com/bgb10/cbhs-chorogi/assets/25452313/cabc7240-5431-46a2-ba12-3797346b4be6" alt="CBHS chorogi" style="height: 70%;">
</p>

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
<p align="center">
  <img src="https://github.com/bgb10/cbhs-chorogi/assets/25452313/9d990036-3f29-4a89-a6c8-edfc488fa769" alt="CBHS chorogi" height="500px">
</p>
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

<p align="center">
  <img src="https://github.com/bgb10/cbhs-chorogi/assets/25452313/6714258b-31cf-4832-ad25-9e489e33894a" alt="CBHS chorogi" height="700px">
  <img src="https://github.com/bgb10/cbhs-chorogi/assets/25452313/909d449f-1757-4f74-85ed-1a3f3831f953" alt="CBHS chorogi" height="700px">
</p>

We developed an app, distributed it to the Play Store, and put up posters in the elevators and on each floor of the CBHS. Based on this, we achieved the following results:

- Statistics showed that there were about 100 users, and considering the percentage of Android users in their 20s in Korea, which is 35% (the usage rate according to [Korea Gallup](https://news.mt.co.kr/mtview.php?no=2023071810192166703)) out of 320 total users in CBHS, it was 96, which means that almost everyone was interested in the app and installed it.
- In fact, I saw a lot of people using QR check-in. When I ask people, they say that CBHS makes check-in much faster!
- I love how easy it is to see what's on the menu for the day. (very important)

# Contributions
> I quit CBHS, so this repository no more maintained. But, I've had a few people ask if they can use this code to build new apps. Please do! You're always welcome.
