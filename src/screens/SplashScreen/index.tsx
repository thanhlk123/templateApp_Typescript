import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

const SplashScreen = ({navigation}) => {
  const animation = require('@assets/animations/splash.mp4');
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Walkthrough');
    }, 4000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Video
        style={styles.backgroundVideo}
        resizeMode={'cover'}
        source={animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    backgroundColor: '#7447EA',
    flex: 1,
  },
});

export default SplashScreen;
