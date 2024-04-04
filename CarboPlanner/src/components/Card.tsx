import { Children } from 'react';
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
        backgroundColor: '#FFFFFF',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginHorizontal: '2%',
        borderRadius: 25,
        maxHeight:"100%"
    },
});