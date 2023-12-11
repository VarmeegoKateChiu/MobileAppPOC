import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import Landing from './Screens/Landing';
import Navigation from './Navigators/Navigation';

const Stack = createNativeStackNavigator();
const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Navigation">
                <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }}/>
                <Stack.Screen name="Navigation" component={Navigation} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;