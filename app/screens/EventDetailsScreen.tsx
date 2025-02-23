import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStackParamList';

type EventDetailsScreenRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;
type EventDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;

type Props = {
  route: EventDetailsScreenRouteProp;
  navigation: EventDetailsScreenNavigationProp;
};

const EventDetailsScreen: React.FC<Props> = ({ route }) => {
  const { event } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.eventPoster }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.host}>Hosted by: {event.eventHost}</Text>
        <Text style={styles.description}>{event.description}</Text>
        <Text style={styles.date}>Date: {event.date}</Text>
        <Text style={styles.location}>Location: {event.location}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  host: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: 'white',
  },
});

export default EventDetailsScreen;
