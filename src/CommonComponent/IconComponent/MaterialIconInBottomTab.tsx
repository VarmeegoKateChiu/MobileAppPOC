import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from "react";
import absoluteFill = StyleSheet.absoluteFill;
import Style from '../../Style/Style';
import Color from '../../Style/Color';
import Width from '../../Style/Width';
import Height from '../../Style/Height';

interface MaterialIconInBottomTabProps {
    name: string;
    focused: boolean;
}

const MaterialIconInBottomTab: React.FC<MaterialIconInBottomTabProps> = ({name, focused}) => {
    let iconColor = focused ? Color.manningsPrimaryColor : Color.grey;
    return (
        <MaterialIcons name={name} style={{paddingTop: Height.hp1 }} size={Width.wp7} color={iconColor}/>
    )
}

export default MaterialIconInBottomTab;