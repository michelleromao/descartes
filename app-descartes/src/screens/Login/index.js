import React from 'react';
import { View, Button } from 'react-native';
import { AuthContext } from '../../routes/context';

const Login = () => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Entrar" onPress={() => signIn()} />
    </View>
  );
};

export default Login;
