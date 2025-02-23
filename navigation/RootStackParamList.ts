import { Post } from '../app/services/eventService';

export type RootStackParamList = {
    Home: undefined;
    EventDetails: { event: Post };
    // other routes
  };
