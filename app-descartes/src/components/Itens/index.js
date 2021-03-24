import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';

function Itens() {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
       
      <CheckBox 
            disabled={false}
            value={value}
            tintColors={{ true: '#ff0000' }}
            onValueChange={(newvalue) =>
            setValue({
              newvalue,
              })
            }
      />  
      <Text style={styles.text}>Papel - 100gr</Text> 
      </View>
          
    </View>
  );
}

export default Itens;