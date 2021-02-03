import React from 'react';
import { SafeAreaView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
// telas
import HomeEmpresa from '../screens/Empresa/Home';
import MinhaContaEmpresa from '../screens/Empresa/MinhaConta';
import AddMaterial from '../screens/Empresa/AddMaterial';

import HomeArtesao from '../screens/Artesao/Home';
import MinhaContaArtesao from '../screens/Artesao/MinhaConta';

const Main = createStackNavigator();
const Artesao = createStackNavigator();
const Empresa = createStackNavigator();

const EmpresaScreen = () => {
  return (
    <Empresa.Navigator>
      <Empresa.Screen name="Home" component={HomeEmpresa} />
      <Empresa.Screen name="Cadastrar material" component={AddMaterial} />
      <Empresa.Screen name="Minha Conta" component={MinhaContaEmpresa} />
    </Empresa.Navigator>
  );
};

const ArtesaoScreen = () => {
  return (
    <Artesao.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Artesao.Screen name="Home" component={HomeArtesao} />
      <Artesao.Screen name="Minha Conta" component={MinhaContaArtesao} />
    </Artesao.Navigator>
  );
};

const Routes = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Main.Navigator
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
        <Main.Screen name="Entrar" component={Login} />
        <Main.Screen name="Artesao" component={ArtesaoScreen} />
        <Main.Screen name="Empresa" component={EmpresaScreen} />
      </Main.Navigator>
    </SafeAreaView>
  );
};

export default Routes;
