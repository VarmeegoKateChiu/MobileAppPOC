import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import CookieManager, {Cookie} from '@react-native-cookies/cookies';
import Config from "react-native-config";

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

    //remark : cookies manager only for ios only
    // useEffect(() => {
    //     const getSessionId = async () => {
    //         const {cookies} = await CookieManager.getAll();
    //         const cookieArray: Cookie[] = Object.values(cookies);
    //         const sessionIdCookie = cookieArray.find((cookie: Cookie) => cookie.name === "sessionId");
    //
    //         if (sessionIdCookie) {
    //             const sessionId = sessionIdCookie.value;
    //             console.log("Session ID:", sessionId);
    //             // Do something with the session ID
    //         }
    //     };
    //
    //     getSessionId();
    // }, []);
    const getSessionId = async () => {
        const cookies = await CookieManager.get(manningSiteUrl, true);

        if (cookies && cookies['sessionId']) {
            const sessionId = cookies['sessionId'];
            setSessionId(sessionId.value);
            // Do something with the session ID
        }
    };
    useEffect(() => {

    }, []);
    return (
        <View style={styles.container}>
            {!shouldHideTopBar && (
                <View style={styles.topBar}>
                    {!shouldHideTopBar && (
                        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                            <AntDesign name="arrowleft" style={styles.backButtonIcon} />
                        </TouchableOpacity>
                    )}

                </View>
            )}
            <WebView
                ref={webViewRef}
                source={{ uri: manningSiteUrl}}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigation}
            />
        </View>
    );
};

export default ManningMainWwbView;