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
  font-size: 17px;
  color:#F1F1F1;

  width: 134px;
  height: 25px;

  top:30px;
  left: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: 25px;

  @font-face {
    src: local('Nunito-Sans-Bold'), url(../../../assets/fonts/NunitoSans-Bold.ttf) format('truetype');
    font-family: Nunito-Sans-Bold, sans-serif;
  }
`;
export const Image = styled.Image`
  
  top: 20px;
  left: 15px;
  width: 50px;
  height: 50px;
  color:#F1F1F1;
`;
export const StampImage = styled.Image`
  
  top: 20px;
  left: 40px;
  width: 48px;
  height: 48px;
  color:#F1F1F1;
`;
export const IconImage1 = styled.Image`
  
  color:#F1F1F1;

  top:100px;
  right:200px; 
`;
export const InfoText1 = styled.Text`
  font-size: 13px;
  color:#F1F1F1;

  top:100px;
  right:190px; 
`;
export const IconImage2 = styled.Image`
  
  color:#F1F1F1;

  top:140px;
  right:360px; 
`;
export const InfoText2 = styled.Text`
  font-size: 13px;
  color:#F1F1F1;

  top:140px;
  right:355px; 
`;
export const IconImage3 = styled.Image`
  
  color:#F1F1F1;
  width: 15px;
  height: 12px;
  top:180px;
  right:475px; 
`;
export const InfoText3 = styled.Text`
  font-size: 13px;
  color:#F1F1F1;

  top:180px;
  right:465px; 
`;
export const CardFoot = styled.View`
  
  flex-direction: row;
  width: 100%;
  height: 75px;

  background: #EDCB59;
  
`;



