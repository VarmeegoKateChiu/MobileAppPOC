import {Text, View, Image, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import React, {useEffect, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import fetchPostMobileLoginApi from "../../Api/ManningsApi/fetchPostMobileLoginApi";
import Config from 'react-native-config';
import {useNavigation} from "@react-navigation/native";
import HeaderNav from "../../Navigators/HeaderNav"
import {UserProvider, UserContext} from "../../Context/UserContext"
import { SvgXml } from 'react-native-svg';
import LogoutImg from '../../../images/myaccount-logout.svg';
import CouponImg from '../../../images/myaccount-mycoupons.svg';
import NotiImg from '../../../images/myaccount-notification.svg';
import WishlistImg from '../../../images/myaccount-wishlists.svg';
import OrderImg from '../../../images/myaccount-orders.svg';
import PreferenceImg from '../../../images/myaccount-contactpreference.svg';
import ReturnImg from '../../../images/myaccount-returns.svg';
import PaymentImg from '../../../images/myaccount-paymentdetails.svg';
import PersonalImg from '../../../images/myaccount-updateprofile.svg';
import LockImg from '../../../images/myaccount-updatepassword.svg';
import AddressImg from '../../../images/myaccount-addressbook.svg';
import MapImg from '../../../images/myaccount-map.svg';

function MyAccountScreen() {

    const [userDisplayName,setUserDisplayName] = useContext(UserContext);

    const navigation = useNavigation();

    const navToLoginScreen = () => {
        navigation.navigate('LoginScreen' as never);
    }


    return (
            <ScrollView style={styles.container}>
                <Text style={styles.myAccHeader}>My Account</Text>
                <Text style={styles.greeting}>Hello, {userDisplayName}.</Text>
                <Text style={styles.NavTitle}>Manage Account</Text>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={PersonalImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Personal Details</Text>
                            <Text style={styles.itemDesc}>Smooth checkout. Fill in name, email, phone and birthday</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={AddressImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Delivery Address</Text>
                            <Text style={styles.itemDesc}>Add your delivery address for prompt shipping</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={OrderImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Order History</Text>
                            <Text style={styles.itemDesc}>Your order history is a comprehensive record of your past purchases and transactions with us</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={ReturnImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Returns</Text>
                            <Text style={styles.itemDesc}>Our hassle-free return policy ensures a seamless shopping experience</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={PaymentImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Payment Details</Text>
                            <Text style={styles.itemDesc}>Manage your credit card information for easy checkout</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={NotiImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Notifications</Text>
                            <Text style={styles.itemDesc}>Track orders, enjoy deals with our convenient notification center</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={CouponImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>My eCoupons</Text>
                            <Text style={styles.itemDesc}>Enjoy discounts on your favourite items with our exclusive eCoupons</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={WishlistImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Wishlist</Text>
                            <Text style={styles.itemDesc}>Stay organized and never forget products you love</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={MapImg} width={30} height={30} color={`#FF8300`}/>
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Store Locator</Text>
                            <Text style={styles.itemDesc}>Use our store locator to find the closest retail Mannings store</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={PreferenceImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Preference</Text>
                            <Text style={styles.itemDesc}>Customize your experience with personalized preferences and recommendations</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={styles.NavTitle}>Security</Text>
                <View style={styles.itemsContainer}>
                    <TouchableOpacity style={[styles.itemContainer, styles.itemBorder]}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={LockImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Update Password</Text>
                            <Text style={styles.itemDesc}>Easily update your password for a more secure shopping experience</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navToLoginScreen} style={styles.itemContainer}>
                        <View style={styles.itemLogo}>
                            <SvgXml xml={LogoutImg} width={30} height={30} />
                        </View>
                        <View style={styles.itemTextContainer}>
                            <Text style={styles.itemName}>Sign Out</Text>
                            <Text style={styles.itemDesc}>Sign out securely and come back soon for more shopping</Text>
                        </View>
                        <View>
                            <Image source={require('../../../images/icon-arrow-category-tile.png')} style={styles.arrowLogo} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `#EEEEEE`,
        paddingLeft: 15,
        paddingRight: 15,
    },
    myAccHeader: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    greeting: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17,
        marginBottom: 20
    },
    NavTitle: {
        fontWeight: 'bold',
        color: `#FF8300`,
        fontSize: 17,
        marginBottom: 10
    },
    itemsContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        flexDirection: 'column',
        marginBottom: 20,
        paddingBottom: 15
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
    },
    itemTextContainer: {
            flex: 1,
            flexDirection: 'column',
            paddingBottom: 20,
    },
    itemName: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
    },
    itemDesc: {
        fontWeight: 'normal',
        color: `#808080`,
        marginTop: 7,
    },
    itemLogo: {
        margin: 7
    },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    arrowLogo: {
        width: 10,
        height: 10,
        tintColor: '#808080',
        marginTop: 30,
        marginRight: 10,
        marginLeft: 20
    },
})

export default MyAccountScreen;