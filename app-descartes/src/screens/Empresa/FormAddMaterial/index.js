import React from 'react';
import { Form } from '@unform/mobile';
import { View, StyleSheet } from 'react-native';
import { Feather} from '@expo/vector-icons';

import Imput from '../../../components/Input';
import Button from '../../../components/Button';

const FormAddMaterial = () => {
  return (
    <View 
    style={styles.container}>

      <Form>
      <Imput 
       name="Tipo"
       label="Tipo de Material"
      />
      <Imput 
       name="Qtd/Tam"
       label="Quantidade/Tamanho"
      />
      <Imput 
       name="Disponibilidade" 
       type=""
       label="Disponibilidade" 
       />

      <Button 
      title={<Feather name="plus" size={30} color="white" />}
      size="60px"
      color="green"
      onPress={""}
      style={styles.botao}
      />
      

      <View style={styles.ViewBotoes}>
        <Button 
      title="cancelar"
      size="150px"
      color="purple" 
      onPress={""}
      />
      <Button 
      title="cadastrar"
      size="150px"
      color="purple"
      onPress={""}
      />
      </View>

      </Form>
    </View>
    
  );
 
};

export default FormAddMaterial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 330,
    marginLeft: 25,
    marginRight: 25,

  },
  botao: {
    position: 'absolute',
    marginLeft: 265,
    bottom: -45,
    borderRadius: 30
  }
  ,
  ViewBotoes: {
    bottom: -30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
