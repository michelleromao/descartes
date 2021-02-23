import styled from 'styled-components/native';
import { shade } from 'polished';

export const View = styled.View`
  background: ${props =>
    props.color === 'orange'
      ? shade(0.2, '#D6692B')
      : props.color === 'purple'
      ? shade(0.2, '#352166')
      : props.color === 'green'
      ? shade(0.2, '#6CB9AA')
      : shade(0.2, '#F1F1F1')};
  border-radius: 15px;
  width: ${props => (props.size ? props.size : '100%')};
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  background: ${props =>
    props.color === 'orange'
      ? '#D6692B'
      : props.color === 'purple'
      ? '#352166'
      : props.color === 'green'
      ? '#6CB9AA'
      : '#F1F1F1'};
  border-radius: 15px;
  border: ${props =>
    props.color === 'orange'
      ? 'none'
      : props.color === 'purple'
      ? 'none'
      : props.color === 'green'
      ? 'none'
      : '3px solid #352166'};
`;

export const TextButton = styled.Text`
  color: ${props =>
    props.color === 'orange'
      ? '#f1f1f1'
      : props.color === 'purple'
      ? '#f1f1f1'
      : props.color === 'green'
      ? '#f1f1f1'
      : '#352166'};
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'nunito-bold';
`;
