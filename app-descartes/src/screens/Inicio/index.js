import React, { useState, useCallback, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';

import Button from '../../components/Button';
import MapHeader from '../../components/MapHeader';
import Pin from '../../../assets/pin.png';
import { MenuButton, CallToAdd, TextCallToAdd } from './styles';

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
      {userType === 'artesao' && (
        <>
          <View style={styles.container}>
            <View
              style={{
                alignItems: 'center',
                marginLeft: 25,
                marginRight: 25,
              }}
            >
              <MapHeader>
                <MenuButton>
                  <Feather name="menu" size={30} color="#352166" />
                </MenuButton>
              </MapHeader>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: -4.968422,
                longitude: -39.0181,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Callout>
                <Marker
                  coordinate={{ latitude: -4.968422, longitude: -39.0181 }}
                  image={Pin}
                />
              </Callout>
            </MapView>
          </View>
        </>
      )}
      {userType === 'empresaDoadora' && (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 25,
              marginRight: 25,
              flex: 1,
            }}
          >
            <CallToAdd>
              <TextCallToAdd>Sem resíduos adicionados</TextCallToAdd>
              <Button color="orange" title="adicionar agora" />
            </CallToAdd>
          </View>
        </>
      )}

      <StatusBar style="dark" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Home;
