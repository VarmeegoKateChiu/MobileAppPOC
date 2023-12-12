import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNav from "../Navigators/BottomTabsNav";
import LoginScreen from "./LoginPages/LoginScreen";
import InitLoadingScreen from "./InitLoadingPages/InitLoadingScreen";

const Stack = createNativeStackNavigator();
const MainNavContainer = () => {
    return(

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="InitLoadingScreen" component={InitLoadingScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="MainScreen" component={BottomTabsNav} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default  MainNavContainer;