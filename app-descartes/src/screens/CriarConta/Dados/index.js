import React, { useRef, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, ScrollView, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { AuthContext } from '../../../routes/context';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import LogoDescartes from '../../../assets/logo.png';
import { AddressInformation, Logo } from './styles';

const Dados = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType } = route.params;
  const { signUp } = React.useContext(AuthContext);

  const formRef = useRef(null);
  const handleSubmit = useCallback(
    data => {
      console.log(data);
      if (userType === 'PJ') {
        if (
          data.address === undefined ||
          data.address === '' ||
          data.cnpj === undefined ||
          data.cnpj === '' ||
          data.email === undefined ||
          data.email === '' ||
          data.name === undefined ||
          data.name === '' ||
          data.password === undefined ||
          data.password === '' ||
          data.phone === undefined ||
          data.phone === ''
        ) {
          Alert.alert(
            'Campo vazio',
            'Você esqueceu de preencher algum dado, por favor, verifique.',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        } else {
          navigation.navigate('CompanyType', {
            data,
          });
        }
      } else if (userType === 'PF') {
        if (
          data.address === undefined ||
          data.address === '' ||
          data.email === undefined ||
          data.email === '' ||
          data.name === undefined ||
          data.name === '' ||
          data.password === undefined ||
          data.password === '' ||
          data.phone === undefined ||
          data.phone === ''
        ) {
          Alert.alert(
            'Campo vazio',
            'Você esqueceu de preencher algum dado, por favor, verifique.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        } else {
          signUp();
          AsyncStorage.setItem('@storage_Key', 'artesao');
        }
      }
    },
    [navigation, userType, signUp],
  );

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 25,
          marginRight: 25,
          marginTop: '25%',
        }}
      >
        <Logo source={LogoDescartes} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          {userType === 'PF' && (
            <>
              <Input name="name" type="text" label="Nome" required />
              <Input
                name="cpf"
                type="text"
                label="CPF"
                keyboardType="number-pad"
                required
              />
              <Input name="phone" type="text" label="Telefone" required />
              <Input name="address" type="text" label="Endereço" required />
              <AddressInformation>
                possível alterar após 90 dias
              </AddressInformation>

              <Input name="email" type="email" label="E-mail" required />
              <Input
                name="password"
                type="password"
                label="Senha"
                secureTextEntry
                required
              />
            </>
          )}
          {userType === 'PJ' && (
            <>
              <Input name="name" type="text" label="Nome" required />
              <Input
                name="cnpj"
                type="text"
                label="CNPJ"
                keyboardType="number-pad"
                required
              />
              <Input name="phone" type="text" label="Telefone" required />
              <Input name="address" type="text" label="Endereço" required />
              <AddressInformation>
                possível alterar após 90 dias
              </AddressInformation>

              <Input name="email" type="email" label="E-mail" required />
              <Input
                name="password"
                type="password"
                label="Senha"
                secureTextEntry
                required
              />
            </>
          )}
        </Form>
        <Button
          color="purple"
          title="Continuar"
          size="100%"
          onPress={() => formRef.current.submitForm()}
        />
      </View>
    </ScrollView>
  );
};

export default Dados;
