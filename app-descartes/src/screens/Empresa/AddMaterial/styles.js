import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  ViewBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 25,
    marginRight: 25,
  },
  botao: {
    marginLeft: 290,
    bottom: 40,
    borderRadius: 30
  },
  disponibility:{
    height: 60,
    width: windowWidth-50,
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: "#d6692b",
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: "row",
  },
  disponibilityText:{
    color: "#d6692b",
  },
  disponibilityDate:{
    marginLeft: 10,
    color:"#313131",
    fontWeight: 'bold',
  }
});

export default styles;
