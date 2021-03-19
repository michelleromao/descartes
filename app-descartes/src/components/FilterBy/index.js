import React, { useState,useEffect, useCallback } from 'react';
import { firestore } from '../../services/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import { useNavigation, useIsFocused} from "@react-navigation/native";
import { AntDesign, Entypo } from '@expo/vector-icons';

import {Container, Modal, Header, TitleModal, List, TextModal, CloseButton, ButtonChevron,Content  } from './styles';
import Button from '../Button';
import ItemFilter from '../ItemFilter';


const FilterBy = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [types, setTypes] = useState();
  const [showTypes, setShowTypes] = useState(false);
  const [type, setType] = useState('');

  const handleChevron = useCallback(() => {
    if(showTypes === true){
      setShowTypes(false)
    }else{
      setShowTypes(true)
      setType('')
    }
  }, [showTypes]);

  const getMaterialTypes = useCallback(async () => {
    const snapshot = await firestore.collection("materials").get();
    var typesArr = [];
    snapshot.forEach(doc => {
      typesArr.push({id:doc.data.id, type:doc.data().type});
    });
    setTypes(typesArr);
  }, []);

  useEffect(() => {
    if(isFocused){
      getMaterialTypes();
    }
  }, [isFocused, getMaterialTypes]);

  const handleType = useCallback(async (material) => {
    setType(material);
    if(type !== material){
      setType(material);
    }else{
      setType('');
    }
  }, [type]);

  const handleFilter = useCallback(() => {
    navigation.navigate("Home");
  },[]);

  return (
    <>
        <Container>
          <Modal>
            <Header>
              <TitleModal>Filtrar por</TitleModal>
              <CloseButton onPress={() => navigation.navigate('Home')}>
                <AntDesign name="close" size={30} color="#D6692B" />
              </CloseButton>
            </Header>
            <List>
              <ButtonChevron onPress={() => handleChevron()}>
                <TextModal>Tipo</TextModal>
                {showTypes ?
                  <Entypo name="chevron-small-up" size={20} color="#352166" />
                :
                  <Entypo name="chevron-small-down" size={20} color="#352166" />
                }
              </ButtonChevron>
               <Content>
                 <ScrollView>
                {showTypes ?
                    types && types.map((item) => {
                      return(
                        <ItemFilter key={item.id} item={item.type} clickType={() => handleType(item.type)} selected={type === item.type ? true : false}/>
                      )
                    })
                  : false}
                 </ScrollView>
              </Content>
            </List>
            <Button disabled={type !== '' ? false : true} title="filtrar" color="purple" size={"90%"} onPress={() => handleFilter()} mBottom={'20px'}/>
          </Modal>
        </Container>
    </>
  );
};

export default FilterBy;
