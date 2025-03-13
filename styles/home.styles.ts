import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

export default styles;