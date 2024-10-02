import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen2';
import { HomeScreen } from '../screens/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { CreateProductScreen } from '../screens/CreateProductScreen';

interface Routes{
  name: string;
  screen: ()=>JSX.Element;
}

const routesNoAuth: Routes[] = [
  {name:"Login",screen:LoginScreen},
  {name:"Register",screen:RegisterScreen}
]
const routesAuth: Routes[] = [
  {name:"Home",screen:HomeScreen},
  {name:"CreateProduct",screen:CreateProductScreen}
]
const Stack = createStackNavigator();

export const StackNavigator = () =>{
  const [isAuth, setisAuth] = useState<boolean>(false)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if (user){
        setisAuth(true);
      }
    })
  })
  return (
    <Stack.Navigator>
      {
        !isAuth ? 
        routesNoAuth.map((item,index)=>(
          <Stack.Screen key={index} 
          name={item.name} 
          options={{headerShown: false}} 
          component={item.screen} />
        ))
        :
        routesAuth.map((item,index)=>(
          <Stack.Screen key={index} 
          name={item.name} 
          options={{headerShown: false}} 
          component={item.screen} />
        ))
      }
    </Stack.Navigator>
  );
}