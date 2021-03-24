import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { firestore } from '../../services/firebase';
import { View, Text } from 'react-native';

import Swipe from '../../components/Swipe';
import { ScrollView } from 'react-native-gesture-handler';

const data = {
  notifications: [
    {
      id: 1,
      title: 'Gráfica monstro ',
      details: 'colocou 10kg de papel',
    },
    {
      id: 2,
      title: 'Artesao ',
      details: 'solicitou 10kg de papel',
    },
  ],
};

const Notificacao = () => {
  const isFocused = useIsFocused();
  const [userType, setUserType] = useState();
  const [notifications, setNotifications] = useState({notifications: []});


  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  const loadNotifications = useCallback(async () => {
      const response = await AsyncStorage.getItem('@storage_uid');
      const notificationShot = await firestore.collection('notifications').get();
      const userShot = await firestore.collection('users').get();
      const materialShot = await firestore.collection('materials').get();

      var notificationArr = [];
      notificationShot.forEach(doc => {
        if(doc.data().owner_id === response){
          notificationArr.push({
            doc_id: doc.id,
            id_company: doc.data().id_company,
            id_craftsman: doc.data().id_craftsman,
            id_material: doc.data().id_material,
            text: doc.data().text,
          })
        }
      })
      userShot.forEach(doc => {
        notificationArr.forEach((notification, i) => {
          if(doc.id === notification.id_craftsman){
            notificationArr[i] = {
              doc_id: notification.doc_id,
              id_company: notification.id_company,
              id_craftsman: notification.id_craftsman,
              name: doc.data().name,
              id_material: notification.id_material,
              text: notification.text,
            }
          }
        })
      })
      materialShot.forEach(doc => {
        notificationArr.forEach((notification, i) => {
          if(doc.id === notification.id_material){
            notificationArr[i] = {
              doc_id: notification.doc_id,
              id_company: notification.id_company,
              id_craftsman: notification.id_craftsman,
              name:notification.name,
              id_material: notification.id_material,
              type: doc.data().type,
              text: notification.text,
            }
          }
        })
      })
      setNotifications({notifications:notificationArr});
  }, [])

  useEffect(() => {
    getUserType();
    if(isFocused){
      loadNotifications()
    }
  }, [getUserType, loadNotifications, isFocused]);

  return (
    <>
    {userType === 'craftsman' &&
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginTop: 33,
        }}
      >
        <Text style={{ color: '#D6692B' }}>Você não possui notificações</Text>
      </View>
    }
    {userType === 'donorCompany' &&
      <>
        {
          notifications.notifications.length !== 0 ?
          <ScrollView>
            <Swipe color="yellow" type="notifications" list={notifications} />
          </ScrollView>
          :
            <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 33,
            }}
          >
            <Text style={{ color: '#D6692B' }}>Você não possui notificações</Text>
          </View>
        }
      </>
    }
    </>
  );
};

export default Notificacao;
