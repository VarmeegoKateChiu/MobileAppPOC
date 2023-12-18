import { Text, View ,StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreLocationScreen from "../Screens/StoreLocation/StoreLocationScreen";
import MyAccountScreen from "../Screens/MyAccount/MyAccountScreen";
import ManningMainWwbView from "../Screens/EShop/EShopScreen";
import PromotionScreen from "../Screens/Promotion/PromotionScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StorefrontCircleBg from "../CommonComponent/IconComponent/StorefrontCircleBg";
import MaterialIconInBottomTab from "../CommonComponent/IconComponent/MaterialIconInBottomTab";
import ShopPage from "../Screens/EShop/EShopScreen";
import NotificationScreen from "../Screens/Notification/NotificationScreen";

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
            <Tab.Screen name='Promotion' component={PromotionScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Shop" component={NotificationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="CircleTab" component={ManningMainWwbView} options={{ headerShown: false }} />
            <Tab.Screen name="Store Location" component={StoreLocationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="My Profile" component={MyAccountScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
    );
};

export default BottomTabsNav;