import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../services/firebase';
import { View, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

import MinhaConta from '../screens/MinhaConta';
import Notificacao from '../screens/Notificacao';
import Inicio from '../screens/Inicio';
import Favoritos from '../screens/Favoritos';
import Marketplace from '../screens/Marketplace';


import {
  AccountIcon,
  Favorite,
  Map,
  House,
  MarketplaceIcon,
  NotificationIcon,
} from '../components/Icon';

const MyAccountStack = createStackNavigator();
const MyAccountTabNavigation = () => {
  return (
    <MyAccountStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6CB9AA',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
    >
      <MyAccountStack.Screen
        name="Minha conta"
        component={MinhaConta}
        options={{ headerTitle: 'Minha conta' }}
      />
    </MyAccountStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();
const NotificationNavigation = () => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6CB9AA',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
    >
      <NotificationStack.Screen
        name="Notificações"
        component={Notificacao}
        options={{ headerTitle: 'Notificações' }}
      />
    </NotificationStack.Navigator>
  );
};

const Home = createStackNavigator();
const HomeNavigation = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const usershot = await firestore.collection("users").get();
    usershot.forEach(doc => {
      if(doc.data().id === response){
        setUserDetails({name: doc.data().name})
      }
    })
  }, []);
  const [userType, setUserType] = useState(null);
  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  useEffect(() => {
    getUserType();
    getUserDetails();
  }, [getUserType, getUserDetails]);

  return (
    <Home.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6CB9AA',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
        headerShown: userType !== 'craftsman',
      }}
    >
      <Home.Screen
        name="Home"
        component={Inicio}
        options={{
          headerTitle: 'Início',
          headerLeft: () => {
            if (userType === 'donorCompany') {
              return (
                <TouchableOpacity
                  style={{ marginLeft: 25 }}
                  onPress={() => navigation.navigate('Menu', {name: userDetails.name})}
                >
                  <Feather name="menu" size={30} color="#352166" />
                </TouchableOpacity>
              );
            }
          },
        }}
      />
    </Home.Navigator>
  );
};

const Favorites = createStackNavigator();
const FavoritesNavigation = () => {
  return (
    <Favorites.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6CB9AA',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
    >
      <Favorites.Screen
        name="Favoritos"
        component={Favoritos}
        options={{ headerTitle: 'Favoritos' }}
      />
    </Favorites.Navigator>
  );
};

const MarketplaceStack = createStackNavigator();
const MarketplaceStackNavigation = () => {
  return (
    <MarketplaceStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6CB9AA',
        },
        headerTintColor: '#352166',
        headerTitleAlign: 'center',
        headerTitleAllowFontScaling: true,
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
      }}
    >
      <MarketplaceStack.Screen
        name="Marketplace"
        component={Marketplace}
        options={{ headerTitle: 'Marketplace' }}
      />
    </MarketplaceStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  const [userType, setUserType] = useState(null);
  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  useEffect(() => {
    getUserType();
  }, [getUserType]);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          backgroundColor: '#6CB9AA',
          paddingBottom: 10,
          height: 62,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Account') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <AccountIcon />
              </View>
            );
          }
          if (route.name === 'Notification') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <NotificationIcon />
              </View>
            );
          }
          if (route.name === 'Home') {
            if (userType === 'craftsman') {
              return (
                <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                  <Map width={30} height={37} />
                </View>
              );
            }
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <House width={30} height={37} />
              </View>
            );
          }
          if (route.name === 'Favorite') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <Favorite />
              </View>
            );
          }
          if (route.name === 'Marketplace') {
            return (
              <View style={focused ? { opacity: 1 } : { opacity: 0.5 }}>
                <MarketplaceIcon />
              </View>
            );
          }
        },
      })}
    >
      {userType === 'donorCompany' ? (
        <>
          <BottomTab.Screen
            name="Account"
            component={MyAccountTabNavigation}
            initial={false}
          />
          <BottomTab.Screen name="Home" component={HomeNavigation} />
          <BottomTab.Screen
            name="Notification"
            component={NotificationNavigation}
          />
        </>
      ) : (
        <>
          <BottomTab.Screen
            name="Account"
            component={MyAccountTabNavigation}
            initial={false}
          />
          <BottomTab.Screen
            name="Notification"
            component={NotificationNavigation}
          />
          <BottomTab.Screen name="Home" component={HomeNavigation} />
          <BottomTab.Screen name="Favorite" component={FavoritesNavigation} />
          <BottomTab.Screen
            name="Marketplace"
            component={MarketplaceStackNavigation}
          />
        </>
      )}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
