import React, {useEffect, useState,} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView, Image, ImageBackground, TouchableOpacity, Alert, TextInput, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../../Style/style';
import Color from '../../Style/Color';
import Size from '../../Style/Size';
import str from '../../LocalizedStrings/string'

import {useNavigation} from '@react-navigation/native';
import fetchPostMobileLoginApi from "../../Api/ManningsApi/fetchPostMobileLoginApi";
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import Config from "react-native-config";
import * as SecureStore from 'expo-secure-store';
import fetchPostMobileAutoLogin from "../../Api/ManningsApi/fetchPostMobileAutoLogin";

interface LoginApiJson {
    sessionId: string;
    password: string;
    loginStatus: string;
    username: string;
}

interface AutoLoginApiJson {
    sessionId: string;
    loginStatus: string;
}

async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        console.log("🔐 Here's your value 🔐 \n" + result);

    } else {
        console.log('No values stored under that key.');
    }
    return result;
}

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [loginStatus, setLoginStatus] = useState('');
    const ENCRYPTEDPASSWORD = 'encryptedPassword';
    const ENCRYPTEDUSERNAME = 'encryptedUsername';

    const autoLogin = async () => {
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
                navigation.navigate('MainScreen' as never);
            } else {
                // Handle login error
                // Handle login error
                // nothing handle, stay at loginPage to let user login again
                // very few change to happen since user use this password login success before
            }
        } else {
            console.log("localStoredPasswordString is empty and no need auto login");
        }
    }

    const handleLogin = async () => {
        //run user login flow
        //if userName Password is empty, show empty message
        if (username.trim() === '' || password.trim() === '') {
            console.log("input empty");
            setLoginStatus('empty');
        } else {
            console.log("do login");
            // Simulate login success
            fetchGetMainSiteApi();
            const respJson: LoginApiJson = await fetchPostMobileLoginApi(username, password);
            console.log("sessionId: "+ respJson.sessionId);
            console.log("loginStatus: "+ respJson.loginStatus);
            let sessionId = respJson.sessionId;
            let loginStatus = respJson.loginStatus;
            //if have sessionId, thats mean it login already
            if (sessionId.trim().length !== 0 && loginStatus==='success') {
                setLoginStatus('loginSuccess')
                console.log("saveing encryped password");
                let encryptedPassword = respJson.password;
                let encryptedUsername = respJson.username;
                console.log("encrypted pw: "+ encryptedPassword);
                console.log("encrypted username: "+ encryptedUsername);

                await save(ENCRYPTEDPASSWORD, encryptedPassword);
                await save(ENCRYPTEDUSERNAME, encryptedUsername);
            } else {
                console.log('login fail');
                setLoginStatus('loginFail');
            }
            //if login success, navigate to MainScreen
            if (sessionId.trim().length !== 0) {
                console.log("navigating to mainScreen");
                navigation.navigate('MainScreen' as never);
            }
        }

    };

    const resetLocalStorageUserNamePassword = async () => {
        console.log("reset username and password to emp in local storage");
        await save(ENCRYPTEDPASSWORD, '');
        await save(ENCRYPTEDUSERNAME, '');
    }

    const handleShowConfig = () => {
        const appConfig = Config.APP_CONFIG ?? '';
        const manningUrl = Config.MANNING_SITE_URL ?? '';

        console.log("appConfig: " + appConfig);
        console.log("manningUrl: " + manningUrl);

    }

    useEffect(() => {
        console.log("run LoginScreen");
        autoLogin();
    }, []);

    //react native config test
    const testingEnv = Config.APP_CONFIG ?? '';
    return (
        <SafeAreaView style={Style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF8300"/>
            <ScrollView contentContainerStyle={Style.scrollSize}>
                <View style={Style.container}>
                    <TouchableOpacity onPress={() => { navigation.navigate('MainScreen' as never); }}>
                        <Text style={Style.primaryButton}>{str.login}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



export default LoginScreen;