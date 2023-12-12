import { Text, View ,StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreLocationPage from "../Screens/BottomTabPages/StoreLocationPage";
import MyProfilePage from "../Screens/BottomTabPages/MyProfilePage";
import ManningMainWwbView from "../Screens/BottomTabPages/ShopPage";
import PromotionPage from "../Screens/BottomTabPages/PromotionPage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StorefrontCircleBg from "../IconComponent/StorefrontCircleBg";
import MaterialIconInBottomTab from "../IconComponent/MaterialIconInBottomTab";
import ShopPage from "../Screens/BottomTabPages/ShopPage";
import NotificationPage from "../Screens/BottomTabPages/NorificationPage";

const styles = StyleSheet.create({


  });

const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
    const { width, height } = Dimensions.get("window")
    return (
        <View style={{
            width,
            height,
            flex: 1,
        }}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarLabel: '',
                tabBarActiveBackgroundColor:'#FFFFFF',
                tabBarInactiveBackgroundColor:'#FF8300',
                tabBarIcon: ({ focused }) => {
                    let iconColor;

                    if (route.name === 'Promotion') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIconInBottomTab name="receipt" focused={focused} />
                    } else if (route.name === 'Shop') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIconInBottomTab name="notifications" focused={focused} />
                    } else if (route.name === 'Store Location') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return<MaterialIconInBottomTab name="room" focused={focused} />
                    } else if (route.name === 'My Profile') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIconInBottomTab name="person" focused={focused} />
                    } else if (route.name === 'CircleTab') {
                        return <StorefrontCircleBg focused={focused}></StorefrontCircleBg>
                    }
                    return null
                    ;
                }
            })}

        >
            <Tab.Screen name='Promotion' component={PromotionPage} options={{ headerShown: false }} />
            <Tab.Screen name="Shop" component={NotificationPage} options={{ headerShown: false }} />
            <Tab.Screen name="CircleTab" component={ManningMainWwbView} options={{ headerShown: false }} />
            <Tab.Screen name="Store Location" component={StoreLocationPage} options={{ headerShown: false }} />
            <Tab.Screen name="My Profile" component={MyProfilePage} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
    );
};

export default BottomTabsNav;