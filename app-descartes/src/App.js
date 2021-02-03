import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import React from 'react';

import { View } from 'react-native';
import Routes from './routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
        <Routes />
      </View>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};
export default App;
