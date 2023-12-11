import { Text, View , Dimensions } from 'react-native';
import React from 'react';
import Style from '../Style/Style';
import Color from '../Style/Color';
import Size from '../Style/Size';
import str from '../LocalizedStrings/string'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from "../Screens/Landing";
import Notifications from "../Screens/Notification/Norifications";
import EShop from "../Screens/EShop/EShop";
import StoreLocations from "../Screens/StoreLocation/StoreLocations";
import MyAccount from "../Screens/MyAccount/MyAccount";


import StorefrontCircleBg from "../Component/IconComponent/StorefrontCircleBg";
import MaterialIconInBottomTab from "./MaterialIconInBottomTab";


const Tab = createBottomTabNavigator();
const Navigation = () => {
    const width= Size.wp100;
    return (
        <View style={[Style.container,{width}]}>
        <Tab.Navigator screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarLabel: '',
                tabBarActiveBackgroundColor:'#FFFFFF',
                tabBarInactiveBackgroundColor:'#FFFFFF',
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'Landing') {
                        return <MaterialIconInBottomTab name="star" focused={focused} />
                    }
                    if (route.name === 'Notifications') {
                        return <MaterialIconInBottomTab name="notifications" focused={focused} />
                    }
                    if (route.name === 'EShop') {
                        return<MaterialIconInBottomTab name="storefront" focused={focused} />
                    } 
                    if (route.name === 'StoreLocations') {
                        return <MaterialIconInBottomTab name="location-on" focused={focused} />
                    }
                    if (route.name === 'MyAccount') {
                        return <MaterialIconInBottomTab name="account-box" focused={focused} />
                    }
                    return null
                    ;
                }
            })}

        >
            <Tab.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
            <Tab.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Tab.Screen name="EShop" component={EShop} options={{ headerShown: false }} />
            <Tab.Screen name="StoreLocations" component={StoreLocations} options={{ headerShown: false }} />
            <Tab.Screen name="MyAccount" component={MyAccount} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
    );
};

export default Navigation;