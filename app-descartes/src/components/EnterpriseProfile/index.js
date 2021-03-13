import React from 'react';

import {
  View, 
  Card, 
  CardFoot, 
  Logo, 
  LogoText, 
  StampImage,
  Address, 
  AddressIcon,  
  PhoneIcon, 
  Phone,
  EmailIcon,
  Email,
  Leavings,
  NumLeavings,
  Negotiations,
  NumNegotiations,
} from './styles';

const EnterpriseProfile = () => {

  return (
    <View>
      <Card>
        <Logo source={require('../../assets/LogoMonster.png')} />
        <LogoText>Gráfica Monstro</LogoText>
        <StampImage source={require('../../assets/selo1.png')} />

        <AddressIcon source={require('../../assets/gps.png')} />
        <Address>Rua Tabelião Enéas, 678</Address>

        <PhoneIcon source={require('../../assets/phone.png')} />
        <Phone>(88)983162839</Phone>

        <EmailIcon source={require('../../assets/mail.png')} />
        <Email>diretoria@graficamonstro.com.br</Email>
        
      </Card>

      <CardFoot>
        <Leavings>Resíduos</Leavings>
        <NumLeavings>0000000</NumLeavings>
        <Negotiations>Negociações</Negotiations>
        <NumNegotiations>0000000</NumNegotiations>
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
