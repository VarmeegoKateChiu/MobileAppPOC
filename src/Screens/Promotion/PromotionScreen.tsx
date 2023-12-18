import {ActivityIndicator, Text, View} from "react-native";
import React from "react";
import {WebView} from "react-native-webview";

function PromotionScreen() {
    return (


        <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }}>
                <ActivityIndicator color="#009688" size="large" />
            </View>
            <WebView
                source={{ uri: "https://www.mannings.com.hk/" }}
                style={{ flex: 0}} // Adjust marginTop as needed
            />
        </View>
    );
}

export default PromotionScreen;