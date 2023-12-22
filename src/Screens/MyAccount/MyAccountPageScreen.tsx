import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const MyAccountPageScreen = () =>{
   const navigation = useNavigation();

   const handleGoBack = () => {
        navigation.goBack();
   };
   const navToPreferenceScreen = () => {
        console.log("navigating to PreferencePageScreen");
        navigation.navigate('PreferencePageScreen' as never);
   };

        return(
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 10 }}>
                    <TouchableOpacity onPress={handleGoBack}>
                        <Text style={{ backgroundColor: "red" }}>Go Back</Text>
                    </TouchableOpacity>

                <Text>My Account Page Screen</Text>

                <TouchableOpacity onPress={navToPreferenceScreen}>
                    <Text style={{ backgroundColor: "orange" }}>Go to preference page</Text>
                </TouchableOpacity>
                </ScrollView>

            </View>

        );
};
export default MyAccountPageScreen;