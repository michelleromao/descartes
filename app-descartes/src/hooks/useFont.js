import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function useFont() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          'nunito-bold': require('../../assets/fonts/NunitoSans-Bold.ttf'),
          'nunito-semibold': require('../../assets/fonts/NunitoSans-SemiBold.ttf'),
          'nunito-regular': require('../../assets/fonts/NunitoSans-Regular.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
