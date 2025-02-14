import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack/AuthStack'
import AdminStack from './AdminStack/AdminStack'
import { COLORS } from '../../Constats/Colors'


const Stack = createNativeStackNavigator()

export default function StackHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}  
      initialRouteName="AuthStack">
      <Stack.Screen name="AuthStack" component={AuthStack} options={{  }} />
      <Stack.Screen name="AdminStack" component={AdminStack} options={{  }} />
    </Stack.Navigator>
  )
}
