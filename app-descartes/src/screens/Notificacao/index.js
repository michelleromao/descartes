import React from 'react';
import { View, Text } from 'react-native';

import Swipe from '../../components/Swipe';


const data = {
  notifications: [
    {
      id: 1,
      title: 'Gráfica monstro ',
      details: 'colocou 10kg de papel',
    },
    {
      id: 2,
      title: 'Artesao ',
      details: 'solicitou 10kg de papel',
    },
  ],
};

const Notificacao = () => {
  return (
    <>
      {data.notifications.length !== 0 ? (
        <View style={{ width: '100%' }}>
          <Swipe color="yellow" type="notifications" list={data && data} />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: 33,
          }}
        >
          <Text style={{ color: '#D6692B' }}>Você não possui notificações</Text>
        </View>
      )}
    </>
  );
};

export default Notificacao;
