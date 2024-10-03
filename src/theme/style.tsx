import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 10,
    backgroundColor: '#f5f5f5',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
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
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  userInfoButton: {
    marginTop: 10,
  },
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
    marginTop: 10,
  },
  editFormContainer: {
    paddingBottom: 16,
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
  },
});