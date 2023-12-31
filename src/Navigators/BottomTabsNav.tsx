import { Text, View ,StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
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
    langIcon: {
        marginRight: 5,
        fontSize: 25,
    },
    langContainer: {
        flexDirection: 'row',
    },
    currentLangText: {
        paddingRight: 10,
        color: 'white',
        top: 3
    },
    langOpt: {
        color: 'white',
        marginBottom: 10,
        fontSize: 15
    },
    langDropdown: {
        backgroundColor: `#FF8300`,
        position: 'absolute',
        color: 'white',
        top: 40,
        right: 0,
        paddingRight: 5,
        zIndex: 1,
    }
});


const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
    const { width, height } = Dimensions.get("window")

    const [showLangList,setShowLangList] = useState(false);
    const [currentLang, setCurrentLang] = useState("English");
    const handleLangBtnPress = () => {
        setShowLangList(!showLangList);
    }

    const handleLangOptPress = (option) => {
        setCurrentLang(option);
        setShowLangList(false);
    }

    const RenderlangDropdown = () => {
        if(showLangList){
            return (
                <View style={styles.langDropdown}>
                  <TouchableOpacity onPress={() => handleLangOptPress('English')}>
                    <Text style={styles.langOpt}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleLangOptPress('中文')}>
                    <Text style={styles.langOpt}>中文</Text>
                  </TouchableOpacity>
                </View>
            )
        }
        return null
    }

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
                        return <MaterialIconInBottomTab name="receipt" focused={focused} />
                    } else if (route.name === 'Store Location') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return<MaterialIconInBottomTab name="room" focused={focused} />
                    } else if (route.name === 'My Account') {
                        iconColor = focused ? '#FF8300' : '#000000';
                        return <MaterialIconInBottomTab name="person" focused={focused} />
                    } else if (route.name === 'CircleTab') {
                        return <StorefrontCircleBg focused={focused}></StorefrontCircleBg>
                    }
                    return null;
                },
                headerRight: () => (
                    <View>
                    <TouchableOpacity onPress={handleLangBtnPress} style={styles.langContainer}>
                        <MaterialIcons style={styles.langIcon} name='public' color='#FFFFFF'/>
                        <Text style={styles.currentLangText}>{currentLang}</Text>
                        <RenderlangDropdown/>
                    </TouchableOpacity>
                    </View>
                ),
                headerStyle: {
                    backgroundColor: `#FF8300`,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
            })}

        >
            <Tab.Screen name='Promotion' component={PromotionScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Shop" component={NotificationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="CircleTab" component={ManningMainWwbView} options={{ headerShown: false }} />
            <Tab.Screen name="Store Location" component={StoreLocationScreen} options={{ headerShown: false }} />
            <Tab.Screen name="My Account" component={MyAccountScreen} options={{ headerShown: true }} />
        </Tab.Navigator>
        </View>
    );
};

export default BottomTabsNav;