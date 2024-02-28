import * as React from 'react';
import {Image,StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./HomeScreen"
import Plan from "./PlanScreen"
import Meal from "./MealScreen"
import Tracking from "./TrackingScreen"
import Profile from "./ProfileScreen"
import {
    AnimatedTabBarNavigator,
    DotSize, // optional
    TabElementDisplayOptions, // optional
    TabButtonLayout, // optional
    IAppearanceOptions // optional
  } from 'react-native-animated-nav-tab-bar'

export default function TabNav(){
    const Tab = AnimatedTabBarNavigator();

    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home' 
                screenOptions={({ route, navigation}) => ({
                    tabBarIcon: ({ focused }) => (
                    CustomTabBarIcon(route.name, focused)),
                    headerShown: false, 
                    tabBarLabel: navigation.isFocused() ? route.name : '',
          })}
          tabBarOptions={{ activeBackgroundColor: '#BCFFBB'}}
          
          >
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Plan" component={Plan}/>
                <Tab.Screen name="Meal" component={Meal}/>
                <Tab.Screen name="Tracking" component={Tracking}/>
                <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function CustomTabBarIcon ( routeName, focused ){  return (<Image source={getTabBarIconSource(routeName, focused)} style={{ width: 24, height: 24 }}/>)
};

const getTabBarIconSource = (routeName, focused) => {
    const iconMap = {
      Home: {
        focused: require('../../assets/icons/home-filled.png'),
        notFocused: require('../../assets/icons/home.png'),
      },
      Plan: {
        focused: require('../../assets/icons/calendar-filled.png'),
        notFocused: require('../../assets/icons/calendar.png'),
      },
      Meal: {
        focused: require('../../assets/icons/dining-room-filled.png'),
        notFocused: require('../../assets/icons/dining-room.png'),
      },
      Tracking: {
        focused: require('../../assets/icons/report-card-filled.png'),
        notFocused: require('../../assets/icons/report-card.png'),
      },
      Profile: {
        focused: require('../../assets/icons/user-filled.png'),
        notFocused: require('../../assets/icons/user.png'),
      },
    };
    const { focused: focusedIcon, notFocused: notFocusedIcon } = iconMap[routeName];
    return focused ? focusedIcon : notFocusedIcon;
  };
  
