import { StyleSheet } from 'react-native'
import React from 'react'
import Login from '../../../Screens/Auth/Login'
import Register from '../../../Screens/Auth/Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS } from '../../../Constats/Colors'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontWeight: 'bold',
        color:COLORS.TextColor
      },
      headerStyle: {
        backgroundColor: COLORS.PrimaryBackgraound,
      },
    }}
    >
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
