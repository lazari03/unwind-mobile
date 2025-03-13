import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  box: {
    width: '90%',
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
});

export default styles; 