import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';

import Button from '../../../../components/Button';

const Botao = () => {
  return (
      <View>
        <Button 
        title={<Feather name="plus" size={30} color="white" />}
        size="60px"
        color="green"
        //onPress={""}
        style={styles.botao}
        />
    </View>
  );
};

export default Botao;

const styles = StyleSheet.create({
    botao: {
        position: 'absolute',
        marginLeft: 290,
        bottom: 40,
        borderRadius: 30
      }
});
