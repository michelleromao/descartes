import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 330,
    marginLeft: 25,
    marginRight: 25,
  },
  ViewBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 330,
    marginLeft: 25,
    marginRight: 25,
  },
  botao: {
    position: 'absolute',
    marginLeft: 290,
    bottom: 40,
    borderRadius: 30
  }
});

export default styles;