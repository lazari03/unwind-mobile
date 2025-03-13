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
import { useRouter } from "expo-router";
import { styles as homeStyles } from "../styles/home.styles";
import 'tailwindcss-react-native';

export default function Home() {
  const router = useRouter();
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
    console.log("Event Pressed", event);
    router.push("/(screens)/EventDetails");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* SafeAreaView for the header to avoid overlap with the notch */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Unwind</Text>
          <View style={styles.headerIcons}>
            {/* Plus Button */}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add-outline" size={24} color="white" />
            </TouchableOpacity>
            {/* Profile Button */}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.underline} />
      </View>

      {/* Main Content Area */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center', paddingTop: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
        }
        stickyHeaderIndices={[1]} // Make the title and category list sticky
      >
        {featuredPostsList.length > 0 && <EventCarousel posts={featuredPostsList} onEventPress={handleEventPress} />}
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
    paddingTop: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  underline: {
    height: 1,
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 2,
  },
  stickyHeaderContainer: {
    backgroundColor: "black",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  eventListContainer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
  },
});