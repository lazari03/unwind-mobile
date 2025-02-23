import React from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../services/eventService';
import styles from './EventList.styles';

type EventListProps = {
  posts: Post[];
};

const EventList: React.FC<EventListProps> = ({ posts }) => {
  return (
    <View style={{ width: '100%' }}>
      {posts.length === 0 ? (
        <Box style={styles.box}>
          <View style={styles.imageContainer}>
            {/* Placeholder image */}
            <Image
              source={{ uri: 'https://via.placeholder.com/300x200?text=No+Events' }}
              style={styles.image}
            />
            {/* Gradient Overlay */}
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)']}
              locations={[0, 0.4, 1]}
              style={styles.gradient}
            >
              {/* Placeholder Text */}
              <View style={styles.titleContainer}>
                <View style={styles.redLine}>
                  <Text style={styles.titleText}>No Events Available</Text>
                  <Text style={styles.placeText}>Check back later or try another category</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Box>
      ) : (
        posts.map(post => (
          <Box key={post.id} style={styles.box}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: post.eventPoster }} style={styles.image} />
              {/* Gradient Overlay */}
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)']}
                locations={[0, 0.4, 1]}
                style={styles.gradient}
              >
                {/* Title Section Inside Red Line */}
                <View style={styles.titleContainer}>
                  <View style={styles.redLine}>
                    <Text style={styles.titleText}>{post.title}</Text>
                    <Text style={styles.placeText}>{post.eventHost}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Box>
        ))
      )}
    </View>
  );
};

export default EventList;
