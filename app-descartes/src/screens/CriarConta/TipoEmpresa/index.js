import React, { useState, useCallback, useEffect } from 'react';

import { RadioButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  ScrollView,
  BackHandler,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { auth, firestore } from '../../../services/firebase';
import { AuthContext } from '../../../routes/context';

import Button from '../../../components/Button';
import api from '../../../services/tomtom';

import LogoDescartes from '../../../assets/logo.png';
import {
  Title,
  Question,
  Logo,
  ButtonQuestion,
  TextButton,
  TextOption,
  BackgroundColor,
  Modal,
  TitleModal,
  TextModal,
} from './styles';

const TipoEmpresa = () => {
  const { signUp } = React.useContext(AuthContext);
  const route = useRoute();
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState('doadora');

  const [userUid, setUserUid] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [latLon, setLatLon] = useState({});

  const handleOpenModal = useCallback(() => {
    setModal(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  const handleSignIn = useCallback(async () => {
    const { data } = route.params;
    if (checked && data) {
      setLoading(true);
      const latiLon = await api.get(
        `/search/2/geocode/${data.street}, ${data.number}, ${data.neighborhood}, ${data.city} - ${data.state}, ${data.zipcode}.json?key=YW37icIJXgNbctLpBNUfH7KZEIoaOsQJ&language=pt-BR&limit=1`,
      );
      setLatLon({
        lat: latiLon.data.results[0].position.lat,
        lon: latiLon.data.results[0].position.lon,
      });
      auth
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(userCreated => {
          setUserUid(userCreated.user.uid);
          setUser(data);
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if(errorCode === 'auth/weak-password'){
            Alert.alert(
              'Senha fraca',
              'A senha deve ter, pelo menos, 6 caracteres.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
            setLoading(false);
          }else if(errorCode === 'auth/email-already-in-use'){
            Alert.alert(
              'E-mail já existe',
              'Esse email já está na nossa base de dados.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false },
            );
            setLoading(false);
          }
        });
    }
  }, [route, checked]);

  useEffect(() => {
    const createUser = async () => {
      if (userUid !== '') {
        const userRef = firestore.collection('users').doc(userUid);
        const addressRef = firestore.collection('addresses').doc(userUid);
        const photoRef = firestore.collection('photos').doc(userUid);

        await userRef.set({
          cnpj: user.cnpj,
          cpf: '',
          email: user.email,
          id: userUid,
          id_photo: '',
          name: user.name,
          phone: user.phone,
          seal: '',
          type_company: 'donor',
          type_user: 'donorCompany',
        });

        await addressRef.set({
          city: user.city,
          id_user: userUid,
          lat: latLon.lat,
          lon: latLon.lon,
          neighborhood: user.neighborhood,
          number: user.number,
          state: user.state,
          street: user.street,
          zipcode: user.zipcode,
        });
        let urlFirebase = "https://firebasestorage.googleapis.com/v0/b/descartespi4.appspot.com/o/Group%20216.png?alt=media&token=87fa4923-5bc8-4bd7-b116-ea3ad621e00a";
        await photoRef.set({
          id_user: userUid,
          url: urlFirebase,
        });
        AsyncStorage.setItem('@storage_Key', 'donorCompany');
        AsyncStorage.setItem('@storage_uid', userUid);
        signUp();
        setLoading(false);
      }
    };
    createUser();
  }, [
    signUp,
    user.cnpj,
    user.email,
    user.name,
    user.phone,
    user.city,
    user.neighborhood,
    user.number,
    user.state,
    user.street,
    user.zipcode,
    latLon.lat,
    latLon.lon,
    userUid,
  ]);

  return (
    <>
      {modal ? (
        <BackgroundColor>
          <Modal>
            <TitleModal>Empresa Doadora</TitleModal>
            <TextModal>
              Empresa que atuará no Descartes doando resíduos recicláveis e
              reutilizáveis para artesãos e pessoas interessadas em adquirir
              esses materiais.
            </TextModal>
            <TitleModal>Empresa Vendedora</TitleModal>
            <TextModal>
              Empresa que atuará no Descartes vendendo resíduos recicláveis e
              reutilizáveis para outras empresas que tenham interesse em
              adquirir esses materiais para fins comerciais.
            </TextModal>
            <TitleModal>Empresa Compradora</TitleModal>
            <TextModal>
              Empresa que atuará no Descartes comprando resíduos recicláveis e
              reutilizáveis de outras empresas que tem interesse em adquirir
              esses materiais pelo Marketplace do Descartes para fins
              comerciais.
            </TextModal>
            <Button title="entendi" onPress={() => handleCloseModal()} />
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
              marginLeft: 25,
              marginRight: 25,
              marginTop: '25%',
            }}
          >
            <Logo source={LogoDescartes} />
            <Title>
              <Question>Que tipo de empresa é?</Question>
              <ButtonQuestion onPress={() => handleOpenModal()}>
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
        )}
      </ScrollView>
    </>
  );
};

export default TipoEmpresa;
