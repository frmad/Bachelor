import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const CircularSlider = (props: any) => {
  const [speed, setSpeed] = useState(0);


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
        sliderWidth={15}
        unitStyle={[{fontSize: 22, color: "#45505B"}]}
        valueStyle={[{fontSize: 22, marginRight: -20, color: "#45505B"}]}
        style={[{justifyContent: "center"}]}
        subTitleStyle={[{fontSize: 18, color: "#45505B"}]}
        subTitle='kCal Intake'
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: -30,
    },
});

export default CircularSlider;