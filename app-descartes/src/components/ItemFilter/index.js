import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Container, ButtonType, TextType } from './styles';

const FilterBy = ({key, item, clickType, selected}) => {
  const [type, setType] = useState();

  const handleClickType = useCallback(async (material) => {
    setType(material);
    if(type === material){
      clickType(material);
    }else{
      clickType('');
    }
  },[type, selected]);

  return (
    <>
        <Container key={key}>
          <ButtonType  selected={selected} onPress={() => handleClickType(item)}>
            <TextType selected={selected}>{item}</TextType>
          </ButtonType>
        </Container>
    </>
  );
};

export default FilterBy;
