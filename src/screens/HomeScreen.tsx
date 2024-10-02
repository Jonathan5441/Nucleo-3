import React, { useEffect, useState } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar, TextInput } from 'react-native-paper';
import { ref, onValue, update } from 'firebase/database';
import { db, auth } from '../config/firebaseconfig';
import { styles } from '../theme/style';
import { useNavigation } from '@react-navigation/native';

interface MovieProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  genre: string;
  duration: number;
  releaseYear: number;
  ageRating: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export const HomeScreen = () => {
  const [movies, setMovies] = useState<MovieProduct[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState(false);
  const [editingMovie, setEditingMovie] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const moviesRef = ref(db, 'movie-products');
    const unsubscribeMovies = onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      const movieList: MovieProduct[] = [];
      for (let id in data) {
        movieList.push({ id, ...data[id] });
      }
      setMovies(movieList);
    });

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      const unsubscribeUser = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        setUser({ id: currentUser.uid, ...userData });
      });

      return () => {
        unsubscribeMovies();
        unsubscribeUser();
      };
    }

    return () => unsubscribeMovies();
  }, []);

  const updateUser = () => {
    if (user) {
      const userRef = ref(db, `users/${user.id}`);
      update(userRef, { name: user.name, email: user.email, imageUrl: user.imageUrl });
      setEditingUser(false);
    }
  };

  const updateMovie = (movie: MovieProduct) => {
    const movieRef = ref(db, `movie-products/${movie.id}`);
    update(movieRef, { 
      title: movie.title, 
      price: movie.price, 
      description: movie.description,
      genre: movie.genre,
      duration: movie.duration,
      releaseYear: movie.releaseYear,
      ageRating: movie.ageRating
    });
    setEditingMovie(null);
  };

  const renderMovie = ({ item }: { item: MovieProduct }) => (
    <Card style={styles.productCard}>
      <Card.Content>
        {editingMovie === item.id ? (
          <ScrollView contentContainerStyle={styles.editFormContainer}>
            <TextInput
              label="Título"
              value={item.title}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, title: text } : m))}
              style={styles.input}
            />
            <TextInput
              label="Precio"
              value={item.price.toString()}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, price: parseFloat(text) } : m))}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Descripción"
              value={item.description}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, description: text } : m))}
              style={styles.input}
              multiline
            />
            <TextInput
              label="Género"
              value={item.genre}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, genre: text } : m))}
              style={styles.input}
            />
            <TextInput
              label="Duración (minutos)"
              value={item.duration.toString()}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, duration: parseInt(text) } : m))}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Año de lanzamiento"
              value={item.releaseYear.toString()}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, releaseYear: parseInt(text) } : m))}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              label="Clasificación por edades"
              value={item.ageRating}
              onChangeText={(text) => setMovies(movies.map(m => m.id === item.id ? { ...m, ageRating: text } : m))}
              style={styles.input}
            />
            <Button mode="contained" onPress={() => updateMovie(item)} style={styles.productButton}>
              Guardar
            </Button>
          </ScrollView>
        ) : (
          <>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productPrice}>Precio: ${item.price}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productDescription}>Género: {item.genre}</Text>
            <Text style={styles.productDescription}>Duración: {item.duration} minutos</Text>
            <Text style={styles.productDescription}>Año: {item.releaseYear}</Text>
            <Text style={styles.productDescription}>Clasificación: {item.ageRating}</Text>
            <Button mode="outlined" onPress={() => setEditingMovie(item.id)} style={styles.productButton}>
              Editar
            </Button>
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
              <View style={styles.avatarContainer}>
                <Avatar.Image 
                  size={80} 
                  source={user.imageUrl ? { uri: user.imageUrl } : require('../../assets/avatar.jpg')}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.userInfoDetails}>
                <Text style={styles.userInfoTitle}>Información del Usuario</Text>
                {editingUser ? (
                  <>
                    <TextInput
                      label="Nombre"
                      value={user.name}
                      onChangeText={(text) => setUser({ ...user, name: text })}
                      style={styles.input}
                    />
                    <TextInput
                      label="Email"
                      value={user.email}
                      onChangeText={(text) => setUser({ ...user, email: text })}
                      style={styles.input}
                    />
                    <TextInput
                      label="URL de la imagen"
                      value={user.imageUrl}
                      onChangeText={(text) => setUser({ ...user, imageUrl: text })}
                      style={styles.input}
                    />
                    <Button mode="contained" onPress={updateUser} style={styles.userInfoButton}>
                      Guardar
                    </Button>
                  </>
                ) : (
                  <>
                    <Text style={styles.userInfoText}>Nombre: {user.name}</Text>
                    <Text style={styles.userInfoText}>Email: {user.email}</Text>
                    <Button mode="outlined" onPress={() => setEditingUser(true)} style={styles.userInfoButton}>
                      Editar
                    </Button>
                  </>
                )}
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
      
      <Text style={styles.text}>Catálogo de Películas</Text>
      <Button 
        icon="plus" 
        mode="contained" 
        onPress={() => navigation.navigate('CreateProduct' as never)}
        style={{ marginBottom: 10 }}
      >
        Agregar Película
      </Button>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};