import React, {useRef, useEffect, useState} from 'react';
import { Animated, View, StyleSheet, SafeAreaView, Easing } from 'react-native';

const LoadingIcon = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Image
                source={require('../../assets/icons/loadingIcon.png')}
                style={[
                    styles.icon,
                    {
                        transform: [{ rotate: spin }],
                        width: 150,
                        height: 150
                    },
                ]}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%',
    },
    icon: {

    },
});

export default LoadingIcon;
