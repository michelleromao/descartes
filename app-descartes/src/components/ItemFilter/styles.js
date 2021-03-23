import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  align-items: center;
`;

export const ButtonType = styled.TouchableOpacity`
  background-color: ${props => props.selected ? '#6CB9AA' : '#E3E3E3'};
  width: 100%;
  border-bottom-color: #352166;
  border-bottom-width: 1px;
`;

export const  TextType = styled.Text`
  font-family: 'nunito-bold';
  font-size: 18px;
  color: ${props => props.selected ? '#F1F1F1' : '#6CB9AA'};
  width: 100%;
  padding: 5%;
`;
