import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEventRequest } from '../../network/getEventRequest';
import { getCategoriesRequest } from '../../network/getCategoriesRequest';

export type Post = {
  id: number;
  title: string;
  content: string;
  eventHost?: string;
  eventPoster?: string;
  publishedAt: Date;
  featured: boolean;
  eventCategory: {
    id: number;
    name: string;
  };
};

export type Category = {
  id: number;
  name: string;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const events: any = await getEventRequest();

  // Sort the events by publishedAt date in descending order
  events.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  console.log(JSON.stringify(events, null, 2));

  const data = events.map((event: any) => ({
    id: event.id,
    title: event.eventName,
    content: event.eventDescription,
    eventPoster: event.eventPoster,
    eventHost: event.eventHost,
    featured: event.featured,
    publishedAt: new Date(event.publishedAt), // Ensure 'publishedAt' is a Date object
    eventCategory: {
      id: event.eventCategory.id,
      name: event.eventCategory.name,
    },
  }));

  return data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const categories: any = await getCategoriesRequest();

  const categoryData = categories.map((category: any) => ({
    id: category.id,
    name: category.categoryName,
    description: category.categoryDescription,
  }));
  console.log(JSON.stringify(categoryData, null, 2));

  return categoryData;
};

export const checkSeenEvents = async (): Promise<boolean> => {
  const seenEvents = await AsyncStorage.getItem('hasSeenEvents');
  return seenEvents === 'true';
};

export const markEventsAsSeen = async (): Promise<void> => {
  await AsyncStorage.setItem('hasSeenEvents', 'true');
};

export const featuredPosts = (posts: Post[]): Post[] => {
  return posts.filter((post) => post.featured);
}
