import React from 'react';
import { View, Button } from 'react-native';
import { AuthContext } from '../../routes/context';

const MinhaConta = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Sair" onPress={() => signOut()} />
    </View>
  );
};

export default MinhaConta;
