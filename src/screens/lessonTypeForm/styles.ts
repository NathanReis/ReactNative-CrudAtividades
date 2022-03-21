import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    paddingHorizontal: 20
  },
  containerForm: {
    elevation: 3, 
    borderColor: "black",
    borderWidth: 2,
    margin: 3,
    borderRadius:5,
    width: Dimensions.get('window').width - 10,
    marginBottom: 10,
    paddingBottom: 10
  }
});
