import React,{useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultipleChoice } from 'react-native-multiple-choice-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';
import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import i18n from '../../i18n';


const PreferencePageScreen = () =>{
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
    const locale = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(locale);
  }, []);

    return(
        <>


            <View style={styles.topBar}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="chevron-left" size={20} color="white" style={{ right: 100 }} />
                </TouchableOpacity>
                <Text style={styles.topBarText}>Preference Screen</Text>
            </View>
            <Text>{t('welcome')}</Text>
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
