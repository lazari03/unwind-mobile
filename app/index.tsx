import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import CategoryList from "./components/CategoryList";
import EventList from "./components/Events/EventList";
import EventCarousel from "./components/Events/EventCarousel";
import NoUpcomingEvents from "./components/NoUpcomingEvents";
import { fetchPosts, fetchCategories, checkSeenEvents, markEventsAsSeen, Post, Category, featuredPosts } from "./services/eventService";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/RootStackParamList';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasSeenEvents, setHasSeenEvents] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch Data
  const fetchData = async () => {
    setRefreshing(true);
    const fetchedPosts = await fetchPosts();
    const fetchedCategories = await fetchCategories();
    setPosts(fetchedPosts);
    setCategories(fetchedCategories);
    const seenEvents = await checkSeenEvents();
    setHasSeenEvents(seenEvents);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    markEventsAsSeen();
  }, [posts]);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  // Filter events based on the selected category
  const filteredPosts = selectedCategory
    ? posts.filter(post => post.eventCategory.id === selectedCategory)
    : posts;

  // Get featured posts from all posts
  const featuredPostsList = featuredPosts(posts);

  const handleEventPress = (event: Post) => {
    navigation.navigate('EventDetails', { event });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* SafeAreaView for the header to avoid overlap with the notch */}
      <SafeAreaView style={styles.headerContainer}>
        <HStack style={styles.header}>
          <Text style={styles.headerText}>Unwind</Text>
          <HStack style={styles.headerIcons}>
            {/* Plus Button */}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add-outline" size={24} color="white" />
            </TouchableOpacity>
            {/* Profile Button */}
            {/* Removed Profile Button */}
          </HStack>
        </HStack>
        <View style={styles.underline} />
      </SafeAreaView>
  
      {/* Main Content Area */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center', paddingTop: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
        }
        stickyHeaderIndices={[1]} // Make the title and category list sticky
      >
        {featuredPostsList.length > 0 && <EventCarousel posts={featuredPostsList} />}
        <View style={styles.stickyHeaderContainer}>
          <Text style={styles.sectionTitle}>This Week's Events</Text>
          <CategoryList categories={categories} onSelectCategory={setSelectedCategory} />
        </View>
        <View style={styles.eventListContainer}>
          {filteredPosts.length > 0 ? (
            <EventList posts={filteredPosts} onEventPress={handleEventPress} />
          ) : (
            <NoUpcomingEvents 
              onReload={fetchData} 
              selectedCategory={categories.find(category => category.id === selectedCategory) || null} 
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "black",
    // Removed borderBottomWidth and borderBottomColor
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  underline: {
    height: 2,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 1,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20, // Add marginTop to create space between the title and the featured slider
  },
  stickyHeaderContainer: {
    backgroundColor: 'black',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  eventListContainer: {
    width: '100%',
    padding: 16,
    alignItems: 'center', // Center the event cards
  },
});
