import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import BottomTabsNav from "./BottomTabsNav";

const Stack = createNativeStackNavigator();
const HeaderNav = () => {
    return(

    <NavigationContainer>

        {/*<Stack.Navigator>*/}
        {/*    <Stack.Screen name="sideBarNav" component={SideBarNav}                   options={{*/}
        {/*        headerShown: false,*/}
        {/*    }}/>*/}
        {/*    /!*<Stack.Screen name="footerABC" component={Footer} options={{*!/*/}
        {/*    /!*    headerShown: false,*!/*/}
        {/*    /!*}}/>*!/*/}


        {/*</Stack.Navigator>*/}


    {/*    Bottom nav here*/}
        <BottomTabsNav/>
    </NavigationContainer>
    );
}

export default  HeaderNav;