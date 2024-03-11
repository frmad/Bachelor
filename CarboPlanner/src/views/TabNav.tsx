import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./HomeScreen"
import Plan from "./PlanScreen"
import Meal from "./MealScreen"
import Tracking from "./TrackingScreen"
import Profile from "./ProfileScreen"

export default function TabNav(){
    const Tab = createBottomTabNavigator();

    return(
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home' screenOptions={({route, navigation }) => {
        return { headerShown: false, tabBarLabel: navigation.isFocused() ? route.name : '' };
    }}>
                <Tab.Screen name="Home" component={Home}/>
                <Tab.Screen name="Plan" component={Plan}/>
                <Tab.Screen name="Meal" component={Meal}/>
                <Tab.Screen name="Tracking" component={Tracking}/>
                <Tab.Screen name="Profile" component={Profile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

