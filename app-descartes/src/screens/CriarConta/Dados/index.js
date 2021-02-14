import React from 'react';
import { View, Image } from 'react-native';

import Button from '../../../components/Button';
import LogoDescartes from '../../../assets/logo.png';

const TipoUsuario = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 25,
      }}
    >
      <Image
        source={LogoDescartes}
        style={{ marginTop: '25%', marginBottom: '50%' }}
      />

      <Button
        title="pessoa física"
        color="purple"
        onPress={() => navigation.navigate('UserType')}
      />
      <Button
        title="pessoa jurídica"
        color="purple"
        onPress={() => navigation.navigate('CompanyType')}
      />
    </View>
  );
};

export default TipoUsuario;
