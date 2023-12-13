import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from "react";
import absoluteFill = StyleSheet.absoluteFill;

interface MaterialIconInBottomTabProps {
    name: string;
    focused: boolean;
}

const MaterialIconInBottomTab: React.FC<MaterialIconInBottomTabProps> = ({name, focused}) => {
    let iconColor = focused ? '#FF8300' : '#FFFFFF';
    return (
        <MaterialIcons style={styles.icon} name={name} size={40} color={iconColor}/>
    )
}
const styles = StyleSheet.create({
    icon: {
        top: 5,
    }
});

export default MaterialIconInBottomTab;