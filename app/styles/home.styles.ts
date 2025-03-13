import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
    paddingTop: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignItems: 'center', // Center contents horizontally
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  underline: {
    height: 1,
    backgroundColor: 'white',
    marginTop: 8,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
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
    alignItems: 'center',
  },
});