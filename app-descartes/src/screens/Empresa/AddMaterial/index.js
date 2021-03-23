import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import { Feather } from '@expo/vector-icons';

import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

import {
  BackgroundColor,
  Modal,
  TextModal,
  GroupButton,
} from '../../../components/Drawer/styles';

const AddMaterial = () => {
  const [state, setState] = useState(false);
  const [setUserType] = useState(null);
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
            <TextModal>Deseja cancelar cadastro?</TextModal>
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
                onPress={() => setState(false)}
              />
            </GroupButton>
          </Modal>
        </BackgroundColor>
      ) : (
        false
    )}
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
            <View
      style={styles.container}
      >
        <Form>
          <Input
          name="Tipo"
          label="Tipo de Material"
          />
          <Input
          name="Qtd/Tam"
          label="Quantidade/Tamanho"
          />
          <Input
          name="Disponibilidade"
          type=""
          label="Disponibilidade"
          />
          </Form>
        </View>

          {/*<Button
            title={<Feather name="plus" size={30} color="white" />}
            size="60px"
            color="green"
            //onPress={""}
            style={styles.botao}
          />*/}

          <View style={styles.ViewBotoes}>
            <Button
            title="cadastrar"
            size="150px"
            color="purple"
            onPress={() => setState(false)}
            />
            <Button
            title="cancelar"
            size="150px"
            color="purple"
            onPress={() => setState(true)}
            />
            </View>



    </ScrollView>


    </>

      );

};

export default AddMaterial;
