import { createStackNavigator } from '@react-navigation/stack';
import Loading from './Loading';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import MealScreen from "./MealScreen";
import PlanScreen from "./PlanScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Meal" component={MealScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Plan" component={PlanScreen} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();

export function StackNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }}/>
                <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}




