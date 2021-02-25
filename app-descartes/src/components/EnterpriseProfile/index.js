import React from 'react';
import { View, Image } from 'react-native';

import { Container, GraficaMonstro, Foot, Info, Icons } from './styles';

const EnterpriseProfile = () => {

  return (
  <View>  
    <Container>
        <GraficaMonstro>Gráfica Monstro</GraficaMonstro>   
        

        <Info>
            <Icons>
                <Image source={require('../../assets/gps.png')} />
            </Icons>
            Rua Tabelião Éneas, 678
        </Info>

        <Info>(88)983162839</Info>
        <Info>diretoria@graficamonstro.com.br</Info>
         
    </Container>
    <Foot>
    </Foot>
  </View>  
  );
};

export default EnterpriseProfile;
