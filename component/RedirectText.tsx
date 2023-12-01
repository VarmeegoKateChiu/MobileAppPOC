import React from 'react';
import { Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface RedirectTextProps {
    text: string;
    destination: string;
}

const RedirectText: React.FC<RedirectTextProps> = ({ text, destination }) => {
    const navigation = useNavigation();

    const handleRedirect = () => {
        navigation.navigate(destination as never);
    };

    return (
        <>
            <TouchableOpacity onPress={handleRedirect}>
                <Text>{text}</Text>
            </TouchableOpacity>

        </>
    );
};

export default RedirectText;