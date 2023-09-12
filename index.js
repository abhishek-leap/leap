/**
 * @format
 */

import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {displayNotification} from './shared/utils/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
  await displayNotification(remoteMessage.data);
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  switch (type) {
    case EventType.PRESS:
      console.log(
        'User pressed notification on background',
        detail.notification,
      );
      await notifee.cancelNotification(detail.notification.id);
      break;
  }
});

I18nManager.allowRTL(false);

AppRegistry.registerComponent(appName, () => App);
