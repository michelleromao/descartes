import React from 'react';
import { ScrollView } from 'react-native';

import FormAddMaterial from '../FormAddMaterial';

const AddMaterial = () => {
  return (

    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <FormAddMaterial />

    </ScrollView>
  );
 
};

export default AddMaterial;
