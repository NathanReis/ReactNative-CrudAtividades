import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

let statusBarHeight = Platform.OS === 'android' ? Number(StatusBar.currentHeight) : 0;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: Dimensions.get('window').height,
    width: Dimensions.get('window').width,

    marginTop: statusBarHeight
  },
  containerWithoutScroll: {
    height: Dimensions.get('window').height
  }
});
