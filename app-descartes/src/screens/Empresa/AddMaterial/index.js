import React from 'react';
import { ScrollView } from 'react-native';

import FormAddMaterial from './FormAddMaterial';
import Botao from './Botao';
import Botoes from './Botoes';

const AddMaterial = () => {
  return (

    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <FormAddMaterial />
      <Botao />
      <Botoes />
     
    </ScrollView>
  );
 
};

export default AddMaterial;
