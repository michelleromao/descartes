import React, { useRef, useState, useCallback } from 'react';
import {useNavigation, useRoute} from "@react-navigation/native";

import { View, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import { Container, Form, FilterButton} from './styles';

import Search from '../Search';

const MapHeader = ({ children }) => {
  const formRef = useRef(null);
  const navigation = useNavigation();

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
    <Container>
      {children}
      <Form ref={formRef} onSubmit={handleSubmit}>
        <View style={{ flex: 1 }}>
          <Search name="search" placeholder="Faça uma pesquisa...">
            <TouchableOpacity onPress={() => formRef.current.submitForm()}>
              <Ionicons name="search" size={24} color="#352166" />
            </TouchableOpacity>
          </Search>
        </View>
      </Form>
      <FilterButton onPress={() => navigation.navigate('FilterBy')}>
        <Feather name="filter" size={30} color="#352166" />
      </FilterButton>
    </Container>
    </>
  );
};

export default MapHeader;
