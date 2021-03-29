import React, {useState, useCallback} from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { CheckIcon, CheckedIcon } from "../Icon"
import { Container, Content, Row, Title, TitleText, Subtitle } from './styles';

const Itens = ({id, material, quantity, disponibility, onChecked}) => {
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
    <Container>
      <Row>
        <Content>
          <Title>
            <TitleText>{material}</TitleText>
            <Subtitle>{quantity}</Subtitle>
          </Title>
          <Row>
            <Subtitle>{disponibility}</Subtitle>
          </Row>
        </Content>
        <TouchableOpacity style={{marginRight: 25}} onPress={() => handleCheck()}>
          {checked ? <CheckedIcon /> : <CheckIcon />}
        </TouchableOpacity>
      </Row>
    </Container>
  )
}

export default Itens;
