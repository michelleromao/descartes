import styled from 'styled-components/native';

export const Container = styled.View`
  width: 75%;
  height: 100%;
  background-color: #f1f1f1;
`;

export const Header = styled.View`
  width: 100%;
  padding: 15% 10% 10%;
  background-color: #6cb9aa;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextHeader = styled.Text`
  font-family: 'nunito-bold';
  font-size: 18px;
  color: #352166;
`;

export const Body = styled.View`
  padding: 10%;
`;

export const ButtonBody = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 33px;
`;

export const TextBody = styled.Text`
  font-family: 'nunito-semibold';
  font-size: 18px;
  color: #352166;
  margin-left: 13px;
`;

export const Benefits = styled.TouchableOpacity`
  width: 100%;
  height: 128px;
  background-color: #352166;
  padding: 10%;
  border-radius: 10px;
  justify-content: center;
  margin-top: 30%;
`;
export const TextBenefits = styled.Text`
  font-family: 'nunito-bold';
  font-size: 18px;
  color: #f1f1f1;
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
