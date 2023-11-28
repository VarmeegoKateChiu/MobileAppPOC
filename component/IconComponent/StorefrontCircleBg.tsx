import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import {StyleSheet} from "react-native";
import absoluteFill = StyleSheet.absoluteFill;


const styles = StyleSheet.create({
    circleIcon: {
        position: "absolute",
        bottom: 10,
        height: 80,
    },
    storefrontIcon: {
        position: "absolute",
        bottom: 10,
        height: 80,
    },
});

const StorefrontCircleBg = (props: any) => {
    return(
        <>
            <MaterialIcons style={styles.circleIcon} name="circle" size={80} color={props.color} />
            <MaterialIcons style={styles.storefrontIcon} name="storefront" size={80} color={'white'} />
        </>
    )
}

export default StorefrontCircleBg;