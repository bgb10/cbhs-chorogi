import { useEffect } from 'react';
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export const Card = ({ meal }) => {

    useEffect(() => {
        console.log(JSON.stringify(meal, null, 4));
    }, []);
    return (
        <View style={[styles.card, styles.shadow]}>
            <View>
                <Text style={styles.text.heading1}>
                    {`${meal.day}`}
                </Text>
            </View>
            <View style={{ paddingTop: 12 }}>
                <Text style={styles.text.heading2}>
                    {`조식 🐓`}
                </Text>
                <Text style={styles.text.content}>
                    {`·${meal.brf.join()}`}
                </Text>
            </View>
            <View style={{ paddingTop: 12 }}>
                <Text style={styles.text.heading2}>
                    {`중식 🌞`}
                </Text>
                <Text style={styles.text.content}>
                    {`·${meal.lun.join()}`}
                </Text>
            </View>
            <View style={{ paddingTop: 12 }}>
                <Text style={styles.text.heading2}>
                    {`조식 🌙`}
                </Text>
                <Text style={styles.text.content}>
                    {`·${meal.din.join()}`}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 1,
        paddingTop: 12,
        paddingLeft: 12,
        paddingBottom: 12,
        marginBottom: 12,
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    text: {
        heading1: {
            fontFamily: 'SpoqaHanSansNeo-Medium',
            fontSize: 18,
            fontWeight: "500",
        },
        heading2: {
            fontFamily: 'SpoqaHanSansNeo-Medium',
            fontSize: 16,
            fontWeight: "500"
        },
        content: {
            fontFamily: 'SpoqaHanSansNeo-Regular',
            fontSize: 14,
            fontWeight: "400"
        }
    }
});