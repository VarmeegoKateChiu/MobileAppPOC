import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button, ActivityIndicator, Dimensions} from 'react-native';
import {WebView, WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import CookieManager, {Cookie} from '@react-native-cookies/cookies';
import Config from "react-native-config";
import Modal from 'react-native-modal';
import fetchPostMobileAutoLogin from "../../Api/ManningsApi/fetchPostMobileAutoLogin";
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import {WebViewNativeProgressEvent, WebViewProgressEvent} from "react-native-webview/lib/WebViewTypes";
import * as Animatable from 'react-native-animatable';
import Animated, {FadeInRight, FadeInLeft, SlideInRight} from 'react-native-reanimated';

// interface Cookie {
//     name: string;
//     value: string;
// }
const windowDimensionsWidth = Dimensions.get('window').width;
const windowDimensionsHeight = Dimensions.get('window').height;

interface AutoLoginApiJson {
    sessionId: string;
    loginStatus: string;
}

async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomBackButtonBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        marginTop: 'auto',
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
    const navigation = useNavigation();
    const ENCRYPTEDPASSWORD = 'encryptedPassword';
    const ENCRYPTEDUSERNAME = 'encryptedUsername';
    const [isLoading, setLoading] = useState(false);
    const [webViewHeight, setWebViewHeight] = useState(1);
    const [showWebView, setShowWebView] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
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



    const isCurrentUrlStartWithManningSiteDomain = currentUrl.startsWith(manningSiteDomain);

    const isCurrentUrlEqManningMainSite = currentUrl == manningSiteDomain || currentUrl == manningSiteDomain + manningSiteSuffix;

    const shouldHideTopBar = !isCurrentUrlEqManningMainSite || !isCurrentUrlStartWithManningSiteDomain;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const continueTimeoutSession = async () => {
        console.log("run continueTimeoutSession");
        toggleModal();
        await autoLogin();
    }

    const closeTimeoutSession = async () => {
        console.log("run closeTimeoutSession");
        await save(ENCRYPTEDPASSWORD, "");
        await save(ENCRYPTEDUSERNAME, "");
        navigation.navigate('LoginScreen' as never);
    }

    const autoLogin = async () => {
        const ENCRYPTEDPASSWORD = 'encryptedPassword';
        const ENCRYPTEDUSERNAME = 'encryptedUsername';

        let encryptedPassword = await SecureStore.getItemAsync(ENCRYPTEDPASSWORD);
        let encryptedUsername = await SecureStore.getItemAsync(ENCRYPTEDUSERNAME);
        if(typeof encryptedPassword === 'string' && typeof encryptedUsername === 'string'){
            console.log("encryptedPassword: "+ encryptedPassword);
            console.log("encryptedUsername: "+ encryptedUsername);
        } else {
            console.log("Password or username is null");
        }

        let localStoredPasswordString: string = encryptedPassword ?? '';
        let localStoredUsernameString: string = encryptedUsername ?? '';
        
        if (localStoredPasswordString.trim().length !== 0 || localStoredUsernameString.length !== 0) {
            console.log("get localStoredPasswordString: " + localStoredPasswordString);
            //do auto login
            fetchGetMainSiteApi();
            const respJson: AutoLoginApiJson = await fetchPostMobileAutoLogin(localStoredUsernameString, localStoredPasswordString);
            
            if(respJson === null) {
                console.log("respJson is null");
            }
            let sessionId = respJson.sessionId;
            let loginStatus = respJson.loginStatus;
            console.log("sessionId: "+ sessionId);
            console.log("loginStatus: "+ loginStatus);

            if (sessionId.trim().length !== 0 && loginStatus === 'success') {
                console.log("refreshed timeout session");
                if(webViewRef.current !== null){
                    webViewRef.current.reload();
                } else {
                    console.log("webViewRef.current is null");
                }

            } else {
                navigation.navigate('LoginScreen' as never);
            }
        } else {
            console.log("localStoredPasswordString is empty and no need auto login");
        }
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
        console.log("typepppp: "+ typeof isAnonymousUserForMobileApp);
        if(isAnonymousUserForMobileApp!=null){
            setIsAnonymousUserState(isAnonymousUserForMobileApp);
        }

        // const data = { messageType: "webviewMessageTesting" };
        // webViewRef.current?.postMessage(JSON.stringify(data));

        // if(isPageLoaded.current == true){
        //
        //     const isMobileApp = event.nativeEvent.data;
        //     console.log('isMobileApp Value:', isMobileApp);
        // }
    };
    const handleWebViewLoadEnd = () => {
        console.log("set isLoaded to true")
        setIsLoaded(true);
        // console.log("run handleWebViewLoadEnd");
        // //can put the js code in server side js
        // const jsCode: string = `
        //     var isMobileAppValue = document.getElementById('isMobileApp').value;
        //     var isAnonymousUserForMobileAppValue = document.getElementById('isAnonymousUserForMobileApp').value;
        //     window.ReactNativeWebView.postMessage(JSON.stringify({isMobileApp: isMobileAppValue, isAnonymousUserForMobileApp: isAnonymousUserForMobileAppValue}));
        //   `;
        // webViewRef.current?.injectJavaScript(jsCode);

    };

    const handleOnLoadProgress = (nativeEvent: WebViewNativeProgressEvent) => {
        if (nativeEvent.progress !== 1 && !isLoading) {
            console.log("hide web");
            setLoading(true);
            setWebViewHeight(0);
            setIsLoaded(false);
        } else if (nativeEvent.progress === 1) {
            console.log("show web");
            setLoading(false);
            setWebViewHeight(1);
        }
    }

    const handleWebViewLoad = () =>{
        console.log("run handleWebViewLoad");
        //can put the js code in server side js
        const jsCode: string = `
            delete window.session;
          `;
        webViewRef.current?.injectJavaScript(jsCode);
    }

    const checkFlag= () => {
        if(isAnonymousUserState) {
            toggleModal();
        }
    }
    useEffect(() => {
        checkFlag();
        console.log("cur URl: "+currentUrl);
        console.log("manningSiteDomain: "+ manningSiteDomain);
        console.log("eq?: "+ currentUrl !== 'https://www.mannings.com.hk/')
    }, [isAnonymousUserState]);
    return (
        <View style={styles.container}>
            <Text>{manningSiteUrl}</Text>
            {/*Modal pop up*/}
            {isAnonymousUserState === true &&
                <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={{ backgroundColor: 'white', padding: 20 }}>
                    <Text>Do you want to proceed?</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                        <TouchableOpacity onPress={closeTimeoutSession}>
                            <Text>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={continueTimeoutSession}>
                            <Text>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>}
            {/*End of Modal pop up*/}
            {/*start loading screen*/}
            {isLoading && (
                    <Animatable.View animation="zoomInRight" style={{ backgroundColor:'#dedede', height:windowDimensionsHeight, width:windowDimensionsWidth}} >

                             <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }}>
                                <ActivityIndicator
                                    color="#009688"
                                    size="large"
                                />

                             </View>

                    </Animatable.View>
            )}
            {/*end loading screen*/}
                <WebView
                    ref={webViewRef}
                    source={{ uri: manningSiteUrl}}
                    style={{ flex: webViewHeight }}
                    onNavigationStateChange={handleNavigation}
                    onLoadEnd={handleWebViewLoadEnd}
                    onMessage={handleWebViewMessage}
                    onLoad={handleWebViewLoad}
                    onLoadProgress={({ nativeEvent }) => handleOnLoadProgress(nativeEvent)}
                    setSupportMultipleWindows={false}
                    sharedCookiesEnabled={true}
                />
            {/*start back button bar*/}
            {/*not manning main site or start with manning main site*/}
            {/*Remark: if want loading page have back button bar , use (currentUrl != manningSiteDomain || !shouldHideTopBar )*/}
            {/*if want loading page dont have back button barm use (currentUrl != manningSiteDomain || !shouldHideTopBar ) &&  isLoaded */}
            {(shouldHideTopBar) && (
                <View style={styles.bottomBackButtonBar}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <AntDesign name="arrowleft" style={styles.backButtonIcon} />
                    </TouchableOpacity>
                </View>
            )}
            {/*end back button bar*/}
        </View>
    );
};

export default ManningMainWwbView;