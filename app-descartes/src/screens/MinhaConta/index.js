import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, ScrollView, ImageBackground, TouchableOpacity, Text, Image, NativeEventEmitter, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../routes/context';

import 'firebase/auth';
import { auth, firestore } from '../../services/outrofirebase';

import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

import { AlertText, SaveButton, DeletButton, Modal, TextModal, BackgroundColorModal, GroupButton } from './styles';

import { SaveIcon } from '../../components/Icon';
import { DeleteAccountIcon } from '../../components/IconDeleteAccount';
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
  const [list, setList] = useState(null);
  const [address, setAddress] = useState(null);
  const isFocused = useIsFocused();
  const { signOut } = React.useContext(AuthContext);

  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  const loadData = useCallback(async () => {
    const uid = await AsyncStorage.getItem('@storage_uid');
    const docRef = await firestore.collection("users").get();
    console.log('aq')
    docRef.forEach((doc) => {
      if (doc.id === uid) {
        setList({
          id: doc.id,
          name: doc.data().name,
          cpf: doc.data().cpf,
          cnpj: doc.data().cnpj,
          phone: doc.data().phone,
          email: doc.data().email,
        });
      }
    });
  }, []);

  const loadAddress = useCallback(async () => {
    const uid = await AsyncStorage.getItem('@storage_uid');
    const docRef = await firestore.collection("addresses").get();
    console.log('aq2')
    docRef.forEach((doc) => {
      if (doc.id === uid) {
        setAddress({
          id_address: doc.id,
          city: doc.data().city,
          neighborhood: doc.data().neighborhood,
          number: doc.data().number,
          state: doc.data().state,
          street: doc.data().street,
          zipcode: doc.data().zipcode,
        });
      }
    });
  }, []);

  const handleDelete = useCallback(async () => {
    const uid = await AsyncStorage.getItem('@storage_uid');
    const res = await firestore.collection("users").doc(uid).delete();
    signOut()

    console.log('delete account!!');

    auth
      .delete()
      .then(function () {
      console.log('delete successful?')
      const user = firebase.auth().currentUser
      console.log({ user })
      store.dispatch(forgetUser())
      routerReset('GetStarted')
    }).catch(function (error) {
      console.log({ error })
    })
  }, []);

/*const handleAddUser = useCallback(async () => {
  const uid = await AsyncStorage.getItem('@storage_uid');
  const docRef = await firestore.collection("users").doc(uid).update();
  console.log('user update')

  const update = {
    id_address: doc.id,
    city: doc.data().city,
    neighborhood: doc.data().neighborhood,
    number: doc.data().number,
    state: doc.data().state,
    street: doc.data().street,
    zipcode: doc.data().zipcode,
  }

},[]);*/

useEffect(() => {
  getUserType();
  if (isFocused) {
    loadData();
    loadAddress();
  };
  console.log('aqui')
}, []);

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
              onPress={() => handleDelete()}
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
            onPress={() => alert('Dados salvos com sucesso.')}
          >
            <SaveIcon />
            <Text style={{ marginTop: '20%', fontFamily: 'nunito-regular', color: '#352166' }}>Salvar</Text>
          </SaveButton>

          <DeletButton
            style={{ alignItems: 'center' }}
            onPress={() => setState(true)}
          >
            <DeleteAccountIcon />
            <Text style={{ marginTop: '20%', fontFamily: 'nunito-regular', color: '#352166' }}>Apagar</Text>
          </DeletButton>
        </View>

        <>
          {userType === 'craftsman' && (
            <>
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={openImagePickerAsync}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ImageBackground
                      source={{ uri: caminho }}
                      style={{ height: 130, width: 130 }}
                      imageStyle={{ borderRadius: 100 }}
                    >
                      <View>
                        <Image
                          source={{ uri: 'http://cdn.onlinewebfonts.com/svg/img_258083.png' }}
                          style={{ height: 130, width: 130, opacity: 0.1 }}
                        />
                        <Icon name='camera' size={40} color='#D6692B' style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: '35%',
                          marginTop: '-35%'
                        }} />
                      </View>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                {list ? (<Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>{list.name}</Text>) : (null)}

              </View>

              {list ? (
                <>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                      name="name"
                      type="name"
                      label="Nome"
                      defaultValue={list.name}
                      onChangeText={(txt) => setList({ ...list, name: txt })}
                    />
                    <Input
                      name="cpf"
                      type="cpf"
                      label="CPF"
                      defaultValue={list.cpf}
                      onChangeText={(txt) => setList({ ...list, cpf: txt })}
                    />
                    <Input
                      name="phone"
                      type="phone"
                      label="Telefone"
                      defaultValue={list.phone}
                      onChangeText={(txt) => setList({ ...list, phone: txt })}
                    />

                    {address ? (
                      <>
                        <Text style={{ color: '#d6692b', marginBottom: '2%' }}>Endereço</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Input
                            name="street"
                            type="text"
                            label="Rua"
                            size="48%"
                            defaultValue={address.street}
                            onChangeText={(txt) => setAddress({ ...address, street: txt })}
                          />
                          <Input
                            name="number"
                            type="text"
                            label="Número"
                            size="48%"
                            defaultValue={address.number}
                            onChangeText={(txt) => setAddress({ ...address, number: txt })}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Input
                            name="neighborhood"
                            type="text"
                            label="Bairro"
                            size="48%"
                            defaultValue={address.neighborhood}
                            onChangeText={(txt) => setAddress({ ...address, neighborhood: txt })}
                          />
                          <Input
                            name="zipcode"
                            type="text"
                            label="CEP"
                            size="48%"
                            defaultValue={address.zipcode}
                            onChangeText={(txt) => setAddress({ ...address, zipcode: txt })}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Input
                            name="city"
                            type="text"
                            label="Cidade"
                            size="48%"
                            defaultValue={address.city}
                            onChangeText={(txt) => setAddress({ ...address, city: txt })}
                          />
                          <Text
                            style={{
                              color: '#d6692b',
                              marginBottom: '5%',
                              fontWeight: 'bold',
                            }}
                          >
                            -
                            </Text>
                          <Input
                            name="state"
                            type="text"
                            label="Estado"
                            size="48%"
                            defaultValue={address.state}
                            onChangeText={(txt) => setAddress({ ...address, state: txt })}
                          />
                        </View>
                        <AlertText>Alterar somente após 90 dias</AlertText>
                      </>
                    ) : (null)}

                    <Input
                      name="e-mail"
                      type="e-mail"
                      label="E-mail"
                      defaultValue={list.email}
                      onChangeText={(txt) => setList({ ...list, email: txt })}
                    />

                  </Form>
                </>
              ) : (null)}


            </>
          )}

          {userType === 'donorCompany' && (

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
                {list ? (<Text style={{ marginTop: 10, marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>{state.name}</Text>) : (null)}
              </View>

              {list ? (
                <>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                      name="name"
                      type="name"
                      label="Nome"
                      defaultValue={state.name}
                      onChangeText={(txt) => setList({ ...list, name: txt })}
                    />
                    <Input
                      name="cnpj"
                      type="cnpj"
                      label="CNPJ"
                      value={state.cnpj}
                      onChangeText={(txt) => setList({ ...list, cnpj: txt })}
                    />
                    <Input
                      name="phone"
                      type="phone"
                      label="Telefone"
                      value={state.phone}
                      onChangeText={(txt) => setList({ ...list, phone: txt })}
                    />

                    {address ? (
                      <>
                        <Text style={{ color: '#d6692b', marginBottom: '2%' }}>Endereço</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Input
                            name="street"
                            type="text"
                            label="Rua"
                            size="48%"
                            value={state.street}
                            onChangeText={(txt) => setAddress({ ...address, street: txt })}
                          />
                          <Input
                            name="number"
                            type="text"
                            label="Número"
                            size="48%"
                            value={state.number}
                            onChangeText={(txt) => setAddress({ ...address, number: txt })}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Input
                            name="neighborhood"
                            type="text"
                            label="Bairro"
                            size="48%"
                            value={state.neighborhood}
                            onChangeText={(txt) => setAddress({ ...address, neighborhood: txt })}
                          />
                          <Input
                            name="zipcode"
                            keyboardType="numeric"
                            label="CEP"
                            size="48%"
                            value={state.zipcode}
                            onChangeText={(txt) => setAddress({ ...address, street: txt })}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Input
                            name="city"
                            type="text"
                            label="Cidade"
                            size="48%"
                            value={state.city}
                            onChangeText={(txt) => setAddress({ ...address, city: txt })}
                          />
                          <Text
                            style={{
                              color: '#d6692b',
                              marginBottom: '5%',
                              fontWeight: 'bold',
                            }}
                          >
                            -
                            </Text>
                          <Input
                            name="state"
                            type="text"
                            label="Estado"
                            size="48%"
                            value={state.state}
                            onChangeText={(txt) => setAddress({ ...address, state: txt })}
                          />
                        </View>
                        <AlertText>Alterar somente após 90 dias</AlertText>
                      </>
                    ) : (null)}

                    <Input
                      name="e-mail"
                      type="e-mail"
                      label="E-mail"
                      value={state.email}
                      onChangeText={(txt) => setList({ ...list, email: txt })}
                    />

                  </Form>
                </>
              ) : (null)}


            </>
          )}
        </>

      </View>
    </ScrollView >
  </>
)
};

export default MinhaConta;

