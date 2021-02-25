import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 224px;
  padding: 95px;
  background-color: #352166; 
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

export const Info = styled.Text`
    
    
    width: 191px;
    height: 18px;

    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 28px;
    /* identical to box height */

    color:#F1F1F1;
    
`;
export const Icons = styled.div`
    width: 12px;
    height: 15px;
    color: #F1F1F1;
`;
export const Foot = styled.View`
  background-color: #edcb59;
  width: 100%;
  height: 75px;
`;
