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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        marginRight: 10,
    },
    backButtonIcon: {
        fontSize: 24,
    },
});
const ManningMainWwbView: React.FC = () => {
    const webViewRef = useRef<WebView | null>(null);
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [sessionId, setSessionId] = useState<string>('');
    const manningSiteDomain = Config.SERVER_DOMAIN ?? '';
    const manningSiteSuffix = Config.MANNING_SITE_SUFFIX ?? '';
    const manningSiteUrl = manningSiteDomain + manningSiteSuffix;
    const [isModalVisible, setModalVisible] = useState(false);
    const isPageLoaded = useRef(false);
    const [isAnonymousUserState, setIsAnonymousUserState] = useState(false);

    // const manningUrl: string = 'https://www.mannings.com.hk';
    // const manningUrl: string = 'https://f6fa-223-197-201-128.ngrok-free.app/?site=manningsdomestichk';
    const handleNavigation = (event: WebViewNavigation) => {
        const { url } = event;
        setCurrentUrl(url);
    };

    const handleGoBack = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
        }
    };

    const shouldHideTopBar = currentUrl.startsWith(manningSiteDomain);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const handleWebViewMessage = (event: WebViewMessageEvent) => {

        console.log("run handleWebViewMessage");

        const nativeEventData = event.nativeEvent.data;
        console.log("nativeEventData: "+ nativeEventData);
        const parsedData = JSON.parse(nativeEventData);
        console.log("parsedData:", parsedData);
        const isMobileApp = parsedData.isMobileApp;
        console.log('isMobileApp Value:', isMobileApp);
        const isAnonymousUserForMobileApp = parsedData.isAnonymousUserForMobileApp;
        console.log('isAnonymousUserForMobileApp Value:', isAnonymousUserForMobileApp);
        console.log("typepppp: "+ isAnonymousUserForMobileApp.type);
        setIsAnonymousUserState(isAnonymousUserForMobileApp);

        // const data = { messageType: "webviewMessageTesting" };
        // webViewRef.current?.postMessage(JSON.stringify(data));

        // if(isPageLoaded.current == true){
        //
        //     const isMobileApp = event.nativeEvent.data;
        //     console.log('isMobileApp Value:', isMobileApp);
        // }
    };
    const handleWebViewLoadEnd = () => {

        console.log("run handleWebViewLoadEnd");
        //can put the js code in server side js
        const jsCode: string = `
            var isMobileAppValue = document.getElementById('isMobileApp').value;
            var isAnonymousUserForMobileAppValue = document.getElementById('isAnonymousUserForMobileApp').value;
            window.ReactNativeWebView.postMessage(JSON.stringify({isMobileApp: isMobileAppValue, isAnonymousUserForMobileApp: isAnonymousUserForMobileAppValue}));
          `;
        webViewRef.current?.injectJavaScript(jsCode);

    };

    const handleWebViewLoad = () =>{
        console.log("run handleWebViewLoad");
        //can put the js code in server side js
        const jsCode: string = `
            delete window.session;
          `;
        webViewRef.current?.injectJavaScript(jsCode);
    }
    useEffect(() => {



    }, [isAnonymousUserState]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                console.log("set anon to true");
                setIsAnonymousUserState(true)}}>
                <Text>fdas</Text>
            </TouchableOpacity>
            {/*go back header when redirect out of main url*/}
            {!shouldHideTopBar && (
                <View style={styles.topBar}>
                    {!shouldHideTopBar && (
                        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                            <AntDesign name="arrowleft" style={styles.backButtonIcon} />
                        </TouchableOpacity>
                    )}

                </View>
            )}
            {/*End go back header when redirect out of main url*/}
            {/*Modal pop up*/}
            {isAnonymousUserState === true &&
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Do you want to proceed?</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleModal}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            {/*End of Modal pop up*/}
            <WebView
                ref={webViewRef}
                source={{ uri: manningSiteUrl}}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigation}
                onLoadEnd={handleWebViewLoadEnd}
                onMessage={handleWebViewMessage}
                onLoad={handleWebViewLoad}
            />
        </View>
    );
};

export default ManningMainWwbView;