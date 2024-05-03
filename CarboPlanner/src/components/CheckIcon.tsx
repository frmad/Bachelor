import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const CheckIcon = () => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            delay: 1000,
            useNativeDriver: true,
        }).start();
    });

    return (
        <Animated.View style={[styles.container, { opacity: animation }]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#65CB2E"
                style={styles.checkIcon}
            >
                <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </Svg>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
    },
    checkIcon: {
        width: "100%",
        height: "100%",
    },
});

export default CheckIcon;
