import {Text, View} from "react-native";
import React, {useEffect} from "react";
import messaging from '@react-native-firebase/messaging';

function NotificationPage() {
    useEffect(() => {
        // iOS permission
        async function requestPermission() {
            const authStatus = await messaging().requestPermission();
            const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                getFcmToken();
            }
        }
        requestPermission();
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const notification = remoteMessage.notification;
            console.log('message: ', notification);
        });
        return unsubscribe;
    }, []);

    async function getFcmToken() {
        try {
            const fcmToken = await messaging().getToken();
            console.log('fcmToken: ', fcmToken);
        } catch (error) {
            console.log('error in fcmtoken', error);
        }
    }

    return (

        <Text>NotificationPage page</Text>

    );
}

export default NotificationPage;
