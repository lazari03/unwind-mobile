import axios from 'axios';

export type EventService = {
    id: number;
    eventName: string;
    eventDescription: string;
    eventHost: string;
    eventPoster: string;
    publishedAt: string;
    featured: boolean;
    eventCategory: {
        id: number;
        name: string;
    };
}

export async function getEventRequest(): Promise<EventService[]> {
    const baseURL: string = "https://squid-app-xkl69.ondigitalocean.app";
    const url = `${baseURL}/api/events?populate=eventPoster&populate=eventCategory`;
    const token = "f61bd770b2f68d2b57177d042a81885801f16f6c52561edd9ae47a5e9d2098e5d0ddb7a98026ff52ec85a213b5401931aba95307a19e1f48c590efdf7cd6e00569ef27e258448b1cfe2d1e57d474d27dc6675a48f5deea638a6fce31220dc4eec14b8fb38fbbaf8205789d07b12b799dee134d3e3f546a8fc8ee075e043fa6b3";

    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!Array.isArray(response.data.data)) {
        throw new Error("Expected an array of events");
    }

    const events = response.data.data.map((event: any) => ({
        id: event.id,
        eventName: event.eventName,
        eventDescription: event.eventDescription,
        eventHost: event.eventHost,
        publishedAt: event.publishedAt,
        featured: event.featured,
        eventCategory: {
            id: event.eventCategory.id,
            name: event.eventCategory.name,
        },
        eventPoster: `${baseURL}${event.eventPoster.url}`, // Construct the full URL for the event poster
    }));

    return events;
}