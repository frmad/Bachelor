import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function HorizontalLine() {
    return (
        <View style={styles.container} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F1F1',
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: '2%',
        paddingHorizontal: '0.4%',
        marginHorizontal: '2%',
        borderRadius: 25,
        height: "95%",
    },
});