import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import MapHeader from '../../components/MapHeader';
import { MenuButton } from './styles';

const Home = () => {
  const [userType, setUserType] = useState(null);
  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  useEffect(() => {
    getUserType();
  }, [getUserType]);
  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        {userType === 'artesao' && (
          <>
            <MapHeader>
              <MenuButton>
                <Feather name="menu" size={30} color="#352166" />
              </MenuButton>
            </MapHeader>
          </>
        )}
      </View>
      <StatusBar style="dark" />
    </>
  );
};

export default Home;
