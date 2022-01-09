import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../containers/Home';
import React from 'react';
import Profile from '../containers/Profile';
import { Image } from 'native-base';
import Jols from '../containers/Jols';
import NewJol from '../containers/Jols/newJol';

const Stack = createNativeStackNavigator();

const LogoTitle: React.FC = () => {
    return (
      <Image
        width={250}
        height={50}
        source={require('../../assets/Images/jol-check.png')}
        alt='jol-check-logo'
      />
    )
  }

const AuthStack:React.FC = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerTitle: () => <LogoTitle/>}}/>
        <Stack.Screen name='Jols' component={Jols} options={{ headerTitle: () => <LogoTitle/>}}/>
        <Stack.Screen name='NewJol' component={NewJol} options={{ headerTitle: () => <LogoTitle/>}}/>
        <Stack.Screen name='Profile' component={Profile} options={{ headerTitle: () => <LogoTitle/>}}/>
    </Stack.Navigator>
    )
}

export default AuthStack;