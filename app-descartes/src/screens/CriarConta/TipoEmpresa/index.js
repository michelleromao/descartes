import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Form } from '@unform/mobile';
import { AuthContext } from '../../../routes/context';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import LogoDescartes from '../../../assets/logo.png';
import { AddressInformation, Logo } from './styles';

const TipoEmpresa = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const formRef = useRef(null);

  function handleSubmit(data) {
    console.log(data);
  }

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
          <AddressInformation>possível alterar após 90 dias</AddressInformation>

          <Input name="email" type="email" label="E-mail" required />
          <Input
            name="password"
            type="password"
            label="Senha"
            secureTextEntry
            required
          />
        </Form>

        <Button color="purple" title="Continuar" onPress={() => signIn()} />
      </View>
    </ScrollView>
  );
};

export default TipoEmpresa;
