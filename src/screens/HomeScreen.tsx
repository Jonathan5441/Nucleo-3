import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { ref, onValue, update } from 'firebase/database';
import { db, auth } from '../config/firebaseconfig';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribeProducts = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList: Product[] = [];
      for (let id in data) {
        productList.push({ id, ...data[id] });
      }
      setProducts(productList);
    });

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        setUser({ id: currentUser.uid, ...userData });
      });

      return () => {
        unsubscribeProducts();
        unsubscribeUser();
      };
    }

    return () => unsubscribeProducts();
  }, []);

  const updateUser = () => {
    if (user) {
      const userRef = ref(db, `users/${user.id}`);
      update(userRef, { name: user.name, email: user.email, imageUrl: user.imageUrl });
      setEditingUser(false);
    }
  };

  const updateProduct = (product: Product) => {
    const productRef = ref(db, `products/${product.id}`);
    update(productRef, { name: product.name, price: product.price, description: product.description });
    setEditingProduct(null);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Card style={styles.productCard}>
      <Card.Content>
        {editingProduct === item.id ? (
          <>
            <TextInput
              value={item.name}
              onChangeText={(text) => setProducts(products.map(p => p.id === item.id ? { ...p, name: text } : p))}
              style={styles.input}
            />
            <TextInput
              value={item.price.toString()}
              onChangeText={(text) => setProducts(products.map(p => p.id === item.id ? { ...p, price: parseFloat(text) } : p))}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              value={item.description}
              onChangeText={(text) => setProducts(products.map(p => p.id === item.id ? { ...p, description: text } : p))}
              style={styles.input}
            />
            <Button mode="contained" onPress={() => updateProduct(item)} style={styles.productButton}>Guardar</Button>
          </>
        ) : (
          <>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Precio: ${item.price}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Button mode="outlined" onPress={() => setEditingProduct(item.id)} style={styles.productButton}>Editar</Button>
          </>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.root}>
      {user && (
        <Card style={styles.userInfoCard}>
          <Card.Content>
            <View style={styles.userInfoContent}>
              <Avatar.Image 
                size={80} 
                source={user.imageUrl ? { uri: user.imageUrl } : require('../../assets/avatar.jpg')}
              />
              <View style={styles.userInfoDetails}>
                <Text style={styles.userInfoTitle}>Información del Usuario</Text>
                {editingUser ? (
                  <>
                    <TextInput
                      value={user.name}
                      onChangeText={(text) => setUser({ ...user, name: text })}
                      style={styles.input}
                      placeholder="Nombre"
                    />
                    <TextInput
                      value={user.email}
                      onChangeText={(text) => setUser({ ...user, email: text })}
                      style={styles.input}
                      placeholder="Email"
                    />
                    <TextInput
                      value={user.imageUrl}
                      onChangeText={(text) => setUser({ ...user, imageUrl: text })}
                      style={styles.input}
                      placeholder="URL de la imagen"
                    />
                    <Button mode="contained" onPress={updateUser} style={styles.userInfoButton}>Guardar</Button>
                  </>
                ) : (
                  <>
                    <Text style={styles.userInfoText}>Nombre: {user.name}</Text>
                    <Text style={styles.userInfoText}>Email: {user.email}</Text>
                    <Button mode="outlined" onPress={() => setEditingUser(true)} style={styles.userInfoButton}>Editar</Button>
                  </>
                )}
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
      
      <Text style={styles.text}>Lista de Productos</Text>
      <Button 
        icon="plus" 
        mode="contained" 
        onPress={() => navigation.navigate('CreateProduct' as never)}
        style={{ marginBottom: 10 }}
      >
        Crear Producto
      </Button>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};