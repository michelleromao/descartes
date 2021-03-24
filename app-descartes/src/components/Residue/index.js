import React, {useState, useCallback} from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { EditIcon, DeleteIcon, BackIcon, CheckIcon, CheckedIcon } from "../Icon"
import { Container, Content, Row, Title, TitleText, Subtitle, Icons, DonationTo, DonationText, ReservedText } from './styles';

const Residue = ({id, screen, material, quantity, disponibility, status, craftsman, onChecked}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback(() => {
    if(checked === false){
      setChecked(true);
      onChecked([id]);
    }else{
      setChecked(false);
      onChecked([id]);
    }
  },[checked]);

  return(
    <Container status={status} >
      {screen === 'home' &&
       status==="reserved" &&
        <ReservedText>Reservado</ReservedText>
      }
      <Row>
        {screen === 'home' ? false :
          status === 'requested' || status === 'reserved' ?
          <TouchableOpacity style={{marginLeft: 15}} onPress={() => handleCheck()}>
            {checked ? <CheckedIcon /> : <CheckIcon />}
          </TouchableOpacity>
          : false
        }
        {screen === 'collections' ?
          <Content screen={screen} status={status}>
            <Title>
              <TitleText>{material}</TitleText>
              <Subtitle>{quantity}</Subtitle>
            </Title>
            <Row>
              <Subtitle>{disponibility}</Subtitle>
            </Row>
          </Content>
          :
          <>
            <Content screen={screen} status={status}>
              <Title>
                <TitleText>{material}</TitleText>
                <Subtitle>{quantity}</Subtitle>
              </Title>
              <Row>
                <Subtitle>{disponibility}</Subtitle>
              </Row>
              {screen === 'mydonations' &&
                status !== 'avaliable' &&
                <DonationTo status={status}>
                  <DonationText status={status}>
                    {status === 'requested' && 'Solicitado por ' }
                    {status === 'reserved' && 'Reservado para ' }
                    {status === 'donated' && 'Doado para ' }
                    {craftsman}</DonationText>
                </DonationTo>
              }
            </Content>
            <Icons>
              {status === 'donated' ? false :
              <>
                {status === 'reserved' ?
                  <TouchableOpacity onPress={() => navigation.navigate("ModalResidue", {type: 'back', id_residue: id})}>
                    <BackIcon />
                  </TouchableOpacity>
                  : <TouchableOpacity onPress={() => navigation.navigate("EditMaterial", {id: id, quantity: quantity, disponibility: disponibility, material: material })}>
                    <EditIcon />
                  </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => navigation.navigate("ModalResidue", {type: 'delete', id_residue: id})}>
                  <DeleteIcon width={25} height={29}/>
                </TouchableOpacity>
              </>
              }
            </Icons>
        </>
      }
      </Row>
    </Container>
  )
}

export default Residue;
