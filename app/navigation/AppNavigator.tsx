import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../index';
import EventDetailsScreen from '../(screens)/EventDetails';
import { RootStackParamList } from './RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
