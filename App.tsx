import React from 'react';
import Amplify from 'aws-amplify';
import { NativeBaseProvider } from 'native-base';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
/** Graphql */
import { createUser } from './src/graphql/mutations'
import { listUsers } from './src/graphql/queries';
import Home from './src/containers/Home';
import Login from './src/containers/Authentication/Login';
import SignUp from './src/containers/Authentication/SignUp';


Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
