import React, { useState } from 'react';
import { firestore } from "../../services/outrofirebase";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import { RowFront, RowFrontVisible, RowBack, Title, Details } from './styles';

import ArrowSwipe from '../../assets/swipe.png';
import User from '../../assets/usercompany.png';

import { Map } from '../Icon';

const Swipe = ({ list, color, type, onDelete }) => {
  const [listData, setListData] = useState(
    type === 'notifications'
      ? list.notifications.map((item, index) => ({
          key: `${index}`,
          title: item.title,
          details: item.details,
        }))
      : type === 'favoriteCompany'
      ? list.company.map((item, index) => ({
          key: `${index}`,
          title: item.title,
          details: item.details,
          selo: item.selo,
        }))
      : type === 'collection' ?
        list.requested.map((item, index) => ({
          key: `${index}`,
          id: item.id,
          disponibility: item.disponibility,
          id_company: item.id_company,
          company: item.company,
          id_craftsman: item.id_craftsman,
          id_material: item.id_material,
          material: item.material,
          quantity: item.quantity,
          statusAnnounce: item.statusAnnounce,
          statusResidue: item.statusResidue,
        }))
      : list.residue.map((item, index) => ({
          key: `${index}`,
          title: item.title,
        })),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = async (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    if(type === 'collection'){
      Alert.alert(
        'Reserva cancelada!',
        'Você cancelou a reserva do resíduo para você. Ele já está disponível novamente para reserva para outras pessoas.',
        [{ text: 'OK', onPress: () => console.log("ok") }],
      );
      const docUpdate = await firestore.collection('residues').doc(newData[prevIndex].id);
      const ref = await docUpdate.update({
        id_craftsman: "",
        statusAnnounce: "avaliable",
        statusResidue: "",
      });
      newData.splice(prevIndex, 1);
      setListData(newData);
    }else{
      newData.splice(prevIndex, 1);
      setListData(newData);
    }

  };

  const VisibleItem = props => {
    const { data } = props;
    return (
      <RowFront color={color}>
        <RowFrontVisible color={color}>
          <View style={styles.content}>
            <View>
              {type === 'notifications' && (
                <Title numberOfLines={1}>
                  {data.item.title}
                  <Details numberOfLines={1}>{data.item.details}</Details>
                </Title>
              )}
              {type === 'favoriteCompany' && (
                <View style={{ flexDirection: 'row' }}>
                  <Image source={User} />
                  <View style={{ marginLeft: '5%' }}>
                    <Title numberOfLines={1}>{data.item.title}</Title>
                    <View style={{ flexDirection: 'row' }}>
                      <Map width={20} height={20} />
                      <Details style={{ marginLeft: '3%' }}>
                        {data.item.details}
                      </Details>
                    </View>
                  </View>
                </View>
              )}
              {type === 'favoriteResidue' && (
                <Title numberOfLines={1}>{data.item.title}</Title>
              )}
              {type === 'collection' && (
                <View>
                   <Title numberOfLines={1}>{data.item.material}</Title>
                   <Details>
                    {data.item.company} - {data.item.quantity}
                   </Details>

                </View>
              )}
            </View>
            <Image source={ArrowSwipe} />
          </View>
        </RowFrontVisible>
      </RowFront>
    );
  };

  const renderItem = (data, rowMap) => {
    return (
      <>
        <VisibleItem data={data} />
      </>
    );
  };

  const HiddenItemWithActions = props => {
    const { onDelete } = props;
    return (
      <RowBack color={color}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={onDelete}
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </RowBack>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data.item.key)}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-65}
        disableRightSwipe
      />
    </View>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 70,
    paddingRight: '30%',
    height: 70,
  },
  backRightBtnRight: {
    backgroundColor: '#CF4242',
    right: 0,
    height: 70,
  },
});
