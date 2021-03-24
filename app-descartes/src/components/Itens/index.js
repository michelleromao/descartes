import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';

function Itens() {
  const [value, setValue] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Papel - 100gr</Text> 
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
      </View>

      <Text style={styles.text}>Papelão - 10kg</Text>
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
      </View>

      <Text style={styles.text}>Tecido - 100m</Text>
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
      </View>
          
    </View>
  );
}

export default Itens;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      width: '100%',
      padding: 16,
      paddingTop: 100,
    },
    wrapper: {
      display: 'flex',
      justifyContent:'space-around',
      flexDirection: 'row',
      alignContent: 'center',
      paddingVertical: 5,
    },
    text: {
      lineHeight: 30,
      marginLeft: 10,
      color:'#ff0000',
      
    },
  });