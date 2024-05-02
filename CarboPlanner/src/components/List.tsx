import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Images } from '../utils/images';
import OptionButton from "./OptionsButton";
import { useNavigation } from '@react-navigation/native';

export default function List(props: any) {
    const [expanded, setExpanded] = React.useState(false);
    const navigation = useNavigation();

    function handlePress() { 
        setExpanded(!expanded)
    };

    const body = <View>{props.children}</View>;


    const renderTitle = () => {
        return (
            <View style={styles.titleRow}>
                <Text style={styles.bold}>{props.name}</Text>
                {/*props.showOptions determines whether the <OptionButton /> component should be rendered or not */}
                {props.showOptions && <OptionButton uuidKey={props.uuidKey}/>}
            </View>
        );
    };

    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.row}>
                    <Image style={styles.tinyImage} source={Images[props.imageURI]} />
                    {/*If showOptions is true, it renders the option button along with the title*/}
                    {/*If it returns false only the title is rendered*/}
                    {renderTitle()}
                    {expanded ? <Image source={require("../../assets/func-icon/Accordion-Up-Switch.png")} style={styles.accordionLogo} /> : <Image source={require("../../assets/func-icon/Accordion-Down-Switch.png")} style={styles.accordionLogo} />}
                </View>
            </TouchableOpacity>
            <View style={styles.body}>
                {expanded && body}
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
    titleRow: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: "0.8%",
    },
    bold: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#45505B",
    },
});