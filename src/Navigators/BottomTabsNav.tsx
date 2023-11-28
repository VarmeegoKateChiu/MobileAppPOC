import { Text, View ,StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreLocationPage from "../Screens/BottomTabPages/StoreLocationPage";
import MyProfilePage from "../Screens/BottomTabPages/MyProfilePage";
import ManningMainWwbView from "../Screens/BottomTabPages/ShopPage";
import PromotionPage from "../Screens/BottomTabPages/PromotionPage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StorefrontCircleBg from "../IconComponent/StorefrontCircleBg";

const styles = StyleSheet.create({


  });

const Tab = createBottomTabNavigator();
const CircleTab = () => {
    return (
      <View>
        <Text>Circle Tab screen</Text>
      </View>
    );
  };
  
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
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconColor;

                    if (route.name === 'Promotion') {
                        iconName = focused ? 'promotion' : 'promotion';
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIcons name="home" size={24} color={iconColor} />
                    } else if (route.name === 'Shop') {
                        iconName = focused ? 'shop' : 'shop';
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIcons name="rocket" size={24} color={iconColor} />
                    } else if (route.name === 'Store Location') {
                        iconName = focused ? 'location-on' : 'location-on';
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIcons name="room" size={24} color={iconColor} />
                    } else if (route.name === 'My Profile') {
                        iconName = focused ? 'person' : 'person';
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIcons name="person" size={24} color={iconColor} />

                    } else if (route.name === 'CircleTab') {
                        iconName = focused ? 'CircleTab' : 'CircleTab';
                        iconColor = focused ? 'green' : '#FF8300';
                        return <StorefrontCircleBg color={iconColor}></StorefrontCircleBg>

                    }
                    return null
                    ;
                }
            })}

        >
            <Tab.Screen name='Promotion' component={PromotionPage} options={{ headerShown: false }} />
            <Tab.Screen name="Shop" component={ManningMainWwbView} options={{ headerShown: false }} />
            <Tab.Screen name="CircleTab" component={CircleTab} options={{ headerShown: false }} />
            <Tab.Screen name="Store Location" component={StoreLocationPage} options={{ headerShown: false }} />
            <Tab.Screen name="My Profile" component={MyProfilePage} options={{ headerShown: false }} />
        </Tab.Navigator>
        </View>
    );
};

export default BottomTabsNav;