import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const RowFront = styled.View`
  background-color: ${props =>
    props.color === 'yellow' ? '#edcb59' : '#F1F1F1'};
  height: 70px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
`;
export const RowFrontVisible = styled.TouchableHighlight`
  background-color: ${props =>
    props.color === 'yellow' ? '#edcb59' : '#F1F1F1'};
  height: 70px;
  padding: 10px;
  justify-content: center;
  border: ${props => (props.color === 'yellow' ? 'none' : '1px solid #352166')};
`;
export const RowBack = styled.View`
  align-items: center;
  background-color: #cf4242;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
  width: ${windowWidth}px;
  height: 70px;
`;
export const Title = styled.Text`
  font-size: 15px;
  margin-bottom: 5px;
  color: #352166;
  font-family: 'nunito-bold';
`;
export const Details = styled.Text`
  font-size: 15px;
  color: #352166;
  font-weight: 500;
  font-family: 'nunito-regular';
`;
