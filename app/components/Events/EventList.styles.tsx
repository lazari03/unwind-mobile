import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  box: {
    width: '100%',
    maxWidth: 1600,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden', // Keeps everything inside the box
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: 16,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  redLine: {
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: 'red',
  },
  titleText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'white',
    fontWeight: 'bold',
  },
  placeText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.9,
  },
});

export default styles;