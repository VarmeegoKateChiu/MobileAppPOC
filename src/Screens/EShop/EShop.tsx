import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {WebView, WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import CookieManager, {Cookie} from '@react-native-cookies/cookies';
import Config from "react-native-config";
import Modal from 'react-native-modal';

// interface Cookie {
//     name: string;
//     value: string;
// }

const EShop: React.FC = () => {

    const manningSiteDomain = Config.SERVER_DOMAIN ?? '';
    const manningSiteSuffix = Config.MANNING_SITE_SUFFIX ?? '';
    const manningSiteUrl = manningSiteDomain + manningSiteSuffix;


    return (
        <View >
            <WebView source={{ uri: 'https://google.com/'}} style={{ flex: 1 }} />
        </View>
    );
};

export default EShop;