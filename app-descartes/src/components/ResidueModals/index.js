import React, {useCallback} from 'react';
import { firestore } from "../../services/firebase";
import { useRoute, useNavigation } from '@react-navigation/native';

import Button from "../Button";

import {
  BackgroundColor,
  Modal,
  TitleModal,
  TextModal,
  GroupButton} from './styles';

const ResidueModals = () => {
  const routes = useRoute();
  const navigation = useNavigation();

  const handleConfirm = useCallback(async () => {
    if(routes.params.type === 'delete'){
      const res = await firestore.collection('residues').doc(routes.params.id_residue).delete();
      navigation.goBack();
    }else if(routes.params.type === 'back'){
      const docUpdate = await firestore.collection('residues').doc(routes.params.id_residue);
      const ref = await docUpdate.update({
        id_craftsman: "",
        statusAnnounce: "avaliable",
        statusResidue: "",
      });
      navigation.goBack();
    }
  },[routes.params.type,routes.params.id_residue]);

  return(
    <BackgroundColor>
      <Modal>
        <TitleModal>
          {routes.params.type === 'delete' && 'Excluir'}
          {routes.params.type === 'back' && 'Retornar'}
        </TitleModal>
        <TextModal>
          {routes.params.type === 'delete' && 'Você deseja excluir esse resíduo?'}
          {routes.params.type === 'back' && 'Você deseja retornar esse resíduo para doação? Isso retirá o resíduo da lista de solicitações do artesão e ficará disponível para outros.'}
        </TextModal>

        <GroupButton>
          <Button
            title="Não"
            color="orange"
            size="48%"
            onPress={() => navigation.goBack()}
          />
          <Button
            title="Sim"
            color="green"
            size="48%"
            onPress={() => handleConfirm()}
          />
        </GroupButton>
      </Modal>
    </BackgroundColor>
  )
}

export default ResidueModals;
