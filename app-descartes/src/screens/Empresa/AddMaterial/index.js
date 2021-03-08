import React from 'react';
import { Form } from '@unform/mobile';
import { Button, View } from 'react-native';

import Button from '../../../components/Button';
import Imput from '../../../components/Input';

const AddMaterial = () => {
  return (
    <View>
      <Form>
      <Imput name="Tipo do Material" />
      <Imput name="Quantidade/Tamanho" />
      <Imput name="Disponibilidade" />

      <Button 
      title="+"
      size=""
      color=""
      />

      <Button 
      title="CANCELAR"
      size=""
      color="" 
      />
      <Button 
      title="CADASTRAR"
      size=""
      color="" 
      />

      </Form>
    </View>
    
  );
 
};

export default AddMaterial;
