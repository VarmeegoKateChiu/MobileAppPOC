
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';
const Drawer = createDrawerNavigator();
import { Icon } from 'react-native-elements';
import MenuIcon from '@mui/icons-material/Menu';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import ManningCompanyInfoPage from "../staticPage/ManningCompanyInfoPage";
// import WebViewTest from "../staticPage/WebViewTest";
import {color} from "@rneui/base";

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#FF8300',
        height: 60,
        flexDirection:"row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: -5
    },
    drawerHeaderText: {
        fontSize: 20,
        textAlign: 'center',
    },
});

const MenuIcon2 = () => {
    return (
        // <MaterialIcons name="auto-delete" size={32} color="black" />
        <MaterialIcons name="menu" size={32} color="white" />
    );
};


// Custom icon component
const CustomHeader = ({ navigation }) => {
    const handleDrawerPress = () => {
        navigation.openDrawer();
    };

   return(<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF8300', height: 50 }}>
       <TouchableOpacity onPress={handleDrawerPress}><MenuIcon2 /></TouchableOpacity>
       <Image                     style={{ width: 200, height: 30, marginLeft: 10 }}
                                  source={require('../../images/Mannings_logo.png')} /><Text></Text></View>);
};

const ExitDrawerIcon = () => {



    return (
        // <MaterialIcons name="auto-delete" size={32} color="black" />
        <MaterialIcons name="close" size={32} color="white" />
    );
};

const CustomDrawerHeader = ({navigation}) => {

    const handleDrawerPress = () => {
        navigation.closeDrawer();
    };
    return (
        <View style={styles.drawerHeader}>
            {/* Your header content */}
            <Image                     style={{ height: 30, marginLeft: 10, marginTop:10 }}
                                       source={require('../../images/Mannings_logo.png')} />
            <TouchableOpacity onPress={handleDrawerPress}><ExitDrawerIcon /></TouchableOpacity>
        </View>
    );
};

const CustomDrawerContent = (props) => {


    return (
        <DrawerContentScrollView {...props}>
            <CustomDrawerHeader {...props} />
            {/* Rest of the drawer content */}
            {/* Include your drawer items here */}
            {/*<DrawerItem*/}
            {/*    label="ManningCompanyInfoPage"*/}
            {/*    onPress={() => props.navigation.navigate('ManningCompanyInfoPage')}*/}
            {/*/>*/}
            {/*<DrawerItem*/}
            {/*    label="WebViewTest"*/}
            {/*    onPress={() => props.navigation.navigate('WebViewTest')}*/}
            {/*/>*/}
            {/*<DrawerItem*/}
            {/*    label="ManningStaticPageTesting"*/}
            {/*    onPress={() => props.navigation.navigate('ManningStaticPageTesting')}*/}
            {/*/>*/}
            {/*<DrawerItem*/}
            {/*    label="SettingPage"*/}
            {/*    onPress={() => props.navigation.navigate('SettingPage')}*/}
            {/*/>*/}
        </DrawerContentScrollView>
    );
};
const SideBarNav = () => {


    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
            header: props => <CustomHeader {...props} />,
            drawerStyle: { width: '100%' },

        }}>

             <Drawer.Screen
                 name="ManningCompanyInfoPage"
                 component={ManningCompanyInfoPage}
                 options={{
                    headerShown:true

                 }}
             />
             <Drawer.Screen name="WebViewTest" component={WebViewTest} />
             <Drawer.Screen name="ManningStaticPageTesting" component={ManningStaticPageTesting} />

         </Drawer.Navigator>
    );
}

export default SideBarNav;