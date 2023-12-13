import {Text, View, TouchableOpacity, ScrollView, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {color} from "@rneui/base";
import absoluteFill = StyleSheet.absoluteFill;
import LoginTextInput from "../../CommonComponent/LoginTextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import fetchPostMobileLoginApi from "../../Api/ManningsApi/fetchPostMobileLoginApi";
import Config from 'react-native-config';
import {useNavigation} from "@react-navigation/native";

function MyAccountScreen() {

    const [responseData, setResponseData] = useState("");
    const [responseMainSiteData, setResponseMainSiteData] = useState("");
    const [counter, setCounter] = useState(0);
    const [userAccount, setUserAccount] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userInputFindPassword, setUserInputFindPassword] = useState("");
    const [showPassword, setShowPassword] = useState("this is password to be shown");
    const navigation = useNavigation();

    //local dev use ngrok for now
    const apiPrefix: string = 'https://f6fa-223-197-201-128.ngrok-free.app'

    const manningSite: string = apiPrefix + '/?site=manningsdomestichk';
    const mobileTesting: string = apiPrefix + '/api/mobile/testing';
    const userLogin: string = apiPrefix + '/api/mobile/userLogin';
    const testLogin: string = apiPrefix + '/mobile/login';

    const handleInputChange = (name: string, value: string) => {
        if (name === "userAccount") {
            setUserAccount(value);
        } else if (name === "userPassword") {
            setUserPassword(value);
        } else if (name === "userInputFindPassword") {
            setUserInputFindPassword(value);
        }

    };
    const getUserInput = () => {
        //set userAccount and pw here
        console.log("start getUserInput");
        console.log("userAccount:", userAccount);
        console.log("userPassword:", userPassword);
    }

    const submitLoginData = () => {
        console.log("start getUserInput");
        console.log("userInputAccount:", userAccount);
        console.log("userInputPassword:", userPassword);
        storePassword().then(fetchData);

    }

    const fetchData = async () => {
        console.log('run fetch data');
        try {
            const response = await fetch(manningSite, {
                method: "GET",
            });
            if (response.status === 200) {
                console.log("success fetch manning main site to get session");
            } else {
                console.log("fail fetch manning main site to get session");
            }
            const respJson = await response.json();
            console.log(respJson);
            setResponseMainSiteData(respJson);
        } catch (error) {

            console.log("fail fetching api: " + manningSite);

        }


        try {
            const response = await fetch(mobileTesting, {
                method: "GET",
            });
            if (response.status === 200) {
                console.log("success fetch manning main site to get session");
            } else {
                console.log("fail fetch manning main site to get session");
            }


            const respJson = await response.json();
            console.log(respJson);
            setResponseData(respJson);

        } catch (error) {

            console.log("fail fetching api: " + manningSite);

        }


        try {
            const response = await fetch(userLogin, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    j_username: userAccount,
                    j_password: userPassword,
                }),
            });
            if (response.status === 200) {
                console.log("success fetch userLogin api");
            } else {
                console.log("fail fetch userLogin api");
            }


            const respJson = await response.json();
            console.log(respJson);
            setResponseData(respJson);

        } catch (error) {

            console.log("fail fetching api: " + userLogin);

        }

        //////

    };

    const storePassword = async () => {
        try {
            console.log("run storePassword");
            console.log("userAccount: " + userAccount);
            console.log("userPassword: " + userPassword);
            await AsyncStorage.setItem(
                userAccount,
                userPassword,
            )
        } catch (error) {
            // Error saving data
            console.log("fail run storePassword");
        }
    };

    const getPasswordByUserAccount = async () => {

        try {
            console.log("userInputFindPassword: " + userInputFindPassword);

            const value: string | null = await AsyncStorage.getItem(userInputFindPassword);
                console.log("value: " + value);
                if(value === null){
                    setShowPassword("cannot find password by input account");
                } else {
                    setShowPassword(value);
                }

        } catch (error) {
            // Error saving data
            console.log("fail run getData")
        }

    }

    const loginTesting = async () => {
        console.log("do login");
        fetchGetMainSiteApi();
        fetchPostMobileLoginApi(userAccount, userPassword);
    }

    const navToLoginScreen = () => {
        navigation.navigate('LoginScreen' as never);
    }

    useEffect(() => {


    }, []);


    const isFrom = Config.APP_CONFIG ?? '';
    return (
        <>
            <ScrollView>

                <Text>My profile Screen </Text>

                <View>
                    <LoginTextInput name="userAccount" onInputChange={handleInputChange}></LoginTextInput>
                    <LoginTextInput name="userPassword" onInputChange={handleInputChange}></LoginTextInput>
                </View>
                <TouchableOpacity onPress={submitLoginData}>
                    <Text style={{backgroundColor: "blue"}}>submit login button</Text>
                </TouchableOpacity>


                {/*<View>*/}
                {/*    <Text>Call main site</Text>*/}
                {/*    {responseData && (*/}
                {/*        <View>*/}
                {/*            <Text>Response Data:</Text>*/}
                {/*            <Text>{JSON.stringify(responseMainSiteData)}</Text>*/}
                {/*        </View>*/}
                {/*    )}*/}
                {/*    <Text>Call testing api</Text>*/}
                {/*    {responseData && (*/}
                {/*        <View>*/}
                {/*            <Text>Response Data:</Text>*/}
                {/*            <Text>{JSON.stringify(responseData)}</Text>*/}
                {/*        </View>*/}
                {/*    )}*/}

                {/*</View>*/}
                <View>
                    <Text>test get data in local</Text>
                    <LoginTextInput name="userInputFindPassword" onInputChange={handleInputChange}></LoginTextInput>


                    <TouchableOpacity onPress={getPasswordByUserAccount}>
                        <Text style={{backgroundColor: "green"}}>getPasswordButton</Text>
                    </TouchableOpacity>

                    <Text>show stored password: {showPassword}</Text>
                </View>
            </ScrollView>
            {/*<StoreKeyValueLocalTest></StoreKeyValueLocalTest>*/}


            <Text>I am from {isFrom}</Text>
            <Text>Login testing</Text>

            <TouchableOpacity onPress={loginTesting}>
                <Text style={{backgroundColor: "red"}}>submit login button</Text>
            </TouchableOpacity>

            <Text>test react native config</Text>
            <TouchableOpacity onPress={navToLoginScreen}>
                <Text style={{backgroundColor: "red"}}>go login page</Text>
            </TouchableOpacity>
        </>
    );
}

export default MyAccountScreen;