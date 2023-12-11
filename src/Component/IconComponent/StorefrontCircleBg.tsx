import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {StyleSheet, View} from "react-native";
import absoluteFill = StyleSheet.absoluteFill;
// import HideWithKeyboard from 'react-native-hide-with-keyboard';

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        width: 100,
        height: 100,
        bottom: -30,

    },
    bgCircle: {
        zIndex: 1
    },
    outerCircle: {
        zIndex: 2,
        marginLeft: 10,
        marginTop: 10
    },
    innerCircle: {
        zIndex: 3,
        marginLeft: 20,
        marginTop: 20
    },
    storefrontIcon: {
        zIndex: 4,
        marginLeft: 30,
        marginTop: 30
    }
});

const StorefrontCircleBg = (props: any) => {
    let bgCircleColor = props.focused ? '#FFFFFF' : '#FF8300';
    let outerCircleColor = props.focused ? '#FF8300' : '#FFFFFF';
    let innerCircleColor = props.focused ? '#FFFFFF' : '#FF8300';
    let storeFrontsColor = props.focused ? '#FF8300' : '#FFFFFF';
    return (
        <>
            <View style={styles.container}>
                {/*<HideWithKeyboard>*/}
                    <MaterialIcons style={[styles.bgCircle, absoluteFill]} name="circle" size={100}
                                   color={bgCircleColor}/>
                    <MaterialIcons style={[styles.outerCircle, absoluteFill]} name="circle" size={80}
                                   color={outerCircleColor}/>
                    <MaterialIcons style={[styles.innerCircle, absoluteFill]} name="circle" size={60}
                                   color={innerCircleColor}/>
                    <MaterialIcons style={[styles.storefrontIcon, absoluteFill]} name="storefront" size={40}
                                   color={storeFrontsColor}/>
                {/*</HideWithKeyboard>*/}
            </View>
        </>
    )
}

export default StorefrontCircleBg;