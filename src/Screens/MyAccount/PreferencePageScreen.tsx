import React,{useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultipleChoice } from 'react-native-multiple-choice-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';



const PreferencePageScreen = () =>{
    const navigation = useNavigation();
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleGoBack = () => {
         navigation.goBack();
    };

    const handleLanguageSelect = (selectedItems) => {
        setSelectedLanguages(selectedItems);
    };

    return(
        <>


            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="chevron-left" size={20} color="white" style={{ right: 100 }} />
                </TouchableOpacity>
                <Text style={styles.topBarText}>Preference Screen</Text>
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Languages</Text>
            </ScrollView>
        </>
    )
};
        const styles = StyleSheet.create({
            topBar: {
                backgroundColor: '#FF8300',
                padding: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            topBarText: {
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
            },
        });
export default PreferencePageScreen;