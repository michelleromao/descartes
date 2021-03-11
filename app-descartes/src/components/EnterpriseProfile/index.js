import React from 'react';

import {View, Card, Text, CardFoot, InfoText, Image, StampImage, IconImage, GraficaMonstro } from './styles';

const EnterpriseProfile = () => {

  return (
    <View>
      <Card>
        <Image source={require('../../assets/LogoMonster.png')} />
        <Text>Gráfica Monstro</Text>
        <StampImage source={require('../../assets/selo1.png')} />

        <IconImage source={require('../../assets/gps.png')} />
        <InfoText>Rua Tabelião Enéas, 678</InfoText>

        <IconImage source={require('../../assets/phone.png')} />
        <InfoText>(88) 983162839</InfoText>

        <IconImage source={require('../../assets/mail.png')} />
        <InfoText>diretoria@graficamonstro.com.br</InfoText>
        
      </Card>
      <CardFoot>
        
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
