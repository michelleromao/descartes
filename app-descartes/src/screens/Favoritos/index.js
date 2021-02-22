import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Container, Button, ButtonText } from './styles';

import Swipe from '../../components/Swipe';

const data = {
  company: [
    {
      id: 1,
      title: 'Gráfica monstro ',
      details: 'Rua Tabelião Enéas, 678',
      selo: 'Amarelo',
    },
  ],
  residue: [
    {
      id: 1,
      title: 'Papel',
    },
  ],
};

const Favoritos = () => {
  const [index, setIndex] = useState(1);

  const handleCompany = useCallback(() => {
    setIndex(1);
  }, []);

  const handleResidue = useCallback(() => {
    setIndex(2);
  }, []);

  const handleAnnounce = useCallback(() => {
    setIndex(3);
  }, []);

  return (
    <>
      <Container>
        <Button onPress={() => handleCompany()} active={index === 1}>
          <ButtonText active={index === 1}>Empresas</ButtonText>
        </Button>
        <Button onPress={() => handleResidue()} active={index === 2}>
          <ButtonText active={index === 2}>Resíduos</ButtonText>
        </Button>
        <Button onPress={() => handleAnnounce()} active={index === 3}>
          <ButtonText active={index === 3}>Anúncios</ButtonText>
        </Button>
      </Container>

      {index === 1 && (
        <View style={{ width: '100%' }}>
          <Swipe type="favoriteCompany" list={data} />
        </View>
      )}
      {index === 2 && (
        <View style={{ width: '100%' }}>
          <Swipe type="favoriteResidue" list={data} />
        </View>
      )}
      {index === 3 && (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={{ color: '#D6692B' }}>
            Você não possui anúncios favoritados
          </Text>
        </View>
      )}
    </>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
