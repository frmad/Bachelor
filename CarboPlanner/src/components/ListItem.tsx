import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import VerticalLine from './VerticalLine';

export default function ListItem(props: any) {


    return (
        <View style={styles.row}>
            <View style={styles.row}>
                <Text style={styles.bold}>{props.weight}g</Text>
            </View>

            <VerticalLine />
      

            <View style={styles.column}>
                <Text>{props.name}</Text>
                <Text>{props.calories}</Text>
            </View>
            <View style={styles.column}>
                <Text>Carbs</Text>
                <Text>{props.carbs}</Text>
            </View>
           
            <View style={styles.column}>
                <Text>Protein</Text>
                <Text>{props.protein}</Text>
            </View>
      
            <View style={styles.column}>
                <Text>Fat</Text>
                <Text>{props.fat}</Text>
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
        fontSize: 24,
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
    },
});