import React, { useState, useCallback, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { firestore } from '../../services/firebase';

import Button from '../../components/Button';
import Selos from '../../components/Seals';

import MapHeader from '../../components/MapHeader';
import Pin from '../../../assets/pin.png';
import { MenuButton, CallToAdd, TextCallToAdd } from './styles';
import Carousel from '../../components/Carousel';

const Home = () => {
  const navigation = useNavigation();
  const [latLong, setLatLong] = useState();

  const [userType, setUserType] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  const getUserDetails = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const snapshot = await firestore.collection('addresses').get();
    snapshot.forEach(doc => {
      if (doc.data().id_user === response) {
        console.log('lat ', doc.data().lat, ' lon ', doc.data().lon);
        setLatLong({
          lat: doc.data().lat,
          lon: doc.data().lon,
        });
      }
    });
  }, []);

  useEffect(() => {
    getUserType();
    if (userType === 'craftsman') {
      getUserDetails();
    }
  }, [getUserType, getUserDetails, userType]);

  return (
    <>
      {userType === 'craftsman' && latLong && (
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
                <MenuButton onPress={() => navigation.navigate('Menu')}>
                  <Feather name="menu" size={30} color="#352166" />
                </MenuButton>
              </MapHeader>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: latLong.lat,
                longitude: latLong.lon,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              <Callout>
                <Marker
                  coordinate={{ latitude: latLong.lat, longitude: latLong.lon }}
                  image={Pin}
                />
              </Callout>
            </MapView>
          </View>
        </>
      )}
      {userType === 'donorCompany' && (
        <>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 25,
              marginRight: 25,
              flex: 1,
            }}
          >
            <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
              <Selos />
            </View>
            <CallToAdd>
              <TextCallToAdd>Sem resíduos adicionados</TextCallToAdd>
              <Button color="orange" title="adicionar agora" />
            </CallToAdd>
            <View>
              <Carousel />
            </View>
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
