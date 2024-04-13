import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Progress from 'react-native-progress';


export default function MacroProgressBar(props: any) {
    //const [value, setValue] = useState(props.value);

    /**function setProgressValue(){
        setValue(value);
    }**/    

    
    return (
        <View style={styles.container}>
            <View style={styles.text_sub_container}>
                <Text>{props.name}</Text>
            </View>
            <View style={styles.sub_container}>
                <Progress.Bar progress={props.value/props.max} width={null} height={7} borderRadius={50} color='#339437' borderWidth={0} unfilledColor='#E5E5E5' />
            </View>
            <View style={styles.text_sub_container}>
                <Text style={styles.bold}>{props.value + " / " + props.max + " g"}</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    sub_container: {
        paddingVertical: "5%",
        width: "80%",
        justifyContent: "center",
    },
    text_sub_container: {
        alignItems: "center",
    },
    bold: {
        fontWeight: "bold",
    },
});