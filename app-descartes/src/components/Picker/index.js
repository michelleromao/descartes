import React, { useEffect, useRef, useState } from 'react';
import Picker, { PickerSelectProps } from 'react-native-picker-select';
import { Container, Label } from './styles';
import { StyleSheet } from 'react-native';
import { useField } from '@unform/core';

export default function RNPickerSelect({ name, items, label, value, ...rest }) {
  const pickerRef = useRef(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);
  const [selectedValue, setSelectedValue] = useState(value ? value : defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        return ref.props.value || '';
      },
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
    <Label>{label}</Label>
    <Container>
      <Picker
        ref={pickerRef}
        value={selectedValue}
        onValueChange={setSelectedValue}
        items={items}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        {...rest}
      />
    </Container>
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#313131",
    paddingRight: 50, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#313131",
    paddingRight: 50, // to ensure the text is never behind the icon
  },
});
