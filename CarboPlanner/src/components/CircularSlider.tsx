import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  } from '@expo-google-fonts/inter';

const CircularSlider = (props: any) => {
  const [speed, setSpeed] = useState(0);
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });


  return (
    <View style={styles.container}>
      <RadialSlider 
        value={props.value}
        min={0} max={props.max} 
        onChange={setSpeed} 
        isHideLines={true}
        isHideTailText={true}
        isHideButtons={true}
        linearGradient={[{ offset: '0%', color:'#65CB2E' }, { offset: '100%', color: '#65CB2E' }]}
        thumbRadius={0}
        unit={" / " + props.max}
        sliderWidth={20}
        unitStyle={[{fontSize: 22, fontFamily: "Inter_700Bold", color: "#45505B"}]}
        valueStyle={[{fontSize: 22, marginRight: -20,  fontFamily: "Inter_700Bold", color: "#45505B"}]}
        style={[{justifyContent: "center"}]}
        subTitleStyle={[{fontSize: 18,  fontFamily: "Inter_300Light", color: "#45505B"}]}
        subTitle='kCal Intake'
        />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default CircularSlider;