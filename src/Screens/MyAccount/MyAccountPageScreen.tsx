import React, { useEffect,useState } from 'react';
import { BackHandler ,Text, Modal, View, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PreferencePageScreen from "../MyAccount/PreferencePageScreen";

const MyAccountPageScreen = () => {
   const navigation = useNavigation();
   const windowHeight = Dimensions.get('window').height;
   const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

   const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
   };

   const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
   };

   const handleGoBack = () => {
        navigation.goBack();
   };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Text style={{ backgroundColor: "red" }}>Go Back</Text>
                </TouchableOpacity>

                <Text>My Account Page Screen</Text>

                <TouchableOpacity onPress={handleOpenBottomSheet}>
                    <Text style={{ backgroundColor: "orange" }}>Go to preference page</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isBottomSheetOpen}
                onRequestCLose={handleCloseBottomSheet}
            >
                <View style={styles.myAccountScreenContainer}>
                    <ScrollView style={styles.preferenceScreenContent}>
                        <PreferencePageScreen onClose={handleCloseBottomSheet}/>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
       myAccountScreenContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        preferenceScreenContent: {
            maxHeight: Dimensions.get('window').height * 0.4,
            backgroundColor: 'white',
            borderTopLeftRadius: 17,
            borderTopRightRadius: 17,
        },
});

export default MyAccountPageScreen;
