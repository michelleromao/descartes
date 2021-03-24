import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { firestore } from '../../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Button, ButtonText } from './styles';

import Swipe from '../../components/Swipe';
import { ScrollView } from 'react-native-gesture-handler';

const data = {
  company: [
    {
      id: 1,
      title: 'Gráfica monstro ',
      details: 'Rua Tabelião Enéas, 678',
      selo: 'Amarelo',
    },
  ],

};


const Favoritos = () => {
  const [index, setIndex] = useState(1);
  const isFocused = useIsFocused();
  const [favorites, setFavorites] = useState({company:[]});


  const getFavorites = useCallback(async() => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const favoriteShot = await firestore.collection('favorites').get();
    const userShot = await firestore.collection('users').get();
    const addressShot = await firestore.collection('addresses').get();
    const photoShot = await firestore.collection('photos').get();

    var favoriteArr = [];
    favoriteShot.forEach(doc => {
      if(doc.data().id_user === response){
        favoriteArr.push({
          doc_id: doc.id,
          id_company: doc.data().id_company
        })
      }
    })
    userShot.forEach(doc => {
      favoriteArr.forEach((favorite, i) => {
        if(doc.id === favorite.id_company){
          favoriteArr[i] = {
            doc_id: favorite.doc_id,
            id: doc.id,
            name: doc.data().name,
            id_photo: doc.data().id_photo,
          }
        }
      })
    })
    addressShot.forEach(doc => {
      favoriteArr.forEach((favorite, i) => {
        if(doc.id === favorite.id){
          favoriteArr[i] = {
            doc_id: favorite.doc_id,
            id: favorite.id,
            name: favorite.name,
            id_photo: favorite.id_photo,
            street: doc.data().street,
            number: doc.data().number
          }
        }
      })
    })
    photoShot.forEach(doc => {
      favoriteArr.forEach((favorite, i) => {
        if(doc.id === favorite.id){
          console.log(doc.id, doc.data().url);
          favoriteArr[i] = {
            doc_id: favorite.doc_id,
            id: favorite.id,
            name: favorite.name,
            id_photo: favorite.id_photo,
            street: favorite.street,
            number: favorite.number,
            photo: doc.data().url
          }
        }
      })
    })
    setFavorites({company:favoriteArr});
  }, []);

  const handleCompany = useCallback(() => {
    setIndex(1);
  }, []);

  const handleResidue = useCallback(() => {
    setIndex(2);
  }, []);

  const handleAnnounce = useCallback(() => {
    setIndex(3);
  }, []);

  useEffect(() => {
    if(isFocused){
      getFavorites();
    }
  }, [getFavorites, isFocused]);

  return (
    <>
      <Container>
        <Button onPress={() => handleCompany()} active={index === 1}>
          <ButtonText active={index === 1}>Empresas</ButtonText>
        </Button>
        <Button onPress={() => handleResidue()} active={index === 2}>
          <ButtonText active={index === 2}>Resíduos</ButtonText>
        </Button>
        <Button onPress={() => handleAnnounce()} active={index === 3}>
          <ButtonText active={index === 3}>Anúncios</ButtonText>
        </Button>
      </Container>

      {index === 1 && (
        <>
          {favorites.company ?
            <>
              <ScrollView>
                <Swipe type="favoriteCompany" list={favorites} />
              </ScrollView>
            </>
            :
            (
              <View
                style={{
                  width: '100%',
                  flex:1,
                  alignItems: 'center',
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: '#D6692B' }}>
                  Você não possui empresas favoritadas
                </Text>
              </View>
            )
          }
        </>
      )}
      {index === 2 && (
            <View
              style={{
                width: '100%',
                flex:1,
                alignItems: 'center',
                justifyContent: "center"
              }}
            >
              <Text style={{ color: '#D6692B' }}>
                Você não possui resíduos favoritados
              </Text>
            </View>
      )}
      {index === 3 && (
        <View style={{
          width: '100%',
          flex:1,
          alignItems: 'center',
          justifyContent: "center"
        }}>
          <Text style={{ color: '#D6692B' }}>
            Você não possui anúncios favoritados
          </Text>
        </View>
      )}
    </>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
