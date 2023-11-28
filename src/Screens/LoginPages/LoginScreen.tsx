import React, {useEffect, useState} from 'react';
import {View, Button, TextInput, StyleSheet, ImageBackground, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import fetchPostMobileLoginApi from "../../Api/ManningsApi/fetchPostMobileLoginApi";
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import Config from "react-native-config";

interface LoginApiJson {
    sessionId: string;
}
const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState<boolean | undefined>(undefined);
    const navigation = useNavigation();
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [loginStatus, setLoginStatus] = useState('');
    const [counter, setCounter] = useState(0);
    const handleLogin = async () => {
        //if userName Password is empty, show empty message
        if(username.trim() === '' || password.trim() === '') {
            console.log("input empty");
            setLoginStatus('empty');
        } else {
            console.log("do login");
            // Simulate login success
            fetchGetMainSiteApi();
            const respJsonString: string = await fetchPostMobileLoginApi(username, password);
            console.log("respJsonString: " + respJsonString);
            let sessionId:string = '';
            if(respJsonString != null) {
                const jsonObject: LoginApiJson = JSON.parse(respJsonString);
                sessionId =jsonObject.sessionId;
            } else {
                console.log("respJsonString is null");
            }
            console.log("sessionId from LoginScreen: "+ sessionId);
            //if have sessionId, thats mean it login already
            if (sessionId.trim().length !== 0) {
                setLoginStatus('loginSuccess')
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

    const handleShowConfig = () => {
        const appConfig = Config.APP_CONFIG ?? '';
        const manningUrl = Config.MANNING_SITE_URL ?? '';

        console.log("appConfig: " + appConfig);
        console.log("manningUrl: " + manningUrl);

    }

    const counterIncrement = () => {
        console.log("current: "+ counter);
        setCounter(counter+1);


    }

    useEffect(() => {
   console.log("run effect");
        console.log("late: "+ counter);
    }, [counter]);

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
                    <Button title={"testingCounter"} onPress={counterIncrement}></Button>
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