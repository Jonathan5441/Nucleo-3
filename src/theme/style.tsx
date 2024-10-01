import { StyleSheet } from "react-native";
export const styles=StyleSheet.create({
    root:{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap:10
    },
    text:{
        textAlign:'center',
        fontSize:20,
        marginBottom:10
    },
    textRe:{
        textAlign:'center',
        fontSize:15,
        marginBottom:10,
        fontWeight: 'bold',
        color:'#f5973d'
    },
    userInfoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      userInfoContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
      },
      avatarContainer: {
        marginRight: 15,
      },
      userInfoDetails: {
        flex: 1,
      },
      userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
      },
      userInfoText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#34495e',
      },
      userInfoButton: {
        marginTop: 10,
      },
      input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      // Estilos para las tarjetas de productos
      productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2c3e50',
      },
      productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#27ae60',
        marginBottom: 5,
      },
      productDescription: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 10,
      },
      productButton: {
        marginTop: 5,
      },
      
      // Estilos para los inputs de edición
})