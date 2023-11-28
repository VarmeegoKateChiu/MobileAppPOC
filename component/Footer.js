import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from "./Accordion";

const Footer = () => {
    return (
        <View style={styles.container}>
            <Accordion title={'About Mannings'}/>
            <Accordion title={'accordion2'}/>
            <Accordion title={'accordion3'}/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {

        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f0f0',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default Footer;