import styled from 'styled-components/native';

export const TextButton = styled.Text`
  color: #f1f1f1;
  font-family: 'nunito-regular';
  margin-bottom: 10%;
`;

export const TextOption = styled.Text`
  color: #d6692b;
  font-family: 'nunito-regular';
  font-size: 18px;
`;

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
  height: 90%;
  background-color: #f1f1f1;
  z-index: 5;
  border-radius: 10px;
  justify-content: space-between;
`;

export const TextModal = styled.Text`
  font-family: 'nunito-regular';
  font-size: 15px;
  color: #352166;
`;
