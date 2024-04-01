import { createStackNavigator } from '@react-navigation/stack';
import Loading from './Loading';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./HomeScreen";
import MealScreen from "./MealScreen";
import PlanScreen from "./PlanScreen";
import ResultScreen from "./ResultScreen";
import ProfileScreen from "./ProfileScreen";
import Camera from '../components/Camera';
import {Image} from 'react-native'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'

const Tab = AnimatedTabBarNavigator();

function Tabs() {
    return (
        <Tab.Navigator initialRouteName='Home' 
        screenOptions={({ route, navigation}) => ({
            tabBarIcon: ({ focused }) => (
            CustomTabBarIcon(route.name, focused)),
            headerShown: false, 
            tabBarLabel: navigation.isFocused() ? route.name : '',
  })}
  tabBarOptions={{ activeBackgroundColor: '#BCFFBB'}}
  
  >
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
                <Stack.Group>
                    <Stack.Screen name="Tab" component={Tabs} options={{ headerShown: false }}/>
                    <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }}/>
                    <Stack.Screen name="Camera" component={Camera} options={{ headerShown: false }} />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name='Result' component={ResultScreen} options={{headerShown: false}} />
                </Stack.Group>
            </Stack.Navigator>
           
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




