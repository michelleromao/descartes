import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, ScrollView, ImageBackground, TouchableOpacity, Text, Image } from 'react-native';

import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

import { AlertText, SaveButton, DeletButton, Modal, TextModal, BackgroundColorModal, GroupButton } from './styles';

import { DeleteIcon, SaveIcon } from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';

const MinhaConta = () => {

  const [caminho, setCaminho] = useState();

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setCaminho(pickerResult.uri);
  };

  const [userType, setUserType] = useState(null);
  const [state, setState] = useState(false);

  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  useEffect(() => {
    getUserType();
  }, [getUserType]);

  const formRef = useRef(null);

  function handleSubmit(data) {
    console.log(data);
  }

  return (

    <>

      {state ? (
        <BackgroundColorModal>
          <Modal>
            <TextModal>Deseja excluir sua conta?</TextModal>
            <GroupButton>
              <Button
                color="orange"
                title="Não"
                size="48%"
                onPress={() => setState(false)}
              />
              <Button
                color="green"
                title="Sim"
                size="48%"
                onPress={() => alert('Você excluiu sua conta')}
              />
            </GroupButton>
          </Modal>
        </BackgroundColorModal>
      ) : (
        false
      )}

      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginLeft: 25,
            marginRight: 25,
          }}
        >

          <View style={{ flexDirection: 'row' }}>
            <SaveButton
              onPress={() => alert('Deseja salvar alterações?')}
            >
              <SaveIcon />
              <Text style={{ marginTop: '20%', fontFamily: 'nunito-regular', color: '#352166' }}>Salvar</Text>
            </SaveButton>

            <DeletButton
              style={{ alignItems: 'center' }}
              onPress={() => setState(true)}
            >
              <DeleteIcon />
              <Text style={{ marginTop: '20%', fontFamily: 'nunito-regular', color: '#352166' }}>Apagar</Text>
            </DeletButton>
          </View>

          <>
            {userType === 'artesao' && (
              <>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={openImagePickerAsync}
                  >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <ImageBackground
                        source={{ uri: caminho }}
                        style={{ height: 130, width: 130, borderRadius: 100 }}
                      >
                        <View>
                          <Image
                            source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_258083.png' }}
                            style={{ height: 130, width: 130, borderRadius: 100, opacity: 0.10 }}
                          />
                          <Icon name='camera' size={40} color='#D6692B' style={{
                            opacity: 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '35%',
                            marginTop: '-35%'
                          }} />
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>Artesão</Text>

                </View>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    type="name"
                    label="Nome" />
                  <Input
                    name="cpf"
                    type="cpf"
                    label="CPF"
                  />
                  <Input
                    name="phone"
                    type="phone"
                    label="Telefone"
                  />
                  <Input
                    name="address"
                    type="address"
                    label="Endereço"
                  />
                  <AlertText>Alterar somente após 90 dias</AlertText>
                  <Input
                    name="e-mail"
                    type="e-mail"
                    label="E-mail"
                  />
                  <Input
                    name="password"
                    type="passaword"
                    label="Senha"
                    secureTextEntry
                  />
                </Form>
              </>
            )}

            {userType === 'empresaDoadora' && (

              <>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={openImagePickerAsync}
                  >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <ImageBackground
                        source={{ uri: caminho }}
                        style={{ height: 130, width: 130, borderRadius: 100 }}
                      >
                        <View style={{ flexDirection: 'column' }}>
                          <Image
                            source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_258083.png' }}
                            style={{ height: 130, width: 130, borderRadius: 100, opacity: 0.10 }}
                          />
                          <Icon name='camera' size={40} color='#D6692B' style={{
                            opacity: 0.5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: '35%',
                            marginTop: '-35%'
                          }} />
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>Empresa</Text>
                </View>

                <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input
                    name="name"
                    type="name"
                    label="Nome" />
                  <Input
                    name="cnpj"
                    type="cnpj"
                    label="CNPJ"
                  />
                  <Input
                    name="phone"
                    type="phone"
                    label="Telefone"
                  />
                  <Input
                    name="address"
                    type="address"
                    label="Endereço"
                  />
                  <AlertText>Alterar somente após 90 dias</AlertText>
                  <Input
                    name="e-mail"
                    type="e-mail"
                    label="E-mail"
                  />
                  <Input
                    name="password"
                    type="passaword"
                    label="Senha"
                    secureTextEntry
                  />
                </Form>
              </>
            )}
          </>

        </View>
      </ScrollView >
    </>
  )
};

export default MinhaConta;

