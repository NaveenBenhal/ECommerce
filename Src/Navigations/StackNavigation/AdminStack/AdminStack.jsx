import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminDashboard from '../../../Screens/Admin/Dashboard/AdminDashboard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS } from '../../../Constats/Colors'
import CreateProduct from '../../../Screens/Admin/Product/Create'
import ProductList from '../../../Screens/Admin/Product/List'

export default function AdminStack() {
    const Stack = createNativeStackNavigator()

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: COLORS.TextColor
                    },
                    headerStyle: {
                        backgroundColor: COLORS.PrimaryBackgraound,
                    },
                }}            >
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Home' }} />
                <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ title: 'Create' }} />
                <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Products' }} />
            </Stack.Navigator>
        </>
    )
}

const styles = StyleSheet.create({})