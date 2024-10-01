import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { ref, push } from 'firebase/database';
import { db } from '../config/firebaseconfig';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';

interface ProductForm {
  name: string;
  price: string;
  description: string;
}

export const CreateProductScreen = () => {
  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    description: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const navigation = useNavigation();

  const handleSetValues = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCreateProduct = async () => {
    if (!form.name || !form.price || !form.description) {
      setShowMessage(true);
      return;
    }

    try {
      const productsRef = ref(db, 'products');
      await push(productsRef, {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product:', error);
      setShowMessage(true);
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        label="Nombre del Producto"
        mode="outlined"
        value={form.name}
        onChangeText={(value) => handleSetValues('name', value)}

      />
      <TextInput
        label="Precio"
        mode="outlined"
        value={form.price}
        onChangeText={(value) => handleSetValues('price', value)}
        keyboardType="numeric"

      />
      <TextInput
        label="Descripción"
        mode="outlined"
        value={form.description}
        onChangeText={(value) => handleSetValues('description', value)}
        multiline
        numberOfLines={4}

      />
      <Button 
        icon="check" 
        mode="contained" 
        onPress={handleCreateProduct}
      >
        Crear Producto
      </Button>
      <Snackbar
        visible={showMessage}
        onDismiss={() => setShowMessage(false)}
        duration={3000}
      >
        Por favor, rellena todos los campos correctamente.
      </Snackbar>
    </View>
  );
};