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
  Row,
  Row2,
  Collumn,
  Collumn2,
  Initial,
  Divider
} from './styles';

const EnterpriseProfile = () => {

  return (
    <View>
      <Card>
        <Collumn>
          <Row>
            <Initial>
              <Logo source={require('../../assets/LogoMonster.png')} />
              <LogoText>Gráfica Monstro</LogoText>
            </Initial>
            <StampImage source={require('../../assets/selo1.png')} />
          </Row>
          <Row2>
            <AddressIcon source={require('../../assets/gps.png')} />
            <Address>Rua Tabelião Enéas, 678</Address>
          </Row2>
          <Row2>
            <PhoneIcon source={require('../../assets/phone.png')} />
            <Phone>(88)983162839</Phone>
          </Row2>
          <Row2>
            <EmailIcon source={require('../../assets/mail.png')} />
            <Email>diretoria@graficamonstro.com.br</Email>
          </Row2>
        </Collumn>
      </Card>

      <CardFoot>
        <Collumn2>
          <Leavings>Resíduos</Leavings>
          <NumLeavings>0000000</NumLeavings>
        </Collumn2>
        <Divider />
        <Collumn2>
          <Negotiations>Negociações</Negotiations>
          <NumNegotiations>0000000</NumNegotiations>
        </Collumn2>
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
