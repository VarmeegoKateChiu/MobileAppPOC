import React, {useEffect, useState,} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView, Image, ImageBackground, TouchableOpacity, Alert, TextInput, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../Style/Style';
import Color from '../Style/Color';
import Size from '../Style/Size';
import str from '../LocalizedStrings/string'

function Landing() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={Style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#FF8300"/>
            <ScrollView contentContainerStyle={Style.scrollSize}>
                <View style={[Style.container, Style.globalMargin]}>
                    <Text>{str.landingTitle}</Text>
                </View>
                <View style={[Style.container, Style.globalMargin]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('MainScreen' as never); }}>
                        <Text style={Style.primaryButton}>{str.login}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[Style.container, Style.globalMargin]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen' as never); }}>
                        <Text style={Style.secondButton}>{str.logout}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[Style.container, Style.globalMargin]}>
                    <TouchableOpacity>
                        <Text style={Style.disableButton}>{str.logout}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Landing;