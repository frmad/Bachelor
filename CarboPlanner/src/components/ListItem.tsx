import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default function ListItem(props: any) {


    return (
        <View style={styles.row}>
            <Text>{props.weight}</Text>
            <Text>{props.name}</Text>
            <Text>carbs</Text>
            <Text>protein</Text>
            <Text>fat</Text> 
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
    tinyImage: {
        width: 60,
        height: 60,
    },
    row: {
        flex: 1,
        paddingVertical: "1%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
    },
});