import React, { useRef, useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/auth';

import { View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { auth, firestore } from '../../services/firebase';
import { AuthContext } from '../../routes/context';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoDescartes from '../../assets/logo.png';
import { ForgotButton, ForgotText, Logo } from './styles';

const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [uidUser, setUidUser] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = useCallback(data => {
    if (data.email && data.password) {
      setLoading(true);
      auth
        .signInWithEmailAndPassword('michelle.nunes10@gmail.com', '123456')
        .then(userLogged => {
          setUidUser(userLogged.user.uid);
        })
        .catch(error => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if(errorCode === "auth/wrong-password"){
            Alert.alert(
              'Ops!',
              'A senha está incorreta.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
          }else if(errorCode === "auth/user-not-found"){
            Alert.alert(
              'Ops!',
              'Esse e-mail não existe na base de dados, por favor, cadastre-se.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
          }
        else if(errorCode === "auth/invalid-email"){
          Alert.alert(
            'Ops!',
            'Esse e-mail não é válido.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false },
          );
        }
        });
   } else {
      Alert.alert(
        'Ops!',
        'Campo email e/ou senha vazio.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (uidUser !== '') {
        const snapshot = await firestore.collection('users').get();
        snapshot.forEach(doc => {
          if (doc.data().id === uidUser) {
            AsyncStorage.setItem('@storage_Key', doc.data().type_user);
            AsyncStorage.setItem('@storage_uid', uidUser);
            signIn();
            setLoading(false);
          }
        });
      }
    };
    loadUser();
  }, [uidUser, signIn]);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}
        >
          <ActivityIndicator size="small" color="#352166" />
        </View>
      ) : (
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
            <Input
              name="password"
              type="password"
              label="Senha"
              secureTextEntry
            />
            <ForgotButton onPress={() => navigation.navigate('Forgot')}>
              <ForgotText>Esqueci a senha</ForgotText>
            </ForgotButton>
          </Form>
          <Button
            color="purple"
            title="Entrar"
            onPress={() => formRef.current.submitForm()}
          />
          <Button
            title="Cadastrar"
            onPress={() => navigation.navigate('Create')}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Login;
