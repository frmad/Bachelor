import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function MacroSlider(props: any) {
    const [value, setValue] = useState(props.value);
    const image = require("../../assets/transparent.png");

    return (
        <View style={styles.container}>
            <Text>{props.name}</Text>


            <Slider
                style={{width: 200, height: 50}}
                minimumValue={0}
                maximumValue={props.max}
                value={props.value}
                onValueChange={setValue}
                minimumTrackTintColor="#339437"
                maximumTrackTintColor="#DEDEDE"
                thumbImage={image}
            />


            <Text style={styles.bold}>{value + " / " + props.max + " g"}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: '2%',
        paddingHorizontal: '2%',
        marginHorizontal: '2%',
        alignItems: "center",
        borderRadius: 25,
    },
    bold: {
        fontWeight: "bold",
    },
});