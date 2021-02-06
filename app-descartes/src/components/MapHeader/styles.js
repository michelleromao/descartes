import styled from 'styled-components/native';

import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  width: 100%;
  margin-top: 15%;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
