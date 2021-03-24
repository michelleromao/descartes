import styled from 'styled-components/native';

export const BackgroundColor = styled.View`
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
