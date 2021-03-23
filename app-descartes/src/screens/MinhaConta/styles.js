import styled from 'styled-components/native';

export const AlertText = styled.Text`
  margin-top: -5%;
  margin-bottom: 10%;
  align-self: flex-end;
  color: #352166;
  font-family: 'nunito-regular';
`;

export const SaveButton = styled.TouchableOpacity`
  margin-right: 35%;
  margin-top: 10%;
  alignItems: center

`;

export const DeletButton = styled.TouchableOpacity`
  margin-left: 35%;
  margin-top: 10%;
  alignItems: center
`;

export const BackgroundColorModal = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.View`
  padding: 5%;
  width: 93%;
  height: 25%;
  background-color: #f1f1f1;
  z-index: 5;
  border-radius: 10px;
  justify-content: space-between;
`;

export const TextModal = styled.Text`
  font-family: 'nunito-bold';
  font-size: 20px;
  color: #352166;
`;

export const GroupButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;