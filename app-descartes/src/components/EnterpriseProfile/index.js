import React from 'react';

import {
  View, 
  Card, 
  Text, 
  CardFoot, 
  InfoText1, 
  Image, 
  StampImage, 
  IconImage1, 
  IconImage2, 
  InfoText2 ,
  IconImage3,
  InfoText3
} from './styles';

const EnterpriseProfile = () => {

  return (
    <View>
      <Card>
        <Image source={require('../../assets/LogoMonster.png')} />
        <Text>Gráfica Monstro</Text>
        <StampImage source={require('../../assets/selo1.png')} />

        <IconImage1 
        source={require('../../assets/gps.png')} />
        <InfoText1>Rua Tabelião Enéas, 678</InfoText1>

        <IconImage2 source={require('../../assets/phone.png')} />
        <InfoText2>(88)983162839</InfoText2>

        <IconImage3 source={require('../../assets/mail.png')} />
        <InfoText3>diretoria@graficamonstro.com.br</InfoText3>
        
      </Card>
      <CardFoot>
        
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
