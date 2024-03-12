import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default function List(props: any) {
    const [expanded, setExpanded] = React.useState(false);

    function handlePress() { 
        setExpanded(!expanded)
    };

    const body = <View>{props.children}</View>;


    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.row}>
                    <Image style={styles.tinyImage} source={require("../../assets/flat-icons/morning_breakfast.png")} />
                    <View style={styles.column}>
                        <Text style={styles.bold}>{props.name}</Text>
                    </View>
                    <Text>{ expanded ? "V" : "^"}</Text>
                </View>
            </TouchableOpacity>
            { expanded && body }
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
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        alignSelf: "center",
        paddingHorizontal: "1%",
    },
    bold: {
        fontWeight: "bold",
        fontSize: 24,
    },
});