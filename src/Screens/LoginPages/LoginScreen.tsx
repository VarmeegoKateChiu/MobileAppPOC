import React, {useEffect, useState} from 'react';
import {View, Button, TextInput, StyleSheet, ImageBackground, Text} from 'react-native';
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
        <View style={styles.container}>
            <ImageBackground source={require('../../../images/LoginPageBgImg.png')} resizeMode="cover"
                             style={styles.bgImage}>
                <View style={styles.loginContainer}>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button title="Login" onPress={handleLogin}/>
                    <View>
                        {/*login fail warning message*/}
                        {loginStatus === 'loginFail' && (
                            <View style={styles.warningContainer}>
                                <Text style={styles.warningText}>Login failed. Please try again.</Text>
                            </View>
                        )}
                        {/*login success message  | (may don't need it)*/}
                        {loginStatus === 'loginSuccess' && <Text>Login successful</Text>}
                        {loginStatus === 'empty' && (
                            <View style={styles.warningContainer}>
                                <Text style={styles.warningText}>UserName or password is empty. Please try again.</Text>
                            </View>
                        )}
                    </View>
                    <Text>react native config test</Text>

                    <Text>ENVIRONMENT: {testingEnv}</Text>
                    <Button title={"Main page"} onPress={() => {
                        navigation.navigate('MainScreen' as never);
                    }}></Button>
                    <Button title={"resetLocalStorage"} onPress={
                        resetLocalStorageUserNamePassword
                    }></Button>

                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    textInput: {
        width: 200,
        borderRadius: 10,
        borderColor: 'grey',
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 20
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        top: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningContainer: {},
    warningText: {
        color: 'red',
    }
});

export default LoginScreen;