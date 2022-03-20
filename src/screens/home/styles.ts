import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    height: Dimensions.get('window').height / 2
  },
  buttonsContainer: {
    flexDirection: 'row'
  }
});
