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

import Seal1 from "../../assets/seals/green.png"
import Seal2 from "../../assets/seals/orange.png"
import Seal3 from "../../assets/seals/yellow.png"


const EnterpriseProfile = ({name, street, number, phone, email, donated, added, photo}) => {

  return (
    <View>
      <Card>
        <Collumn>
          <Row>
            <Initial>
              <Logo source={{uri: photo}} />
              <LogoText>{name}</LogoText>
            </Initial>
            {
              donated < 100 ?
                false
              : donated >= 100 && donated < 500 ?
                <StampImage source={Seal2} />
              : donated >= 500 && donated < 100 ?
                <StampImage source={Seal3} />
              : <StampImage source={Seal1} />
            }
          </Row>
          <Row2>
            <AddressIcon source={require('../../assets/gps.png')} />
            <Address>{`${street}, ${number}`}</Address>
          </Row2>
          <Row2>
            <PhoneIcon source={require('../../assets/phone.png')} />
            <Phone>{phone}</Phone>
          </Row2>
          <Row2>
            <EmailIcon source={require('../../assets/mail.png')} />
            <Email>{email}</Email>
          </Row2>
        </Collumn>
      </Card>
      <CardFoot>
        <Collumn2>
          <Leavings>Resíduos</Leavings>
          <NumLeavings>{added}</NumLeavings>
        </Collumn2>
        <Divider />
        <Collumn2>
          <Negotiations>Negociações</Negotiations>
          <NumNegotiations>{donated}</NumNegotiations>
        </Collumn2>
      </CardFoot>
    </View>
  );
};

export default EnterpriseProfile;
