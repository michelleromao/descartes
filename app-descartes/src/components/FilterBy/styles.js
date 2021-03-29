import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height:100%;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.View`
  width: 93%;
  background-color: #f1f1f1;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.View`
  width: 100%;
  padding-top: 8%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 3%;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #352166;
  border-bottom-width: 1px;
`;

export const TitleModal = styled.Text`
font-family: 'nunito-bold';
font-size: 24px;
color: #352166;
`;

export const TextModal = styled.Text`
  font-family: 'nunito-bold';
  font-size: 18px;
  color: #352166;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-right: 5%;
  margin-bottom: 5%;
`;

export const ButtonChevron = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5%;
  border-bottom-color: #352166;
  border-bottom-width: 1px;
`;

export const List = styled.View`
  width: 100%;
  border-bottom-color: #352166;
  border-bottom-width: 1px;
`;

export const ButtonType = styled.TouchableOpacity`
  background-color: ${props => props.selected ? '#6CB9AA' : '#E3E3E3'};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const  TextType = styled.Text`
  font-family: 'nunito-bold';
  font-size: 18px;
  color: ${props => props.selected ? '#F1F1F1' : '#6CB9AA'};
  border-bottom-color: #352166;
  border-bottom-width: 1px;
  width: 100%;
  padding: 5%;
`;

export const Content = styled.View`
  height: 250px;
`;
