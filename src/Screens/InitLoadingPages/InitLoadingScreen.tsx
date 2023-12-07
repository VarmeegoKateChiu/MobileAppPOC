import {ActivityIndicator, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import fetchGetMainSiteApi from "../../Api/ManningsApi/fetchGetMainSiteApi";
import ThemedImage from "@rneui/themed/dist/Image";
import fetchGetInitMobile from "../../Api/ManningsApi/fetchGetInitMobile";
import Config from 'react-native-config';

const InitLoadingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        console.log("InitLoadingScreen");

        const fetchData = async () => {
            console.log("InitLoadingScreen: fetch main site api");
            await fetchGetMainSiteApi();

            console.log("InitLoadingScreen: fetch get init mobile api");
            await fetchGetInitMobile();
            setIsLoading(false); // Set isLoading to false when the operation is done
        };

        try{
            void fetchData();
            console.log("navigate from InitLoadingScreen to LoginScreen")
            navigation.navigate('LoginScreen' as never);
        } catch (e) {
            console.log("wont navigate to LoginScreen due to some error");
        }



    }, []);

    return (
        <>
            <Text>InitLoadingScreen</Text>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? <ActivityIndicator size="large" color="black"/> : null}
            </View>
        </>
    );
}

export default InitLoadingScreen;