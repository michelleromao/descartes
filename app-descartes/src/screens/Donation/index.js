import React, {useState, useCallback, useEffect} from 'react';
import update from 'immutability-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { firestore } from '../../services/firebase';
import { View } from 'react-native';

import Residue from "../../components/Residue";
import Button from "../../components/Button";

import { Container, Btn, ButtonText, TitleSection } from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const Donation = () => {
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(1);
  const [residues, setResidues] = useState([]);
  const [checkeds1, setCheckeds1] = useState([]);
  const [checkeds2, setCheckeds2] = useState([]);


  const getResidues = useCallback(async() => {
    const response = await AsyncStorage.getItem('@storage_uid');
    const residueShot = await firestore.collection('residues').get();
    const userShot = await firestore.collection('users').get();
    const materialShot = await firestore.collection('materials').get();
    var residueArr = [];
    residueShot.forEach(doc => {
      if(doc.data().id_company === response){
        residueArr.push({
          id: doc.id,
          disponibility: doc.data().disponibility,
          id_company: doc.data().id_company,
          id_craftsman: doc.data().id_craftsman,
          id_material: doc.data().id_material,
          quantity: doc.data().quantity ? doc.data().quantity : doc.data().size,
          status: doc.data().statusResidue === 'requested' ? 'requested' :
          doc.data().statusAnnounce === 'avaliable' ? 'avaliable' :
          doc.data().statusAnnounce === 'reserved' ? 'reserved' :
          doc.data().statusAnnounce === 'donated' ? 'donated' : '',
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
    setResidues(residueArr);
  }, []);

  const handleCompany = useCallback(() => {
    setIndex(1);
  }, []);

  const handleResidue = useCallback(() => {
    setIndex(2);
  }, []);

  const handleAnnounce = useCallback(() => {
    setIndex(3);
  }, []);

  const handleReserve = useCallback(() => {
    Promise.all(checkeds1.map((item) => {
      const docUpdate = firestore.collection('residues').doc(item);
      const ref = docUpdate.update({
        statusAnnounce: 'reserved',
        statusResidue: '',
      });
    })).then(resp => {
      setCheckeds1([]);
      getResidues()
    });
  },[residues, checkeds1, getResidues]);

  const handleDonate = useCallback(() => {
    Promise.all(checkeds2.map((item) => {
      const docUpdate = firestore.collection('residues').doc(item);
      const ref = docUpdate.update({
        statusAnnounce: 'donated',
        statusResidue: 'collected',
      });
    })).then(resp => {
      setCheckeds2([]);
      getResidues()
    });
  },[residues, checkeds2, getResidues]);

  useEffect(() => {
    if(isFocused){
      getResidues();
    }
  }, [getResidues, isFocused]);
  return (
    <>
      <Container>
        <Btn onPress={() => handleCompany()} active={index === 1}>
          <ButtonText active={index === 1}>Resíduos</ButtonText>
        </Btn>
        <Btn onPress={() => handleResidue()} active={index === 2}>
          <ButtonText active={index === 2}>Reservados</ButtonText>
        </Btn>
        <Btn onPress={() => handleAnnounce()} active={index === 3}>
          <ButtonText active={index === 3}>Doados</ButtonText>
        </Btn>
      </Container>

      {index === 1 ?
      <>
        <TitleSection>Reservar</TitleSection>
        {residues &&
          <ScrollView>
            {residues.map(item => {
                if(item.status === 'avaliable' || item.status === 'requested'){
                  return (
                    <>
                      <Residue
                        key={item.id}
                        id={item.id}
                        disponibility={item.disponibility}
                        material={item.material}
                        quantity={item.quantity}
                        screen={'mydonations'}
                        status={item.status}
                        craftsman={item.craftsman}
                        onChecked={() => setCheckeds1((prevState) =>
                          {
                            if(prevState.indexOf(item.id) !== -1){
                              return(update(prevState, {$splice: [[prevState.indexOf(item.id), 1]]}))
                            }else{
                              return([...prevState, item.id])
                            }
                          }
                        )}
                        />
                    </>
                  )
              }})
            }
          </ScrollView>
        }
         <View style={{marginLeft: 25, marginRight: 25}}>
            <Button color="purple" disabled={checkeds1.length !== 0 ? false : true} title="Reservar" onPress={() => handleReserve()}/>
          </View>
        </> : false}
      {index === 2 &&
      <>
        <TitleSection>Doar</TitleSection>
        {residues &&
          <ScrollView>
            {
              residues.map(item => {
                if(item.status === 'reserved'){
                  return (
                    <>
                      <Residue
                        key={item.id}
                        disponibility={item.disponibility}
                        material={item.material}
                        quantity={item.quantity}
                        screen={'mydonations'}
                        status={item.status}
                        craftsman={item.craftsman}
                        id={item.id}
                        onChecked={() => setCheckeds2((prevState) =>
                          {
                            if(prevState.indexOf(item.id) !== -1){
                              return(update(prevState, {$splice: [[prevState.indexOf(item.id), 1]]}))
                            }else{
                              return([...prevState, item.id])
                            }
                          }
                        )}
                      />
                    </>
                  )
              }})
            }
          </ScrollView>
        }
          <View style={{marginLeft: 25, marginRight: 25}}>
            <Button color="purple" disabled={checkeds2.length !== 0 ? false : true} title="Doar" onPress={() => handleDonate()}/>
          </View>
        </>
      }
      {index === 3 &&
        <>
          <ScrollView>
            {residues && residues.map(item => {
              if(item.status === 'donated'){
                return (
                    <Residue
                    key={item.id}
                    disponibility={item.disponibility}
                    material={item.material}
                    quantity={item.quantity}
                    screen={'mydonations'}
                    status={item.status}
                    craftsman={item.craftsman}
                    />
                )
            }})}
          </ScrollView>
        </>
      }
    </>
  )
}
export default Donation;
