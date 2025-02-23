import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Post } from '../../services/eventService';

type EventCarouselProps = {
  posts: Post[];
};

const { width: windowWidth } = Dimensions.get('window');
const ITEM_WIDTH = windowWidth * 0.9; // Adjust the width as needed
const ITEM_HEIGHT = 250; // Adjust the height as needed

const EventCarousel: React.FC<EventCarouselProps> = ({ posts }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef(null);

  const renderItem = ({ item }: { item: Post }) => (
    <Box key={item.id} style={styles.box}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.eventPoster }} style={styles.image} />
        {/* Gradient Overlay */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 1)']}
          locations={[0, 0.4, 1]}
          style={styles.gradient}
        >
          {/* Title Section Inside Red Line */}
          <View style={styles.titleContainer}>
            <View style={styles.redLine}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.placeText}>{item.eventHost}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Box>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={ref}
        autoPlayInterval={5000} // Auto-play every 5 seconds
        data={posts}
        height={ITEM_HEIGHT} // Adjust the height as needed
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={ITEM_WIDTH} // Specify the width for the carousel items
        style={styles.carousel}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <View style={styles.paginationContainer}>
        {posts.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: ITEM_HEIGHT + 20, // Adjust height to include pagination
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redLine: {
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },
  titleText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: 'bold',
  },
  placeText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default EventCarousel;