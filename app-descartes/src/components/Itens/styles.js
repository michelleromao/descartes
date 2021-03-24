import styled from 'styled-components/native'

export const Container = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: #352166;
  border-bottom-color: #352166;
  padding: 10px;
  width: 100%;
  background-color: #F1F1F1;
`;
export const Content = styled.View`
  width: 55%;
  margin-left: 15px;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
export const TitleText = styled.Text`
  font-family: 'nunito-bold';
  font-size: 16px;
  color: #352166;
  margin-right: 10px;
`;
export const Subtitle = styled.Text`
  font-family: 'nunito-regular';
  color: #352166;
  font-size: 14px;
`;
