import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import TabBarNavigation from './TabBarNavigation';
import { AuthContext } from './context';

import Login from '../screens/Login';
import CCDados from '../screens/CriarConta/Dados';
import CCTipoEmpresa from '../screens/CriarConta/TipoEmpresa';
import CCTipoUsuario from '../screens/CriarConta/TipoUsuario';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={TabBarNavigation} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Bem-vindo"
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
        headerBackImage: () => (
          <Entypo name="chevron-left" size={20} color="#352166" />
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: 'Entrar' }}
      />
      <Stack.Screen
        name="Create"
        component={CCDados}
        options={{ headerTitle: 'Criar conta' }}
      />
      <Stack.Screen
        name="UserType"
        component={CCTipoUsuario}
        options={{ headerTitle: 'Criar conta' }}
      />
      <Stack.Screen
        name="CompanyType"
        component={CCTipoEmpresa}
        options={{ headerTitle: 'Criar conta' }}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('------');
        AsyncStorage.setItem('@storage_Key', 'artesao');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('------');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          padding: 10,
        }}
      >
        <ActivityIndicator size={50} color="#352166" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          {userToken ? <RootNavigator /> : <AuthStack />}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Routes;
