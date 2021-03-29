import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useIsFocused } from '@react-navigation/native';
import { firestore } from '../../services/firebase';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';

import EnterpriseProfile from '../../components/EnterpriseProfile';
import Itens from '../../components/Itens';
import Button from "../../components/Button";

import {
  BackgroundColor,
  Modal,
  TextModal,
  GroupButton} from "./styles";

const Company = () => {
  const routes = useRoute();
  const isFocused = useIsFocused();
  const [company, setCompany] = useState({});
  const [donated, setDonated] = useState(0);
  const [added, setAdded] = useState(0);
  const [residues, setResidues] = useState([]);
  const [checkeds, setCheckeds] = useState([]);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const getDetailsCompany = useCallback(async () => {
    setLoading(true)
    const companyShot = await firestore.collection("users").get()
    const addressShot = await firestore.collection("addresses").get()
    const residuesShot = await firestore.collection("residues").get()
    const materialsShot = await firestore.collection("materials").get()
    const photosShot = await firestore.collection("photos").get()


    let countResidues = 0;
    let countResiduesDonate = 0;
    let residuesArr = [];

    residuesShot.forEach(doc => {
      if(doc.data().id_company === routes.params.id){
        countResidues = countResidues + 1;
        if(doc.data().statusAnnounce === "avaliable"){
          residuesArr.push({
            id: doc.id,
            disponibility: doc.data().disponibility,
            id_company: doc.data().id_company,
            id_craftsman: doc.data().id_craftsman,
            id_material: doc.data().id_material,
            quantity: doc.data().quantity ? doc.data().quantity : doc.data().size,
          })
        }
        if(doc.data().statusAnnounce === "donated"){
          countResiduesDonate = countResiduesDonate + 1;
        }
      }
    });
    materialsShot.forEach(doc => {
      residuesArr.forEach((residue, i) => {
        if(doc.id === residue.id_material){
          residuesArr[i] = {
            id: residue.id,
            disponibility: residue.disponibility,
            id_company: residue.id_company,
            id_craftsman: residue.id_craftsman,
            id_material: residue.id_material,
            material: doc.data().type,
            quantity: residue.quantity,
          }
        }
      })
    })
    setResidues(residuesArr);
    setAdded(countResidues)
    setDonated(countResiduesDonate);
    let companyDetails;
    companyShot.forEach(doc =>{
      if(doc.id === routes.params.id){
        companyDetails = {
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone
        }
      }
    });
    addressShot.forEach(doc => {
      if(doc.id === companyDetails.id){
        companyDetails = {
          id: companyDetails.id,
          name: companyDetails.name,
          email: companyDetails.email,
          phone: companyDetails.phone,
          street: doc.data().street,
          number: doc.data().number
        }
      }
    });
    photosShot.forEach(doc => {
      if(doc.id === routes.params.id){
        companyDetails = {
          id: companyDetails.id,
          name: companyDetails.name,
          email: companyDetails.email,
          phone: companyDetails.phone,
          street: companyDetails.street,
          number: companyDetails.number,
          photo: doc.data().url
        }
      }
    })
    setCompany(companyDetails);
    setLoading(false)
  },[routes.params.id]);

  const handleReserve = useCallback(async () => {
    const response = await AsyncStorage.getItem('@storage_uid');

    Promise.all(checkeds.map((item) => {
      const docUpdate = firestore.collection('residues').doc(item);
      const notification = firestore.collection("notifications").doc();
      let doc = docUpdate.get().then((rp) =>{
        const ref = docUpdate.update({
          id_craftsman: response,
          statusAnnounce: '',
          statusResidue: 'requested',
        });
        const res = notification.set({
          id_craftsman: response,
          id_company: routes.params.id,
          id_owner: routes.params.id,
          text: 'solicitou',
          id_material: rp.data().id_material,
        });
      });
    })).then(resp => {
      setModal(true);
      setCheckeds([]);
      getDetailsCompany()
    });
  },[residues, checkeds, getDetailsCompany]);

  useEffect(() => {
    if(isFocused){
      getDetailsCompany();
    }
  },[getDetailsCompany]);

  return (
    <>
      {modal ? (
          <BackgroundColor>
            <Modal>
              <TextModal>Solicitação enviada!</TextModal>
              <GroupButton>
                <Button
                  color="purple"
                  title="ok"
                  size="100%"
                  onPress={() => setModal(false)}
                />
              </GroupButton>
            </Modal>
          </BackgroundColor>
        ) : (
          false
      )}

      <View style={{flex: 1}}>
        {loading ?
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
            }}
          >
            <ActivityIndicator size="small" color="#352166" />
          </View>
        :
        <>
          <EnterpriseProfile
            email={company.email}
            name={company.name}
            number={company.number}
            phone={company.phone}
            street={company.street}
            photo={company.photo}
            donated={donated}
            added={added}
          />

          {residues && residues.length !== 0 ?
            <>
            <ScrollView style={{flex:1, marginTop: 25}}>
              <View style={{flexDirection: "row", justifyContent: "space-between", marginLeft: 25, marginRight: 25, marginBottom: 5}}>
                <Text style={{fontSize: 16, color: "#352166", fontWeight: "bold"}}>Itens</Text>
                <Text style={{fontSize: 16, color: "#352166", fontWeight: "bold"}}>Solicitar</Text>
              </View>
                {residues.map(item => {
                    return (
                      <>
                        <Itens
                          key={item.id}
                          id={item.id}
                          disponibility={item.disponibility}
                          material={item.material}
                          quantity={item.quantity}
                          onChecked={() => setCheckeds((prevState) =>
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
                    })}
              </ScrollView>
              <View style={{marginLeft: 25, marginRight: 25, marginBottom: 25}}>
                  <Button color="purple" disabled={checkeds.length !== 0 ? false : true} title="Enviar solicitação" onPress={() => handleReserve()}/>
              </View>
            </>
          :
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 33,
              }}
            >
            <Text style={{ color: '#D6692B' }}>A empresa não possui resíduos para solicitar</Text>
          </View>
          }
          </>
        }
      </View>
    </>
  );


};

export default Company;
