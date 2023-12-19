import {Text, View} from "react-native";
import React from "react";
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';

function StoreLocationScreen() {

    const getGPSLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          const targetCoords = { latitude: 22.297258275717663, longitude: 114.17194954417593 };

          const distance = geolib.getDistance(
            { latitude, longitude },
            targetCoords
          );

          console.log(`Distance to target: ${distance} meters`);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    getGPSLocation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Store Location Screen</Text>
        </View>
    );
}

export default StoreLocationScreen;
