import {Text, View} from "react-native";
import React from "react";
import Config from "react-native-config";
import MapView ,{ PROVIDER_GOOGLE } from 'react-native-maps';


function StoreLocations() {
    const googleMapAPI = Config.MANNINGS_GOOGLEAPIKEY_DOMESTIC ??'';
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{googleMapAPI}</Text>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

export default StoreLocations;