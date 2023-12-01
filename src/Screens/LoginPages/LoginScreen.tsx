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
    const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(undefined);
    const navigation = useNavigation();
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const ENCRYPTEDPASSWORD = 'encryptedPassword';
    const USERNAME = 'username';

    const autoLogin = async () => {
        let testingPassword = await SecureStore.getItemAsync(ENCRYPTEDPASSWORD);
        let testingUsername = await SecureStore.getItemAsync(USERNAME);
        if(typeof testingPassword === 'string'){
            console.log("testing result: "+ testingPassword);
            console.log("testing result: "+ testingUsername);
        } else {
            console.log("testingPassword is null");
        }

        let localStoredPasswordString: string | null = testingPassword ?? '';
        let localStoredUsernameString: string | null = testingUsername ?? '';
        // getValueFor(ENCRYPTEDPASSWORD)
        //     .then((result) => result ? localStoredPasswordString = result : localStoredPasswordString = null)
        //     .catch((error) => {
        //         console.log('Error occurred:', error);
        //         return null;
        //     });

        if (localStoredPasswordString.trim().length !== 0 || localStoredUsernameString.length !== 0) {
            console.log("get localStoredPasswordString: " + localStoredPasswordString);
            //do auto login
            fetchGetMainSiteApi();
            const respJsonString: string = await fetchPostMobileLoginApi(localStoredUsernameString, localStoredPasswordString);
            let sessionId: string = '';
            if (respJsonString != null) {
                const jsonObject: LoginApiJson = JSON.parse(respJsonString);
                sessionId = jsonObject.sessionId;
            } else {
                console.log("respJsonString is null");
            }
            console.log("sessionId from LoginScreen: " + sessionId);
            if (sessionId.trim().length !== 0) {
                navigation.navigate('MainScreen' as never);
            } else {
                // Handle login error
                //nothing handle, cuz will show login fail if loginSusses is false
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
            const respJsonString: string = await fetchPostMobileLoginApi(username, password);
            console.log("respJsonString: " + respJsonString);
            let sessionId: string = '';
            if (respJsonString != null) {
                const jsonObject: LoginApiJson = JSON.parse(respJsonString);
                sessionId = jsonObject.sessionId;
            } else {
                console.log("respJsonString is null");
            }
            console.log("sessionId from LoginScreen: " + sessionId);
            //if have sessionId, thats mean it login already
            if (sessionId.trim().length !== 0) {
                setLoginStatus('loginSuccess')
                console.log("saveing encryped password");
                await save(ENCRYPTEDPASSWORD, password);
                await save(USERNAME, username);
            } else {
                setLoginStatus('loginFail');
            }
            if (sessionId.trim().length !== 0) {
                navigation.navigate('MainScreen' as never);
            } else {
                // Handle login error
                //nothing handle, cuz will show login fail if loginSusses is false
            }
        }

    };

    const resetLocalStorageUserNamePassword = async () => {
        console.log("reset username and password to emp in local storage");
        await save(ENCRYPTEDPASSWORD, '');
        await save(USERNAME, '');
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