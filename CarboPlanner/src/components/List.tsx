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
                    <Image style={styles.tinyImage} source={props.imageURI} />
                    <View style={styles.column}>
                        <Text style={styles.bold}>{props.name}</Text>
                    </View>
                    {expanded ? <Image source={require("../../assets/func-icon/Accordion-Up-Switch.png")} style={styles.accordionLogo} /> : <Image source={require("../../assets/func-icon/Accordion-Down-Switch.png")} style={styles.accordionLogo} />}
                </View>
            </TouchableOpacity>
            <View style={styles.body}>
                { expanded && body }
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
    tinyImage: {
        width: 60,
        height: 60,
    },
    accordionLogo: {
        width: 40,
        height: 40,
        alignSelf: "center",
        paddingRight: "2%",
    },
    body: {
        paddingTop: "1%",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    center: {
        flex: 1,
        justifyContent: "center",
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