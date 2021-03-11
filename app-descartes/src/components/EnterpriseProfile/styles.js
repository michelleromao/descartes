import styled from 'styled-components/native';

export const View = styled.View`
  flex: 1;
  width: 414px;
  height: 299px;

`;
export const Card = styled.View`
  
  flex-direction: row;
  width: 100%;
  height: 224px;

  background: #352166;
  border: 1px solid #352166;

  span {
    font-size:13px;
    color:#F1F1F1;
  }
  
`;
export const Text = styled.Text`
  font-size: 18px;
  color:#F1F1F1;

  width: 134px;
  height: 25px;

  font-style: normal;
  font-weight: bold;
  line-height: 25px;
`;
export const InfoText = styled.Text`
  font-size: 13px;
  color:#F1F1F1;
`;
export const Image = styled.Image`
  
  width: 50px;
  height: 50px;
  color:#F1F1F1;
`;
export const StampImage = styled.Image`
  
  width: 48px;
  height: 48px;
  color:#F1F1F1;
`;
export const IconImage = styled.Image`
  
  color:#F1F1F1;
`;

export const CardFoot = styled.View`
  
  flex-direction: row;
  width: 100%;
  height: 75px;

  background: #EDCB59;
  
`;

export const GraficaMonstro = styled.Text`
  flex-direction:column;  
  position: absolute;  
  width: 134px;
  height: 25px;

  top: 33px;
  left: 97px;

  
  @font-face {
    src: local('Nunito-Sans-Bold'), url(../../../assets/fonts/NunitoSans-Bold.ttf) format('truetype');
    font-family: Nunito-Sans-Bold, sans-serif;
  }

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;

  color: #F1F1F1
`;

