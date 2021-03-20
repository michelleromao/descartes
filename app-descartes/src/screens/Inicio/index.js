import React, { useState, useCallback, useEffect } from 'react';

import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native';

import MapView, { PROVIDER_GOOGLE, Callout, Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { firestore } from '../../services/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from "../../store/actions/filter";

import Button from '../../components/Button';
import Selos from '../../components/Seals';

import MapHeader from '../../components/MapHeader';
import Pin from '../../../assets/pin.png';
import Pin2 from '../../../assets/pin2.png';
import { MenuButton, CallToAdd, TextCallToAdd } from './styles';
import Carousel from '../../components/Carousel';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [latLong, setLatLong] = useState();
  const [latLongCompanies, setLatLongCompanies] = useState([]);
  const [userType, setUserType] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [typeId, setTypeId] = useState();


  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  const getUserDetails = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const snapshot = await firestore.collection('addresses').get();
    const usershot = await firestore.collection("users").get();
    usershot.forEach(doc => {
      if(doc.data().id === response){
        setUserDetails({name: doc.data().name.split(" ")[0]})
      }
    })
    snapshot.forEach(doc => {
      if (doc.data().id_user === response) {
        setLatLong({
          lat: doc.data().lat,
          lon: doc.data().lon,
        });
      }
    });
  }, []);

  const handleFilter = useCallback(async () => {
    if(filter !== null && filter !== ''){
      var typeIdStr;
        const materialShot = await firestore.collection('materials').get();
        if(materialShot){
          materialShot.forEach(doc => {
            if(doc.data().type === filter){
            typeIdStr=doc.id;
            setTypeId(doc.id);
            }
          });
          var companies = [];
          const residueShot = await firestore.collection('residues').get();
          residueShot.forEach(doc => {
            if(doc.data().id_material === typeIdStr){
              companies.push({id_company: doc.data().id_company, quantity: doc.data().quantity, size: doc.data().size});
            }
          });
          if(companies.length !== 0){
            var addresses = [];
            var quantity = [];
            companies.forEach(item => {
              var company = item.id_company
              if(item.id_company === company){
                if(item.quantity){
                  quantity.push(item.quantity)
                }else{
                  quantity.push(item.size)
                }
              }
            })
            const companyAddressShot = await firestore.collection('addresses').get();
            companies.forEach((item) => {
              companyAddressShot.forEach(doc => {
                if(doc.data().id_user === item.id_company){
                  addresses.push({id: doc.data().id_user, lat: doc.data().lat, lon: doc.data().lon, material: filter, quantity: quantity})
                }
            });
          })
          addresses = addresses.filter((address, index, self) =>
          index === self.findIndex((t) => (
            t.lat === address.lat && t.id === address.id
          ))
        )
          setLatLongCompanies(addresses);
          dispatch(setFilter(''));
          }else{
            alert('Não há materiais registrados com esse tipo');
            dispatch(setFilter(''));
          }
        }else{
          dispatch(setFilter(''));
        }
    }
  }, [dispatch, filter])

  useEffect(() => {
    getUserType();
    if (userType === 'craftsman') {
      getUserDetails();
    }
    if(isFocused){
      handleFilter()
    }
  }, [getUserType, getUserDetails, userType, isFocused, handleFilter]);

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
                <MenuButton onPress={() => navigation.navigate('Menu', {name: userDetails.name})}>
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
              {latLongCompanies.length !== 0 ? latLongCompanies.map((item) => {
                  return(
                    <Marker
                      key={item.id}
                      coordinate={{ latitude: item.lat, longitude: item.lon }}
                      image={Pin2}
                      >
                     <MapView.Callout tootlip>
                      <View>
                        <Text style={styles.textTooltip}>{item.material}</Text>
                        <ScrollView horizontal>
                          {item.quantity.map((i) =>
                          <View style={{borderWidth: 1, borderColor: 'black', padding: 1, borderRadius: 2, marginRight: 5}}>
                            <Text style={{fontSize: 10}}>{i}</Text>
                          </View>
                          )}
                        </ScrollView>

                      </View>
                    </MapView.Callout>
                  </Marker>
                  )
                }) : false}
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
  plainView: {
    width: 500,
    height: 50
  },
  textTooltip:{
    fontWeight: '500'
  },

});

export default Home;
