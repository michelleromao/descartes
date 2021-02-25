import styled from 'styled-components/native';

export const Container = styled.View`
  border-bottom-color: #999999;
  border-bottom-width: 1px;
  margin: 33px 25px 44px 25px;
  z-index: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
  ${props =>
    props.active
      ? `
    border-bottom-color: #352166;
    border-bottom-width: 2px;
    `
      : `
    border-bottom-width: 0px;
  `}
  width: 33.3%;
  padding-bottom: 10px;
  z-index: 10;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'nunito-bold';
  font-size: 15px;
  ${props =>
    props.active
      ? `
    color: #352166;
    `
      : `
    color: #999999;
  `}
`;
