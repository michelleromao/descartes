import React from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { Entypo } from '@expo/vector-icons';
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
  CardFoot,
  Leavings,
  NumLeavings,
  Negotiations,
  NumNegotiations,
  Collumn2,
  Divider
} from './styles';
class Selos extends React.Component {
  state = {
    value: 1,
    seals: false,
  };

  render() {
    return (
      <View style={styles.container}>

          <Text style={styles.titulo}>SELOS DE SUSTENTABILIDADE</Text>

          <View style={styles.selos}>
          <Image source={require('../../assets/selo2.png')} style={{marginLeft: "5%"}}/>
            <Image source={require('../../assets/selo1.png')} style={{marginRight: "5%"}}/>
            <Image source={require('../../assets/selo3.png')} />
          </View>

        <Slider
        step={1}
        trackStyle={{backgroundColor: 'white', width: '95%'}}
        thumbTintColor="transparent"
        disabled
        trackMarks={[100, 500, 1000]}
        minimumValue={0}
        maximumValue={1000}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
        minimumTrackTintColor="#48B9A3"
        renderTrackMarkComponent={() => {return(<View style={{width: 14, height: 14, backgroundColor: 'white', borderRadius: 100}}/> )}}
        />

        <View style={styles.selosText}>
            <Text style={[styles.texto, styles.t100]}>100</Text>
            <Text style={[styles.texto, styles.t500]}>500</Text>
            <Text style={styles.texto}>1000</Text>
        </View>
        {this.state.seals ?
          <CardFoot>
          <Collumn2>
            <Leavings>Resíduos cadastrados</Leavings>
            <NumLeavings>0000000</NumLeavings>
          </Collumn2>
          <Divider />
          <Collumn2>
            <Negotiations>Negociações realizadas</Negotiations>
            <NumNegotiations>0000000</NumNegotiations>
          </Collumn2>
        </CardFoot>
        : false}
        <View style={{alignSelf: 'center', marginTop: 5}}>
          <TouchableOpacity >
            {this.state.seals ?
              <Entypo name="chevron-thin-up" size={24} color="white" onPress={() => this.setState({seals: false})}/>
            :
              <Entypo name="chevron-thin-down" size={24} color="white" onPress={() => this.setState({seals: true})}/>
            }
          </TouchableOpacity>
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
      borderRadius: 15,
      padding: 15
  },
  selos: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  selosText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
  texto: {
      color: 'white',
  },
  t100:{
    marginLeft: "8%"
  },
  t500:{
    marginRight: "8%"
  },
  titulo: {
    color: 'white',
    marginLeft: 55,
    marginRight: 55,
    marginBottom: '5%',
  }
});
