import {AppState, Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidStyle,
  EventType,
  AuthorizationStatus,
} from '@notifee/react-native';
import {getData, setData} from './helper';
import {initializeApp} from 'firebase/app';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';

export const configureFcm = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    const fcm = getData('fcmToken');
    console.log('token', fcm);
    if (!fcm) {
      const firebaseConfig = {
        // Your Firebase config
      };

      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);
      // await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await getToken(messaging, {
        vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
      });
      setData('fcmToken', fcmToken);
      console.log('newtoken', fcmToken);
      onMessage(messaging, async remoteMessage => {
        console.log(remoteMessage);
        if (AppState.currentState !== 'active') {
          displayNotification(remoteMessage?.data);
        }
      });
      notifee.onForegroundEvent(({type, detail}) => {
        switch (type) {
          case EventType.PRESS:
            console.log('User pressed notification', type);
            break;
        }
      });
    }
  } else {
    console.log('User declined permissions');
  }
};

const getIosImage = (type, info) => {
  let image = '';
  const obj = JSON.parse(info);
  if (type) {
    switch (type) {
      case 'follow':
        image = 'thumbnail.png';
        break;
      case 'view_profile':
        image = 'thumbnail.png';
        break;
      case 'feed_live':
        image = obj?.feedImageLink;
        break;
      case 'dare_competition_needs_to_accept':
        image = 'dare.png';
        break;
      case 'dare_video_validation_completed':
        image = info.assets[0].dareCover;
        break;
      case 'dare_live':
        image = 'dare.png';
        break;
      case 'dare_refused':
        image = 'thumbnail.png';
        break;
      case 'dare_winner':
        image = 'dare-winner.png';
        break;
      case 'dare_vote_winner':
        image = 'dare-vote-winner.png';
        break;
      case 'dare_loser':
        image = 'loser.png';
        break;
      case 'dare_vote':
        image = 'dare-vote.png';
        break;
      case 'feed_liked':
        image = obj?.feedImageLink;
        break;
      case 'feed_commented':
        image = obj?.feedImageLink;
        break;
      case 'dare_view':
        image = 'dare.png';
        break;
      case 'feed_video_validation_failed':
        image = 'invalid.png';
        break;
      case 'dare_video_validation_failed':
        image = 'invalid.png';
        break;
      case 'feed_live_follower':
        image = obj?.feedImageLink;
        break;
      case 'dare_live_follower':
        image = 'dare.png';
        break;
      case 'feed_mentioned':
        image = obj?.feedImageLink;
        break;
      case 'dare_follower_winner':
        image = 'dare-winner.png';
        break;
      case 'dare_competition_accepted':
        image = 'dare.png';
        break;
      case 'dare_blocked':
        image = 'dare.png';
        break;
      case 'dare_unblocked':
        image = 'dare.png';
        break;
      case 'dare_about_to_end':
        image = 'dare.png';
        break;
      case 'dare_about_end_to_follower':
        image = 'dare.png';
        break;
      case 'dare_vote_loser':
        image = 'dare.png';
        break;
      case 'feed_blocked':
        break;
      case 'feed_unblocked':
        break;
      default:
        break;
    }
  }
  return image;
};

export const getImage = (type, info) => {
  let image = '';
  const obj = JSON.parse(info);
  if (type) {
    switch (type) {
      case 'follow':
        image = require('../images/thumbnail.png');
        break;
      case 'view_profile':
        image = require('../images/thumbnail.png');
        break;
      case 'feed_live':
        image = obj?.feedImageLink;
        break;
      case 'dare_competition_needs_to_accept':
        image = require('../images/dare.png');
        break;
      case 'dare_video_validation_completed':
        image = info.assets[0].dareCover;
        break;
      case 'dare_live':
        image = require('../images/dare.png');
        break;
      case 'dare_refused':
        image = require('../images/thumbnail.png');
        break;
      case 'dare_winner':
        image = require('../images/dare-winner.png');
        break;
      case 'dare_vote_winner':
        image = require('../images/dare-vote-winner.png');
        break;
      case 'dare_loser':
        image = require('../images/loser.png');
        break;
      case 'dare_vote':
        image = require('../images/dare-vote.png');
        break;
      case 'feed_liked':
        image = obj?.feedImageLink;
        break;
      case 'feed_commented':
        image = obj?.feedImageLink;
        break;
      case 'dare_view':
        image = require('../images/dare.png');
        break;
      case 'feed_video_validation_failed':
        image = require('../images/invalid.png');
        break;
      case 'dare_video_validation_failed':
        image = require('../images/invalid.png');
        break;
      case 'feed_live_follower':
        image = obj?.feedImageLink;
        break;
      case 'dare_live_follower':
        image = require('../images/dare.png');
        break;
      case 'feed_mentioned':
        image = obj?.feedImageLink;
        break;
      case 'dare_follower_winner':
        image = require('../images/dare-winner.png');
        break;
      case 'dare_competition_accepted':
        image = require('../images/dare.png');
        break;
      case 'dare_blocked':
        image = require('../images/dare.png');
        break;
      case 'dare_unblocked':
        image = require('../images/dare.png');
        break;
      case 'dare_about_to_end':
        image = require('../images/dare.png');
        break;
      case 'dare_about_end_to_follower':
        image = require('../images/dare.png');
        break;
      case 'dare_vote_loser':
        image = require('../images/dare.png');
        break;
      case 'feed_blocked':
        break;
      case 'feed_unblocked':
        break;
      default:
        break;
    }
  }
  return image;
};

export const displayNotification = async (remoteMessage, type) => {
  const channelId = await notifee.createChannel({
    id: 'Playleap',
    name: 'Playleap Notifications',
    importance: AndroidImportance.HIGH,
  });
  let imageUrl = '';
  if (remoteMessage?.notificationType) {
    if (Platform.OS === 'android') {
      const androidImage = getImage(
        remoteMessage?.notificationType,
        remoteMessage?.info,
      );
      if (androidImage) {
        imageUrl = androidImage;
      }
    } else {
      const iosImage = getIosImage(
        remoteMessage?.notificationType,
        remoteMessage?.info,
      );
      if (iosImage) {
        imageUrl = iosImage;
      }
    }
  }
  let androidObj = {
    channelId: channelId,
    smallIcon: 'ic_notification',
    color: '#EA26F9',
    pressAction: {
      launchActivity: 'default',
      id: 'default',
      launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
    },
  };
  let iosObj = {};
  if (imageUrl) {
    androidObj.largeIcon = imageUrl;
    androidObj.style = {
      type: AndroidStyle.BIGPICTURE,
      picture: imageUrl,
      largeIcon: null,
    };
    iosObj = {
      attachments: [
        {
          url: imageUrl,
          thumbnailHidden: false,
        },
      ],
    };
  }
  if (remoteMessage?.body) {
    notifee.displayNotification({
      body: remoteMessage?.body,
      title: remoteMessage?.title,
      importance: AndroidImportance.HIGH,
      data: {
        info: remoteMessage?.info,
        notificationId: remoteMessage?.notificationId,
        notificationType: remoteMessage?.notificationType,
      },
      android: androidObj,
      ios: iosObj,
    });
  }
};
