import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="EventDetails/index"
        options={{
          title: "Event Details",
          presentation: "modal",
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack>
  );
} 