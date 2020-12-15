/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import AffilatedCompany from './pages/AffilatedCompany';
import Webview from './pages/Webview';
import Webview2 from './pages/Webview2';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,    
    background: '#ffffff'
  },
};


const App: () => React$Node = () => {
  return (
    <>
     <NavigationContainer theme={Theme}>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="AffilatedCompany" component={AffilatedCompany} />
        <Stack.Screen name="Webview" component={Webview} />
        <Stack.Screen name="Webview2" component={Webview2} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};


export default App;
