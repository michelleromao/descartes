import React, { useState, useCallback, useEffect, useRef } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { ScrollView, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { firestore } from '../../../services/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Form } from '@unform/mobile';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Picker from '../../../components/Picker';


import {
  BackgroundColor,
  Modal,
  TextModal,
  GroupButton,
} from '../../../components/Drawer/styles';

const EditMaterial = () => {
  const formRef = useRef(null);
  const navigation = useNavigation();
  const routes = useRoute();
  const [state, setState] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState(" ");

  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date(routes.params.disponibility.split("/")[2],Number(routes.params.disponibility.split("/")[1]-1),routes.params.disponibility.split("/")[0]));
  const [modeDate, setModeDate] = useState('date');
  const [dateFormated, setDateFormated] = useState(routes.params.disponibility);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    var formated = format(currentDate, "dd/MM/yyyy", {timeZone: 'Brasilia/Brasil'})
    setDateFormated(formated);
  };

  const showMode = (currentMode) => {
    setShowDate(true);
    setModeDate(currentMode);
  };

  const getUserType = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_Key');
    const uid = await AsyncStorage.getItem('@storage_uid');
    setUserUid(uid);
    setUserType(response);
  }, []);

  const getMaterialTyps = useCallback(async () => {
    const materialRef = await firestore.collection("materials").get();
    let materialArr = [];
    materialRef.forEach(doc => {
      materialArr.push({
        value:doc.id,
        label: doc.data().type
      })
    })
    setMaterials(materialArr);
    materialArr.forEach((item) => {
      if(item.label === routes.params.material){
        setMaterial(item.value);
      }
    })

  }, []);

  const handleCloseDrawer = useCallback(() => {
    setState(false);
  }, []);

  const handleSubmit = useCallback(async (data) =>{
    console.log(data);
    if(routes.params.quantity !== "" &&
      routes.params.quantity !== undefined ||
      data.quantity !== "" &&
      data.quantity !== undefined &&
      data.type !== "" &&
      data.type !== undefined &&
      dateFormated !== " "){
        const docRef = firestore.collection("residues").doc(routes.params.id);
        await docRef.update({
          disponibility: dateFormated,
          id_material: data.type,
          quantity: data.quantity || routes.params.quantity,
        })
        navigation.goBack();
      }else{
        Alert.alert(
          'Ops!',
          'Nenhum campo pode estar vazio.',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false },
        );

      }
  }, [dateFormated]);

  useEffect(() => {
    getUserType();
    handleCloseDrawer();
    getMaterialTyps();
  }, [getUserType, handleCloseDrawer, getMaterialTyps, dateFormated]);

  return (

    <>
    {state ? (
        <BackgroundColor>
          <Modal>
            <TextModal>Deseja cancelar a edição?</TextModal>
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
                onPress={() => navigation.goBack()}
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
        {material !== " " ?
          <Form ref={formRef} onSubmit={handleSubmit}>
              <Picker label="Tipo de material" name="type" items={materials} value={material} />
            <Input
              name="quantity"
              label="Quantidade/Tamanho"
              defaultValue={routes.params.quantity}
            />
            <TouchableOpacity style={styles.disponibility} onPress={() => showMode()}>
              <Text style={styles.disponibilityText}>Disponibilidade</Text>
              {dateFormated !== "" ?
                <Text style={styles.disponibilityDate}>{dateFormated}</Text>
              : false}
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={modeDate}
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}

          </Form>
        :
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
        }
      </View>

      <View style={styles.ViewBotoes}>
      <Button
          title="cancelar"
          size="150px"
          color="purple"
          onPress={() => setState(true)}
        />
        <Button
          title="editar"
          size="150px"
          color="purple"
          onPress={() => formRef.current.submitForm()}
        />
      </View>
    </ScrollView>


    </>

      );

};

export default EditMaterial;
