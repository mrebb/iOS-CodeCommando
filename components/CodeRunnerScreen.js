import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Wallpaper from './styles/Wallpaper.js'
import Logo from './styles/Logo.js'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const CodeRunnerScreen = () => (
  <Wallpaper>
  <Logo/>
  <View style={styles.container}>
    <Text style={styles.welcome}>
    CodeRunner Screen
    </Text>
  </View>
  </Wallpaper>
);

CodeRunnerScreen.navigationOptions = {
  title: 'CodeRunner',
};

export default CodeRunnerScreen;