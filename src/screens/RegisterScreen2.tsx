import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/style'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseconfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface FormRegister{
    email: string,
    password: string
}

export const RegisterScreen = () => {
    const [formRegister, setformRegister] = useState<FormRegister>({
        email:"",
        password:""
    });

    const [showMessage, setShowMessage] = useState<boolean>(false);
    const navigation = useNavigation();
    const handleSetValues=(key: string, value:string)=>{
        setformRegister({...formRegister, [key]:value});
    }
    const handleRegister=async()=>{
        if(!formRegister.email || !formRegister.password){
            setShowMessage(true);
            return;
        }
        try{
        const response = await createUserWithEmailAndPassword(
            auth,
            formRegister.email,
            formRegister.password
        )
        }catch(e){
            console.log(e);
        }
    }

  return (
    <View style={styles.root}>
    <Text style={styles.text}>Registrate</Text>
    <TextInput
      label="Correo"
      mode='flat'
      placeholder='Escribe tu correo'
      onChangeText={(value)=>handleSetValues('email',value)}
    />
    <TextInput
      label="Contrasena"
      mode='flat'
      placeholder='Escribe tu contrasena'
      secureTextEntry
      onChangeText={(value)=>handleSetValues('password',value)}
    />
    <Button icon="lock" mode="elevated" onPress={handleRegister}>
        Registrar
    </Button>
    <Text style={styles.textRe} onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Login'}))}>
        Ya tienes cuenta? Inicia Sesion
      </Text>
    <Snackbar
        visible={showMessage}
        onDismiss={()=>setShowMessage(false)}>
        Porfavor rellena todos los campos
      </Snackbar>
    </View>
  )
}

