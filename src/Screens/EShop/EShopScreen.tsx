import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {WebView, WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import CookieManager, {Cookie} from '@react-native-cookies/cookies';
import Config from "react-native-config";
import Modal from 'react-native-modal';
import fetchPostMobileAutoLogin from "../../Api/ManningsApi/fetchPostMobileAutoLogin";
import * as SecureStore from 'expo-secure-store';
import {useNavigation} from '@react-navigation/native';
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";


// interface Cookie {
//     name: string;
//     value: string;
// }
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
    const navigation = useNavigation();
    const ENCRYPTEDPASSWORD = 'encryptedPassword';
    const ENCRYPTEDUSERNAME = 'encryptedUsername';

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
                webViewRef.current.reload();
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

        // console.log("run handleWebViewLoadEnd");
        // //can put the js code in server side js
        // const jsCode: string = `
        //     var isMobileAppValue = document.getElementById('isMobileApp').value;
        //     var isAnonymousUserForMobileAppValue = document.getElementById('isAnonymousUserForMobileApp').value;
        //     window.ReactNativeWebView.postMessage(JSON.stringify({isMobileApp: isMobileAppValue, isAnonymousUserForMobileApp: isAnonymousUserForMobileAppValue}));
        //   `;
        // webViewRef.current?.injectJavaScript(jsCode);

    };

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


    }, [isAnonymousUserState]);
    return (
        <View style={styles.container}>
            <Text>{manningSiteUrl}</Text>
            {/*<TouchableOpacity onPress={() => {*/}
            {/*    console.log("set anon to true");*/}
            {/*    setIsAnonymousUserState(true)}}>*/}
            {/*    <Text>fdas</Text>*/}
            {/*</TouchableOpacity>*/}
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