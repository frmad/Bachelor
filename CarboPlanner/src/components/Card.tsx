import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    customStyle?: object; // Making customStyle prop optional
  }

export default function Card({children, customStyle}: CardProps) {
    return (
        <View style={[styles.container,customStyle]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: '#FFFFFF',
        paddingVertical: 0,
        paddingHorizontal: '2%',
        marginHorizontal: '2%',
        borderRadius: 25,
        maxHeight:"57%"
    },
});