import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import { Form } from '@unform/mobile';
import api from '../../../services/tomtom';
import { auth, firestore } from '../../../services/firebase';
import { AuthContext } from '../../../routes/context';

import Input from '../../../components/Input';
import InputMask from '../../../components/InputMask';

import Button from '../../../components/Button';

import LogoDescartes from '../../../assets/logo.png';
import {
  AddressInformation,
  Logo,
  BackgroundColor,
  Modal,
  TitleModal,
  TextModal,
  GroupButton,
} from './styles';

const Dados = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userUid, setUserUid] = useState('');
  const [user, setUser] = useState({});

  const { userType } = route.params;
  const { signUp } = React.useContext(AuthContext);

  const handleOpenModal = useCallback(() => {
    setState(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setState(false);
  }, []);
  const handleBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => handleOpenModal()}
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}
        >
          <Entypo name="chevron-left" size={20} color="#352166" />
          <Text style={{ fontSize: 16, color: '#352166' }}>Voltar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleOpenModal]);

  useEffect(() => {
    const backAction = () => {
      setState(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleSubmit = useCallback(
    async data => {
      if (userType === 'PJ') {
        if (
          data.street === undefined ||
          data.street === '' ||
          data.number === undefined ||
          data.number === '' ||
          data.neighborhood === undefined ||
          data.neighborhood === '' ||
          data.zipcode === undefined ||
          data.zipcode === '' ||
          data.city === undefined ||
          data.city === '' ||
          data.state === undefined ||
          data.state === '' ||
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
          data.street === undefined ||
          data.street === '' ||
          data.number === undefined ||
          data.number === '' ||
          data.neighborhood === undefined ||
          data.neighborhood === '' ||
          data.zipcode === undefined ||
          data.zipcode === '' ||
          data.city === undefined ||
          data.city === '' ||
          data.state === undefined ||
          data.state === '' ||
          data.email === undefined ||
          data.cpf === '' ||
          data.cpf === undefined ||
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
          setLoading(true);
          auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(userCreated => {
              setUserUid(userCreated.user.uid);
              setUser(data);
            })
            .catch(error => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert('Não foi possível criar conta, tente novamente');
            });
        }
      }
    },
    [navigation, userType],
  );

  useEffect(() => {
    const createUser = async () => {
      if (userUid !== '') {
        if (userType === 'PF') {
          const latLon = await api.get(
            `/search/2/geocode/${user.street}, ${user.number}, ${user.neighborhood}, ${user.city} - ${user.state}, ${user.zipcode}.json?key=YW37icIJXgNbctLpBNUfH7KZEIoaOsQJ&language=pt-BR&limit=1`,
          );

          const docRef = firestore.collection('users').doc(userUid);
          const addressRef = firestore.collection('addresses').doc(userUid);

          await docRef.set({
            cnpj: '',
            cpf: user.cpf,
            email: user.email,
            id: userUid,
            id_photo: '',
            name: user.name,
            phone: user.phone,
            seal: '',
            type_company: '',
            type_user: 'craftsman',
          });
          await addressRef.set({
            city: user.city,
            id_user: userUid,
            lat: latLon.data.results[0].position.lat,
            lon: latLon.data.results[0].position.lon,
            neighborhood: user.neighborhood,
            number: user.number,
            state: user.state,
            street: user.street,
            zipcode: user.zipcode,
          });
          AsyncStorage.setItem('@storage_Key', 'craftsman');
          AsyncStorage.setItem('@storage_uid', userUid);

          signUp();
          setLoading(false);
        }
      }
    };
    createUser();
  }, [
    user.cpf,
    user.phone,
    user.name,
    user.email,
    userType,
    userUid,
    signUp,
    user.city,
    user.neighborhood,
    user.number,
    user.state,
    user.street,
    user.zipcode,
  ]);

  return (
    <>
      {state ? (
        <BackgroundColor>
          <Modal>
            <TitleModal>Deseja voltar?</TitleModal>
            <TextModal>
              Você irá perder os campos que você preencheu. Voltar mesmo assim?
            </TextModal>

            <GroupButton>
              <Button
                title="Não"
                color="orange"
                size="48%"
                onPress={() => handleCloseModal()}
              />
              <Button
                title="Sim"
                color="green"
                size="48%"
                onPress={() => handleBackNavigation()}
              />
            </GroupButton>
          </Modal>
        </BackgroundColor>
      ) : (
        false
      )}
      <ScrollView keyboardShouldPersistTaps="handled">
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
              marginTop: '25%',
            }}
          >
            <Logo source={LogoDescartes} />
            <Form ref={formRef} onSubmit={handleSubmit}>
              {userType === 'PF' && (
                <>
                  <Input name="name" type="text" label="Nome" required />
                  <InputMask
                    type="cpf"
                    name="cpf"
                    keyboardType="numeric"
                    label="CPF"
                    required
                  />
                  <InputMask
                    type="cel-phone"
                    name="phone"
                    keyboardType="numeric"
                    label="Telefone"
                    required
                  />

                  <Text style={{ color: '#d6692b', marginBottom: '2%' }}>
                    Endereço
                  </Text>
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
                      required
                      size="48%"
                    />
                    <Input
                      name="number"
                      type="text"
                      label="Número"
                      required
                      size="48%"
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
                      required
                      size="48%"
                    />
                    <InputMask
                      type="zip-code"
                      name="zipcode"
                      keyboardType="numeric"
                      label="CEP"
                      required
                      size="48%"
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
                      required
                      size="48%"
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
                      required
                      size="48%"
                    />
                  </View>
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
                  <InputMask
                    name="cnpj"
                    type="cnpj"
                    label="CNPJ"
                    keyboardType="number-pad"
                    required
                  />
                  <InputMask
                    type="cel-phone"
                    name="phone"
                    keyboardType="numeric"
                    label="Telefone"
                    required
                  />
                  <Text style={{ color: '#d6692b', marginBottom: '2%' }}>
                    Endereço
                  </Text>
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
                      required
                      size="48%"
                    />
                    <Input
                      name="number"
                      type="text"
                      label="Número"
                      required
                      size="48%"
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
                      required
                      size="48%"
                    />
                    <InputMask
                      type="zip-code"
                      name="zipcode"
                      keyboardType="numeric"
                      label="CEP"
                      required
                      size="48%"
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
                      required
                      size="48%"
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
                      required
                      size="48%"
                    />
                  </View>
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
        )}
      </ScrollView>
    </>
  );
};

export default Dados;
