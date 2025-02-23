import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../app/index';
import EventDetails from '../app/screens/EventDetails';
// Removed Profile import
import { RootStackParamList } from './RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        {/* Removed Profile screen */}
        {/* ...other screens... */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
