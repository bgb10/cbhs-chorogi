import { useEffect } from 'react'
import { View, Text, Platform } from 'react-native'
import { StyleSheet } from 'react-native'

export const TodayMealCard = ({
  meal
}: any) => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={[styles.card, styles.shadow]}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.heading1}>{`${meal.fullDate}`}</Text>
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={{ paddingTop: 12 }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.heading2}>{`조식 🐓`}</Text>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.content}>{`·${meal.brf.join()}`}</Text>
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={{ paddingTop: 12 }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.heading2}>{`중식 🌞`}</Text>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.content}>{`·${meal.lun.join()}`}</Text>
      </View>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <View style={{ paddingTop: 12 }}>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.heading2}>{`석식 🌙`}</Text>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text style={styles.text.content}>{`·${meal.din.join()}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '88%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    marginTop: 12,
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: '#00A551'
  },
  shadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: 'black',
          shadowOffset: {
            width: -2,
            height: 4
          },
          shadowOpacity: 0.25,
          shadowRadius: 5
        }
      : {
          elevation: 20,
          shadowColor: 'black'
        },
  text: {
    // @ts-expect-error TS(2322): Type '{ heading1: { fontSize: number; fontWeight: ... Remove this comment to see the full error message
    heading1: {
      // fontFamily: 'SpoqaHanSansNeo-Bold',
      fontSize: 18,
      fontWeight: '500'
    },
    heading2: {
      // fontFamily: 'SpoqaHanSansNeo-Medium',
      fontSize: 16,
      fontWeight: '500'
    },
    content: {
      // fontFamily: 'SpoqaHanSansNeo-Regular',
      fontSize: 14,
      fontWeight: '400'
    }
  }
})
