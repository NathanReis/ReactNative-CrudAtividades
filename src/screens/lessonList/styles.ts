import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    rowContainer: {
        width: Dimensions.get('window').width - 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },  
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
