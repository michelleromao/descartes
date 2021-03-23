import React from 'react';

import { Container, TextButton, View } from './styles';

const Button = ({ title, size, color,mBottom,disabled, ...rest }) => {
  return (
    <View color={color} size={size} mBottom={mBottom} >
      <Container color={color} {...rest} disabled={disabled}>
        <TextButton color={color}>{title}</TextButton>
      </Container>
    </View>
  );
};

export default Button;
