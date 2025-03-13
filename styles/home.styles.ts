import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    fontSize: 24, // Adjusted font size
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
    marginLeft: 10, // Adjusted margin
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