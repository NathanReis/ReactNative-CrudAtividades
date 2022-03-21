import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('window').width - 200,
  }
});
