import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackHome from './Src/Navigations/StackNavigation/StackHome'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './Src/Redux/Store'

const App = () => {

  return (
    <PaperProvider>
      <NavigationContainer>
        <Provider store={store}>
          <StackHome />
        </Provider>
      </NavigationContainer>
    </PaperProvider>

  )
}

export default App
