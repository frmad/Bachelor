import { View, StyleSheet } from 'react-native';

export default function HorizontalLine() {
    return (
        <View style={styles.container} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F1F1',
        width: "95%",
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: '0.5%',
        paddingHorizontal: '2%',
        marginHorizontal: '2%',
        marginTop: "1%",
        borderRadius: 25,
    },
});