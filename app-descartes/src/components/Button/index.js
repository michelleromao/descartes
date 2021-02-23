import React from 'react';

import { Container, TextButton, View } from './styles';

const Button = ({ title, size, color, ...rest }) => {
  return (
    <View color={color} size={size}>
      <Container color={color} {...rest}>
        <TextButton color={color}>{title}</TextButton>
      </Container>
    </View>
  );
};

export default Button;
