import React from 'react';
import { Form } from '@unform/mobile';
import { View, StyleSheet } from 'react-native';

import Imput from '../../../../components/Input';

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
  }
})
