import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { GlobalCss } from '../../../Constats/GlobalCss'
import { RFValue } from 'react-native-responsive-fontsize'

export default function AdminDashboard({navigation}) {


  const dashIcons = [
    { name: 'Create Product', id: 1,navigateTo:"CreateProduct" },
    { name: 'Propduct List', id: 2 ,navigateTo:"ProductList"},
  ]

  return (
    <SafeAreaView style={styles.container}>
      {
        dashIcons.map((icon,index )=> (
          <TouchableOpacity mode="contained" key={index} style={[GlobalCss.PrimaryBtn, {
            marginTop: RFValue(15),
            width: '40%',
          }]}
            onPress={() => navigation.navigate(icon.navigateTo)}
          >
            <Text style={GlobalCss.BtnText}>
              {icon.name}
            </Text>
          </TouchableOpacity>
        ))
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
})