import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const Container = styled.View`
  width: ${windowWidth - 50}px;
  height: 60px;
  border: 2px solid #d6692b;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  padding-left: 10px;
  color: #313131;
  font-family: 'nunito-bold';
`;

export const Label = styled.Text`
  color: #d6692b;
  font-family: 'nunito-regular';
  margin-bottom: 8px;
`;
