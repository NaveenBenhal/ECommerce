import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackHome from './Src/Navigations/StackNavigation/StackHome'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackHome />
      </NavigationContainer>
    </PaperProvider>

  )
}

export default App
