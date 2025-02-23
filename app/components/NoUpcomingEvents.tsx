import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Category, Post } from '../services/eventService';

type NoUpcomingEventsProps = {
  onReload: () => void;
  selectedCategory: Category | null;
};

const NoUpcomingEvents: React.FC<NoUpcomingEventsProps> = ({ onReload, selectedCategory }) => {
  return (
    <Box style={styles.card}>
      <View style={styles.imageContainer}>
        {/* Placeholder Event Image */}
        <Image
          source={require('../../assets/images/logo_black.jpg')}
          style={styles.image}
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)']}
          locations={[0, 0.4, 1]}
          style={styles.gradient}
        >
          {/* Event Details */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{`Exciting ${selectedCategory?.name || "Events"} Coming Soon!`}</Text>
            <Text style={styles.subtitle}>Stay Tuned for Updates</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Reload Button */}
      <Button className="bg-transparent " onPress={onReload}>
        <Text className="text-white">Reload</Text>
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: "#222",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 16,
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: 16,
  },
  textContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    opacity: 0.8,
  },
});

export default NoUpcomingEvents;
