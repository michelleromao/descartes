import 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import React from 'react';

import Index from './src/App';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return <Index />;
}
