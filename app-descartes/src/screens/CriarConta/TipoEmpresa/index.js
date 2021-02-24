import React, { useState, useCallback } from 'react';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, ScrollView } from 'react-native';
import { AuthContext } from '../../../routes/context';

import Button from '../../../components/Button';

import LogoDescartes from '../../../assets/logo.png';
import {
  Title,
  Question,
  Logo,
  ButtonQuestion,
  TextButton,
  TextOption,
} from './styles';

const TipoEmpresa = () => {
  const { signUp } = React.useContext(AuthContext);
  const route = useRoute();

  const [checked, setChecked] = useState('doadora');

  const handleSignIn = useCallback(() => {
    const { data } = route.params;
    if (checked && data) {
      signUp();
      AsyncStorage.setItem('@storage_Key', 'empresaDoadora');
    }
  }, [route, checked, signIn]);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginLeft: 25,
            marginRight: 25,
            marginTop: '25%',
          }}
        >
          <Logo source={LogoDescartes} />
          <Title>
            <Question>Que tipo de empresa é?</Question>
            <ButtonQuestion>
              <TextButton>?</TextButton>
            </ButtonQuestion>
          </Title>
          <View style={{ marginTop: '25%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="doadora"
                status={checked === 'doadora' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('doadora')}
                color="#D6692B"
              />
              <TextOption>Doadora</TextOption>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <RadioButton
                disabled
                value="vendedora"
                status={checked === 'vendedora' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('vendedora')}
                color="#D6692B"
              />
              <TextOption>Vendedora</TextOption>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
              <RadioButton
                disabled
                value="compradora"
                status={checked === 'compradora' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('compradora')}
                color="#D6692B"
              />
              <TextOption>Compradora</TextOption>
            </View>
          </View>
          <View style={{ width: '100%', marginTop: '25%' }}>
            <Button
              color="purple"
              title="Cadastrar"
              onPress={() => handleSignIn()}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TipoEmpresa;
