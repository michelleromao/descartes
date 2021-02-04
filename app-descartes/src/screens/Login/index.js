import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Form } from '@unform/mobile';
import { AuthContext } from '../../routes/context';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoDescartes from '../../assets/logo.png';
import { ForgotButton, ForgotText, Logo } from './styles';

const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const formRef = useRef(null);

  function handleSubmit(data) {
    console.log(data);
    // { email: 'test@example.com', password: '123456' }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Logo source={LogoDescartes} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="email" label="E-mail" />
          <ForgotButton>
            <ForgotText>Esqueci o e-mail</ForgotText>
          </ForgotButton>
          <Input
            name="password"
            type="password"
            label="Senha"
            secureTextEntry
          />
          <ForgotButton>
            <ForgotText>Esqueci a senha</ForgotText>
          </ForgotButton>
        </Form>
        <Button color="purple" title="Entrar" onPress={() => signIn()} />
        <Button
          title="Cadastrar"
          onPress={() => navigation.navigate('Create')}
        />
      </View>
    </ScrollView>
  );
};

export default Login;
