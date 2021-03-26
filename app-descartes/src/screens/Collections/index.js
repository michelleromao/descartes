import React, {useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { firestore } from '../../services/outrofirebase';
import { Text } from 'react-native';

import Residue from "../../components/Residue";
import Swipe from '../../components/Swipe';

import { Container, Btn, ButtonText } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const Collections = () => {
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(1);
  const [residues, setResidues] = useState({requested:[]});
  const [requested, setRequested] = useState({requested:[]});


  const getResidues = useCallback(async() => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const residueShot = await firestore.collection('residues').get();
    const userShot = await firestore.collection('users').get();
    const materialShot = await firestore.collection('materials').get();
    var residueArr = [];
    residueShot.forEach(doc => {
      if(doc.data().id_craftsman === response){
        residueArr.push({
          id: doc.id,
          disponibility: doc.data().disponibility,
          id_company: doc.data().id_company,
          id_craftsman: doc.data().id_craftsman,
          id_material: doc.data().id_material,
          quantity: doc.data().quantity ? doc.data().quantity : doc.data().size,
          status: doc.data().statusResidue === 'requested' ? 'requested' :
          doc.data().statusResidue === 'collected' ? 'collected' : '',
        });
      }
    });
    materialShot.forEach(doc => {
      residueArr.forEach((residue, i) => {
        if(doc.id === residue.id_material){
          residueArr[i] = {
            id: residue.id,
            disponibility: residue.disponibility,
            id_company: residue.id_company,
            id_craftsman: residue.id_craftsman,
            id_material: residue.id_material,
            material: doc.data().type,
            quantity: residue.quantity,
            status: residue.status
          }
        }
      })
    });
    userShot.forEach(doc => {
      residueArr.forEach((residue, i) => {
        if(doc.id === residue.id_craftsman){
          residueArr[i] = {
            id: residue.id,
            disponibility: residue.disponibility,
            id_company: residue.id_company,
            id_craftsman: residue.id_craftsman,
            craftsman: doc.data().name,
            id_material: residue.id_material,
            material: residue.material,
            quantity: residue.quantity,
            status: residue.status
          }
        }
      })
    })
    userShot.forEach(doc => {
      residueArr.forEach((residue, i) => {
        if(doc.id === residue.id_company){
          residueArr[i] = {
            id: residue.id,
            disponibility: residue.disponibility,
            id_company: residue.id_company,
            company: doc.data().name,
            id_craftsman: residue.id_craftsman,
            craftsman: residue.craftsman,
            id_material: residue.id_material,
            material: residue.material,
            quantity: residue.quantity,
            status: residue.status
          }
        }
      })
    })
    var requestedArr = [];
    residueArr.forEach((item) => {
      if(item.status === 'requested'){
        requestedArr.push(item);
      }
    })
    setRequested({requested:requestedArr});
    setResidues({requested:residueArr});
  }, []);

  const handleRequested = useCallback(() => {
    setIndex(1);
  }, []);

  const handleCollected = useCallback(() => {
    setIndex(2);
  }, []);

  useEffect(() => {
    if(isFocused){
      getResidues();
    }
  }, [getResidues, isFocused]);
  return (
    <>
      <Container>
        <Btn onPress={() => handleRequested()} active={index === 1}>
          <ButtonText active={index === 1}>Solicitadas</ButtonText>
        </Btn>
        <Btn onPress={() => handleCollected()} active={index === 2}>
          <ButtonText active={index === 2}>Coletadas</ButtonText>
        </Btn>
      </Container>

      {index === 1 &&
        requested.requested &&
          <ScrollView>
            <Swipe type="collection" list={requested} />
          </ScrollView>
      }
      {index === 2 &&
      <>
        {residues.requested &&
        <>
          <ScrollView>
            {
              residues.requested.map(item => {
                if(item.status === 'collected'){
                  return (
                    <>
                      <Residue
                        key={item.id}
                        id={item.id}
                        disponibility={item.disponibility}
                        material={item.material}
                        quantity={item.quantity}
                        screen="collections"
                        status={item.status}
                      />
                    </>
                  )
              }})
            }
          </ScrollView>
          </>
        }
        </>
      }
    </>
  )
}
export default Collections;
