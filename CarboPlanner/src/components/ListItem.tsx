import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import VerticalLine from './VerticalLine';

export default function ListItem(props: any) {

    return (
        <View style={styles.row}>
            <View style={styles.macros}>
                <View style={styles.row}>
                    <Text style={styles.bold}>{Math.round(props.weight)} g</Text>
                </View>
                <VerticalLine/>
                <View style={styles.column}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.textUnder}>{Math.round(props.calories)} kcal</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Carbs</Text>
                    <Text style={styles.textUnder}>{Math.round(props.carbs)} g</Text>
                </View>

                <View style={styles.column}>
                    <Text style={styles.text}>Protein</Text>
                    <Text style={styles.textUnder}>{Math.round(props.protein)} g</Text>
                </View>

                <View style={styles.column}>
                    <Text style={styles.text}>Fat</Text>
                    <Text style={styles.textUnder}>{Math.round(props.fat)} g</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginHorizontal: '2%',
        borderRadius: 25,
    },
    bold: {
        fontWeight: "bold",
        fontSize: 18,
        color: '#45505B',
    },
    tinyImage: {
        width: 60,
        height: 60,
    },
    row: {
        flex: 1,
        paddingVertical: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
        alignItems: "center"
    },
    text: {
        color: '#45505B',
        fontSize: 14,
    },
    textUnder: {
        color: '#45505B',
        fontSize: 12,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
        color: '#45505B',
    },
    macros:{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 2,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // for Android elevation
        flex: 1
    },
});