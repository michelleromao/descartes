import React from 'react';
import {Image, TouchableOpacity } from 'react-native';
import {View, Card, Text, CardFoot, GraficaMonstro } from './styles';

const EnterpriseProfile = () => {

  return (
    <View>
      <Card>
        <Image source={require('../../assets/LogoMonster.png')} />

        <Text>Gráfica Monstro</Text>
        
      </Card>
      <CardFoot>
        
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
