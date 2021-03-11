import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../../../../components/Button';

const Botoes = () => {
  return (
      <View>
        <View style={styles.ViewBotoes}>

            <Button 
            title="cadastrar"
            size="150px"
            color="purple" 
            //onPress={""}
            />
            <Button 
            title="cancelar"
            size="150px"
            color="purple"
            //onPress={"#"}
            />

        </View>
    </View>
  );
};

export default Botoes;

const styles = StyleSheet.create({
  ViewBotoes: {
    bottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 330,
    marginLeft: 25,
    marginRight: 25,

  },
});
