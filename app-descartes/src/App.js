import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
        <Routes />
      </View>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
};
export default App;
