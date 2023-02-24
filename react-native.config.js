module.exports = {
    dependencies: {
      // video we manually link on Android to use exoplayer
      'react-native-video': {
        platforms: {
          android: {
            sourceDir:
              '../node_modules/react-native-video/android-exoplayer',
          },
        },
      },
    },
};