import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  label: {
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: -10,

    textAlign: 'center',
    textTransform: 'uppercase'
  },
  picker: {
    width: 150,
    backgroundColor: '#f07373',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginEnd: 10,
    marginStart: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
