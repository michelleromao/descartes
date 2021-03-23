import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  background-color: #EDCB59;
  padding-bottom: 1%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const Content = styled.div`
  background-color: #F2F2F2;
  width: 100%;
  padding: 2% 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    flex: 3;
  }
  div:last-child{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 2;
    max-width: 460px;
    a{
      display: flex;
      justify-content: space-between;
      align-items: center;
      p{
        margin-left: 8%
      }
    }
  }
`;
