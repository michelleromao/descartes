import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../routes/context';
import { Donations, Announce, LogOut, Collections } from '../Icon';
import Button from '../Button';
import {
  Body,
  Container,
  Header,
  TextHeader,
  ButtonBody,
  TextBody,
  Benefits,
  TextBenefits,
  BackgroundColor,
  Modal,
  TextModal,
  GroupButton,
} from './styles';

const Drawer = () => {
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [state, setState] = useState(false);
  const [userType, setUserType] = useState(null);

  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    setUserType(response);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setState(false);
  }, []);

  useEffect(() => {
    getUserType();
    handleCloseDrawer();
  }, [getUserType, handleCloseDrawer]);

  return (
    <>
      {state ? (
        <BackgroundColor>
          <Modal>
            <TextModal>Deseja deslogar da conta?</TextModal>
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
                onPress={() => signOut()}
              />
            </GroupButton>
          </Modal>
        </BackgroundColor>
      ) : (
        false
      )}
      <Container>
        <Header>
          <TextHeader>Nome do usuário</TextHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="close" size={30} color="#352166" />
          </TouchableOpacity>
        </Header>
        <Body>
          {userType === 'artesao' && (
            <>
              <ButtonBody>
                <Collections />
                <TextBody>Minhas coletas</TextBody>
              </ButtonBody>
              {/*
          <ButtonBody>
            <Announce />
            <TextBody>Meus anúncios</TextBody>
          </ButtonBody>
          */}
              <ButtonBody onPress={() => setState(true)}>
                <LogOut />
                <TextBody>Logout</TextBody>
              </ButtonBody>
            </>
          )}
          {userType === 'empresaDoadora' && (
            <>
              <ButtonBody>
                <Donations />
                <TextBody>Minhas doações</TextBody>
              </ButtonBody>
              {/*
          <ButtonBody>
            <Announce />
            <TextBody>Meus anúncios</TextBody>
          </ButtonBody>
          */}
              <ButtonBody onPress={() => setState(true)}>
                <LogOut />
                <TextBody>Logout</TextBody>
              </ButtonBody>
            </>
          )}
          <Benefits>
            <TextBenefits>Conheça e adquira benefícios!</TextBenefits>
          </Benefits>
        </Body>
      </Container>
    </>
  );
};

export default Drawer;
