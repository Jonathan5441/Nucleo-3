import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/style'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseconfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

export const LoginScreen = () => {
  interface FormLogin {
    email: string,
    password: string
  }
  const [formLogin, setformLogin] = useState<FormLogin>({
    email: "",
    password: ""
  });

  const [showMessage, setShowMessage] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleSetValues = (key: string, value: string) => {
    setformLogin({ ...formLogin, [key]: value });
  }
  const handleLogin = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage(true);
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      )
      navigation.navigate('home' as never);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.root}>
      <Avatar.Image style={styles.avatar} size={200} source={require('../../assets/avatar.jpg')} />
      <Text style={styles.text}>Bienvenido a CatStore</Text>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        label="Correo"
        mode='flat'
        placeholder='Escribe tu correo'
        onChangeText={(value) => handleSetValues('email', value)}
      />
      <TextInput
        label="Contrasena"
        mode='flat'
        placeholder='Escribe tu contrasena'
        secureTextEntry
        onChangeText={(value) => handleSetValues('password', value)}
      />
      <Button icon="lock" mode="elevated" onPress={handleLogin}>
        Iniciar Sesion
      </Button>
      <Text onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Register'}))}>
        No tienes cuenta !Registrate Ahora!
      </Text>
      <Snackbar
        visible={showMessage}
        onDismiss={() => setShowMessage(false)}>
        Porfavor rellena todos los campos
      </Snackbar>
    </View>
  )
}
