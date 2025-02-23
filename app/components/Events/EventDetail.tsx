import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type EventDetailNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetail'>;

type Props = {
  route: EventDetailRouteProp;
  navigation: EventDetailNavigationProp;
};

const EventDetail: React.FC<Props> = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.eventPoster }} style={styles.image} />
      <Text style={styles.title}>{event.eventName}</Text>
      <Text style={styles.description}>{event.eventDescription}</Text>
      <Text style={styles.host}>Hosted by: {event.eventHost}</Text>
      <Text style={styles.date}>Published at: {new Date(event.publishedAt).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  host: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default EventDetail;