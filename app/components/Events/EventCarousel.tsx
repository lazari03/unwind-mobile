import React from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Post } from '../../services/eventService';
import Carousel from 'react-native-reanimated-carousel';
import styles from './EventCarousel.styles';

type EventCarouselProps = {
  posts: Post[];
  onEventPress: (event: Post) => void;
};

const EventCarousel: React.FC<EventCarouselProps> = ({ posts, onEventPress }) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        data={posts}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onEventPress(item)}>
            <Box style={styles.box}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.eventPoster }} style={styles.image} />
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)']}
                  locations={[0, 0.4, 1]}
                  style={styles.gradient}
                >
                  <View style={styles.titleContainer}>
                    <View style={styles.redLine}>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text style={styles.placeText}>{item.eventHost}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Box>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventCarousel;