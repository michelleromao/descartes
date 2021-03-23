import styled from 'styled-components/native'

export const Container = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: #352166;
  border-bottom-color: #352166;
  padding: 10px;
  width: 100%;
  background-color: ${(props) =>
  props.status === 'requested' ? '#E5E5E5'
  : props.status === 'reserved' ? '#E5E5E5'
  : props.status === 'donated' ? '#F1F1F1'
  : '#F1F1F1'};
`;
export const Content = styled.View`
  width: ${props =>
    props.screen === 'home' ? '65%'
    : props.status === 'avaliable' ? '65%'
    : props.status === 'donated' ? '65%'
    : '55%'};
  margin-left: 15px;
`;
export const Icons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 25%;
`;
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
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
export const DonationTo = styled.View`
  border-radius: 5px;
  height: 25px;
  width: 90%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
  props.status === 'requested' ? '#D6692B'
  : props.status === 'reserved' ? '#EDCB59'
  : props.status === 'donated' ? '#6CB9AA'
  : '#F1F1F1'};
`;

export const DonationText = styled.Text`
  font-family: 'nunito-bold';
  font-size: 12px;
  color: ${(props) =>
    props.status === 'requested' ? '#fff'
    : props.status === 'reserved' ? '#352166'
    : props.status === 'donated' ? '#352166'
    : '#F1F1F1'};
`;

export const ReservedText = styled.Text`
  font-family: 'nunito-bold';
  font-size: 12px;
  color: #D6692B;
  margin-left: 15px;
`;
