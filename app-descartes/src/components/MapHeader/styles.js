import styled from 'styled-components/native';

import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  width: 100%;
  padding-top: 10%;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

export const Form = styled(Unform)`
  width: 70%;
  flex-direction: row;
  align-items: center;
`;

export const FilterButton = styled.TouchableOpacity`
  margin-left: 5%;
  margin-bottom: 5%;
`;
