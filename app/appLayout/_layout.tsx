import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import SplashScreen from '../components/SplashScreen'; // Import the SplashScreen component
import { fetchPosts, fetchCategories, checkSeenEvents, markEventsAsSeen, Post, Category } from '../services/eventService';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(appLayout)",
};

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasSeenEvents, setHasSeenEvents] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        const fetchedCategories = await fetchCategories();
        setPosts(fetchedPosts);
        setCategories(fetchedCategories);
        
        const seenEvents = await checkSeenEvents();
        setHasSeenEvents(seenEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <SplashScreen />; // Show splash screen while loading
  }

  return (
    <Stack>
      <Stack.Screen name="(appLayout)" options={{ headerShown: false }} />
    </Stack>
  );
}