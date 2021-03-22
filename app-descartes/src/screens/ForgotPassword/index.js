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

const ForgotPassword = ({ navigation }) => {
  const formRef = useRef(null);

  const handleSubmit = useCallback(data => {
    if (data.email) {
      auth.sendPasswordResetEmail(data.email).then(() => {
        Alert.alert(
          'Ok!',
          'Por favor, verifique seu e-mail.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      }).catch(err => {
        console.log(err);
        Alert.alert(
          'Ops!',
          'Algo deu errado, por favor tente mais tarde.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );
      })
    } else {
      Alert.alert(
        'Ops!',
        'Campo email vazio.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  }, []);

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
          </Form>
          <Button
            color="purple"
            title="Trocar senha"
            onPress={() => formRef.current.submitForm()}
          />

        </View>
    </ScrollView>
  );
};

export default ForgotPassword;
