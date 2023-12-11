/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{PropsWithChildren} from 'react';
import {View, SafeAreaView, StatusBar, ScrollView, Image, ImageBackground, TouchableOpacity, Alert, TextInput, Text, StyleSheet} from 'react-native';
import Routes from "./src/Routes";

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Routes/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
