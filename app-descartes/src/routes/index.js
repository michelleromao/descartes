import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ActivityIndicator, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import TabBarNavigation from './TabBarNavigation';
import { AuthContext } from './context';

import Drawer from '../components/Drawer';
import FilterBy from '../components/FilterBy';
import ResidueModals from '../components/ResidueModals';
import Donation from '../screens/Donation';


import Login from '../screens/Login';
import CCDados from '../screens/CriarConta/Dados';
import CCTipoEmpresa from '../screens/CriarConta/TipoEmpresa';
import CCTipoUsuario from '../screens/CriarConta/TipoUsuario';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Root"
    >
      <Stack.Screen name="Root" component={TabBarNavigation} />
      <Stack.Screen name="Donations" component={Donation} options={{
          headerTitle: 'Minhas doações',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#6CB9AA',
          },
          headerTintColor: '#352166',
          headerTitleAlign: 'center',
          headerTitleAllowFontScaling: true,
          headerTitleStyle: { fontWeight: '600' },
          cardStyle: { backgroundColor: '#F1F1F1' },
          headerBackTitle: 'Voltar',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 15 },
          headerPressColorAndroid: 'transparent',
          headerBackImage: () => (
            <Entypo name="chevron-left" size={20} color="#352166" />
          ),
      }}/>

    </Stack.Navigator>
  );
};

const ModalNavigator = () => {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal"
    >
      <ModalStack.Screen
        name="Home"
        component={RootNavigator}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen name="Menu" component={Drawer} />
      <ModalStack.Screen name="FilterBy" component={FilterBy} />
      <ModalStack.Screen name="ModalResidue" component={ResidueModals} />
    </ModalStack.Navigator>
  );
};

function LogoTitle() {
  return (
    <Text style={{ color: '#352166', fontSize: 20, fontWeight: 'bold' }}>
      Criar Conta
    </Text>
  );
}

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
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { backgroundColor: '#F1F1F1' },
        headerBackTitle: 'Voltar',
        headerBackTitleVisible: true,
        headerBackTitleStyle: { fontSize: 15 },
        headerPressColorAndroid: 'transparent',
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
        name="DataAccount"
        component={CCDados}
        options={({ navigation, route }) => ({
          headerTitle: props => <LogoTitle {...props} />,
        })}
      />
      <Stack.Screen
        name="Create"
        component={CCTipoUsuario}
        options={{ headerTitle: 'Criar conta' }}
      />
      <Stack.Screen
        name="CompanyType"
        component={CCTipoEmpresa}
        options={{
          headerTitle: 'Criar conta',
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{
          headerTitle: 'Esqueci a senha',
        }}
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
          {userToken ? <ModalNavigator /> : <AuthStack />}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Routes;
