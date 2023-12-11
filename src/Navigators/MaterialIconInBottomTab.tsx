import Icon from 'react-native-vector-icons/MaterialIcons';
import React from "react";
import Style from '../Style/Style';
import Color from '../Style/Color';
import Size from '../Style/Size';
import str from '../LocalizedStrings/string'

interface MaterialIconInBottomTabProps {
    name: string;
    focused: boolean;
}

const MaterialIconInBottomTab: React.FC<MaterialIconInBottomTabProps> = ({name, focused}) => {
    let iconColor = focused ? Color.manningsPrimaryColor : Color.grey;
    return (
        <Icon name={name} size={Size.wp8} color={iconColor}/>
    )
}

export default MaterialIconInBottomTab;