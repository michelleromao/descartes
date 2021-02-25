import React from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet, View, Text, Image } from "react-native";

class Selos extends React.Component {
  state = {
    value: 1
  };

  render() {

    return (

      <View style={styles.container}>

          <Text style={styles.titulo}>SELOS DE SUSTENTABILIDADE</Text>

          <View style={styles.selos}>
            <Image source={require('../../assets/selo2.png')} />
            <Image source={require('../../assets/selo1.png')} />
            <Image source={require('../../assets/selo3.png')} />
          </View>
          
        <Slider
        style={styles.slider}
        step={1}
        trackMarks={[100, 500, 1000]}
        minimumValue={100}
        maximumValue={1000}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        />

        <View style={styles.selos}>
            <Text style={styles.texto}>100</Text>
            <Text style={styles.texto}>500</Text>
            <Text style={styles.texto}>1000</Text>
        </View>
        
      </View>
    );
  }
}

export default Selos;

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#352166',
      alignItems: 'stretch',
      width: 330,
      height: 150,
      borderRadius: 15,
  },
  selos: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginLeft: 55,
      marginRight: 55

  },
  texto: {
      color: 'white',
      marginLeft: 55,
      marginRight: 55
  },
  titulo: {
    color: 'white',
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20
  }
});
