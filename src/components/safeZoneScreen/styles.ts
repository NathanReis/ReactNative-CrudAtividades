import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    height: Dimensions.get('window').height - StatusBar.currentHeight!,
    width: Dimensions.get('window').width,

    backgroundColor: 'red'
  }
});
