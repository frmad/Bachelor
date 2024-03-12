import * as React from 'react';
import Camera from '../components/Camera';


import { Button, Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image, Pressable } from 'react-native';
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
import Card from '../components/Card';
import CircularSlider from '../components/CircularSlider';
import MacroSlider from '../components/MacroSlider';
import List from '../components/List';
import ListItem from '../components/ListItem';


export default function HomeScreen(){

  return (
    <View style={styles.container}>
      <Text>Today</Text>

      <Card>
        <View style={styles.row}>
          <CircularSlider value={1200} max={2000}/>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <MacroSlider name={"Carbs"} value={180} max={210} />
          </View>
          
          <View style={styles.column}>
            <MacroSlider name={"Protein"} value={25} max={180} />
          </View>
          
          <View style={styles.column}>
            <MacroSlider name={"Fat"} value={120} max={200} />
          </View>
        </View>
      </Card>

      <Card>
        <List name={"Breakfast"}>
          <Text>------------------------------------------------</Text>
          <ListItem weight={322} name="Pancakes" />

          <Text>Title</Text>


        </List>
      </Card>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
      backgroundColor: '#EBEBEB',
      height: '100%',
  },
  center: {
    flex: 1,
    alignContent: "center",
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});


//<Camera />