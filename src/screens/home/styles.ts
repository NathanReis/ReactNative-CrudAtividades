import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    width: Dimensions.get('window').width - 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d98484',
    borderColor: "#000000",    
    fontSize: 20,
    margin: 10
  },
  title: {
    fontWeight: 'bold',
    color: '#6e0101',
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    margin: 15,
    justifyContent: 'space-around',
  },
  button: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonsContainer: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: Dimensions.get('window').width - 70,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginStart: 10,
    marginEnd: 10    
  }
});
