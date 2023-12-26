import React,{useState, useEffect} from 'react';
import { Button, Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultipleChoice } from 'react-native-multiple-choice-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';
import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import i18n from '../../i18n';


const PreferencePageScreen = ({onClose}) =>{
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleGoBack = () => {
         navigation.goBack();
    };

    const handleLanguageSelect = (selectedItems) => {
        setSelectedLanguages(selectedItems);
    };

    useEffect(() => {

    }, []);

    const switchLanguage = (languageCode) => {
      i18n.changeLanguage(languageCode);
    };

    return(
        <>


            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Languages</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                     <Icon name="times" size={25} color="black" />
                </TouchableOpacity>

            </View>
            <Text>{t('welcome')}</Text>
            <Button  title="Switch to English"
              onPress={() => switchLanguage('en')}
            />
            <Button title="切換到中文"
              onPress={() => switchLanguage('zh')}
            />
            <View style={styles.contentContainer}>
                <ScrollView>
                    <Text style={styles.languageContent}>You will receive members communications from Mannings in the language that you selected.</Text>
                </ScrollView>
            </View>
        </>
    )
};
 const styles = StyleSheet.create({
    topBar: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topBarText: {
        color: 'black',
        fontSize: 28,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        borderRadius: 5,
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    languageContent: {
        fontSize: 16,
    }
 });
export default PreferencePageScreen;
