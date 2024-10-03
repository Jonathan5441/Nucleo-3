import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar, HelperText } from 'react-native-paper';
import { ref, push } from 'firebase/database';
import { db } from '../config/firebaseconfig';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';

interface MovieProductForm {
  title: string;
  price: string;
  description: string;
  genre: string;
  duration: string;
  releaseYear: string;
  ageRating: string;
}

export const CreateProductScreen = () => {
  const [form, setForm] = useState<MovieProductForm>({
    title: '',
    price: '',
    description: '',
    genre: '',
    duration: '',
    releaseYear: '',
    ageRating: '',
  });
  const [showMessage, setShowMessage] = useState(false);
  const navigation = useNavigation();

  const handleSetValues = (key: keyof MovieProductForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCreateProduct = async () => {
    if (Object.values(form).some(value => value === '')) {
      setShowMessage(true);
      return;
    }

    try {
      const productsRef = ref(db, 'movie-products');
      await push(productsRef, {
        ...form,
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        releaseYear: parseInt(form.releaseYear),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding movie product:', error);
      setShowMessage(true);
    }
  };

  return (
    <ScrollView style={styles.root}>
      <TextInput
        label="Título de la Película"
        mode="outlined"
        value={form.title}
        onChangeText={(value) => handleSetValues('title', value)}
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
      <TextInput
        label="Género"
        mode="outlined"
        value={form.genre}
        onChangeText={(value) => handleSetValues('genre', value)}
      />
      <TextInput
        label="Duración (minutos)"
        mode="outlined"
        value={form.duration}
        onChangeText={(value) => handleSetValues('duration', value)}
        keyboardType="numeric"
      />
      <TextInput
        label="Año de Lanzamiento"
        mode="outlined"
        value={form.releaseYear}
        onChangeText={(value) => handleSetValues('releaseYear', value)}
        keyboardType="numeric"
      />
      <TextInput
        label="Clasificación por Edades"
        mode="outlined"
        value={form.ageRating}
        onChangeText={(value) => handleSetValues('ageRating', value)}
      />
      <HelperText type="info">
        Ejemplo: G, PG, PG-13, R, NC-17
      </HelperText>
      <Button 
        icon="check" 
        mode="contained" 
        onPress={handleCreateProduct}
        style={{ marginTop: 16 }}
      >
        Crear Producto de Película
      </Button>
      <Snackbar
        visible={showMessage}
        onDismiss={() => setShowMessage(false)}
        duration={3000}
      >
        Por favor, rellena todos los campos correctamente.
      </Snackbar>
    </ScrollView>
  );
};