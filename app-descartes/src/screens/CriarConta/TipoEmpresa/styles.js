import styled from 'styled-components/native';

export const Logo = styled.Image`
  margin-bottom: 25%;
`;

export const Title = styled.View`
  flex-direction: row;
`;
export const Question = styled.Text`
  margin-bottom: 10%;
  margin-right: 2%;
  color: #d6692b;
  font-size: 18px;
  font-family: 'nunito-bold';
`;
export const ButtonQuestion = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: #352166;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;
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
  background-color: #f1f1f1;
  z-index: 5;
  border-radius: 10px;
`;

export const TitleModal = styled.Text`
  font-family: 'nunito-bold';
  font-size: 15px;
  color: #352166;
`;

export const TextModal = styled.Text`
  font-family: 'nunito-regular';
  font-size: 15px;
  color: #352166;
  margin-bottom: 15%;
`;
