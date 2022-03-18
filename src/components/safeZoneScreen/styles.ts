import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

let statusBarHeight = Platform.OS === 'android' ? Number(StatusBar.currentHeight) : 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: statusBarHeight,

    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
});
