import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

const Search = ({ name, label, children, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <TextInput
        ref={inputRef}
        keyboardAppearance="light"
        defaultValue={defaultValue}
        placeholderTextColor="#C2BECB"
        onChangeText={value => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
      {children}
    </Container>
  );
};

export default Search;
